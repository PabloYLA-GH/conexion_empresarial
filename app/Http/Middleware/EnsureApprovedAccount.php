<?php

namespace App\Http\Middleware;

use App\Enums\UserApprovalStatus;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureApprovedAccount
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->approval_status !== UserApprovalStatus::Approved) {
            return $this->deny($request, $user->approval_status);
        }

        $response = $next($request);
        $user = $request->user();

        // A passkey or two-factor endpoint can create a session during this
        // request, after the first check above has already run.
        if ($user && $user->approval_status !== UserApprovalStatus::Approved) {
            return $this->deny($request, $user->approval_status);
        }

        return $response;
    }

    private function deny(Request $request, UserApprovalStatus $status): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $message = match ($status) {
            UserApprovalStatus::Pending => 'Tu cuenta aún está pendiente de aprobación.',
            UserApprovalStatus::Rejected => 'Tu solicitud de cuenta fue rechazada.',
            UserApprovalStatus::Suspended => 'Tu cuenta está suspendida.',
        };

        return $request->expectsJson()
            ? response()->json(['message' => $message], 403)
            : redirect()->route('login')->withErrors(['email' => $message]);
    }
}
