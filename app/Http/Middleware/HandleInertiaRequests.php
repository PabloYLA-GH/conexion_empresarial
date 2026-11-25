<?php

namespace App\Http\Middleware;

use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Middleware;
use Laravel\Fortify\Features;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            ...$this->pageSpecificProps($request),
        ];
    }

    /**
     * Props computed automatically for specific file-based routes.
     *
     * @return array<string, mixed>
     */
    private function pageSpecificProps(Request $request): array
    {
        if ($request->routeIs('settings.profile')) {
            return [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => $request->session()->get('status'),
            ];
        }

        if ($request->routeIs('settings.security') && $request->user()) {
            $props = [
                'canManageTwoFactor' => Features::canManageTwoFactorAuthentication(),
                'canManagePasskeys' => Features::canManagePasskeys(),
                'passkeys' => Features::canManagePasskeys()
                    ? $request->user()
                        ->passkeys()
                        ->select(['id', 'name', 'credential', 'created_at', 'last_used_at'])
                        ->latest()
                        ->get()
                        ->map(fn ($passkey) => [
                            'id' => $passkey->id,
                            'name' => $passkey->name,
                            'authenticator' => $passkey->authenticator,
                            'created_at_diff' => $passkey->created_at?->diffForHumans(),
                            'last_used_at_diff' => $passkey->last_used_at?->diffForHumans(),
                        ])
                        ->values()
                        ->all()
                    : [],
                'passwordRules' => Password::defaults()->toPasswordRulesString(),
            ];

            if (Features::canManageTwoFactorAuthentication()) {
                app(TwoFactorAuthenticationRequest::class)->ensureStateIsValid();

                $props['twoFactorEnabled'] = $request->user()->hasEnabledTwoFactorAuthentication();
                $props['requiresConfirmation'] = Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm');
            }

            return $props;
        }

        return [];
    }
}
