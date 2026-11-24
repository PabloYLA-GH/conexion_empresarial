<?php

namespace App\Actions\Opportunities;

use App\Enums\UserApprovalStatus;
use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;

class SubmitApplication
{
    public function handle(User $actor, Profile $applicant, Opportunity $opportunity, ?string $message = null): OpportunityApplication
    {
        if ($actor->approval_status !== UserApprovalStatus::Approved || ! $actor->hasVerifiedEmail()) {
            throw new AuthorizationException('La cuenta no está autorizada para postularse.');
        }

        if ($applicant->user_id !== $actor->id || ! $applicant->exists || ! $applicant->newQuery()->published()->whereKey($applicant->id)->exists()) {
            throw new AuthorizationException('El perfil no está autorizado para postularse.');
        }

        if ($opportunity->profile_id === $applicant->id || ! $opportunity->newQuery()->publiclyVisible()->whereKey($opportunity->id)->exists()) {
            throw new AuthorizationException('La vinculación no admite esta postulación.');
        }

        $application = new OpportunityApplication;
        $application->opportunity()->associate($opportunity);
        $application->applicantProfile()->associate($applicant);
        $application->submitter()->associate($actor);
        $application->message = $message;
        $application->save();

        return $application;
    }
}
