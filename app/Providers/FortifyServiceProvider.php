<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Enums\UserApprovalStatus;
use App\Http\Controllers\Auth\RegisteredMemberController;
use App\Http\Responses\PendingRegistrationResponse;
use App\Models\Category;
use App\Models\MemberType;
use App\Models\Region;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RegisteredUserController::class, RegisteredMemberController::class);
        $this->app->singleton(RegisterResponse::class, PendingRegistrationResponse::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::authenticateUsing(function (Request $request): ?User {
            $user = User::query()->where('email', $request->input('email'))->first();

            if (! $user || ! Hash::check((string) $request->input('password'), $user->password)) {
                return null;
            }

            if ($user->approval_status !== UserApprovalStatus::Approved) {
                throw ValidationException::withMessages([
                    'email' => match ($user->approval_status) {
                        UserApprovalStatus::Pending => 'Tu cuenta aún está pendiente de aprobación.',
                        UserApprovalStatus::Rejected => 'Tu solicitud de cuenta fue rechazada.',
                        UserApprovalStatus::Suspended => 'Tu cuenta está suspendida.',
                        default => 'Tu cuenta no tiene acceso.',
                    },
                ]);
            }

            if (Hash::needsRehash($user->password)) {
                $user->forceFill(['password' => $request->input('password')])->save();
            }

            return $user;
        });
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('(guest)/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('(guest)/reset-password/[token]', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('(guest)/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('(auth)/email/verify', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn () => Inertia::render('(guest)/register', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
            'memberTypes' => MemberType::query()->whereIn('slug', ['empresarios', 'profesionistas'])->orderBy('name')->get(['slug', 'name']),
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'regions' => Region::query()->where('country_code', 'MX')->orderBy('name')->get(['id', 'name']),
        ]));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('(guest)/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('(auth)/user/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('passkeys', function (Request $request) {
            return Limit::perMinute(10)->by(
                ($request->input('credential.id') ?: $request->session()->getId()).'|'.$request->ip(),
            );
        });
    }
}
