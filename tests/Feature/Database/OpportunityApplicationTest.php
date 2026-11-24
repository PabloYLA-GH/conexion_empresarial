<?php

namespace Tests\Feature\Database;

use App\Actions\Opportunities\SubmitApplication;
use App\Enums\OpportunityApplicationStatus;
use App\Enums\OpportunityModerationStatus;
use App\Enums\ProfileStatus;
use App\Enums\UserApprovalStatus;
use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OpportunityApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_approved_member_can_apply_once_to_another_published_profile(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();

        $application = app(SubmitApplication::class)->handle($actor, $applicant, $opportunity, 'Me interesa colaborar');

        $this->assertSame(OpportunityApplicationStatus::Pending, $application->status);
        $this->assertSame($opportunity->id, $application->opportunity->id);
        $this->assertSame($applicant->id, $application->applicantProfile->id);
        $this->assertSame($actor->id, $application->submitter->id);
        $this->assertTrue($opportunity->applications->contains($application));
        $this->assertTrue($applicant->applications->contains($application));
        $this->assertTrue($actor->submittedApplications->contains($application));
        $this->assertFalse($application->isFillable('status'));
    }

    public function test_unique_constraint_prevents_a_second_application_even_after_withdrawal(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        $first = app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
        $first->status = OpportunityApplicationStatus::Withdrawn;
        $first->save();

        $this->expectException(UniqueConstraintViolationException::class);

        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
    }

    public function test_a_profile_cannot_apply_to_its_own_opportunity(): void
    {
        $actor = User::factory()->approved()->create();
        $profile = Profile::factory()->published()->for($actor)->create();
        $opportunity = Opportunity::factory()->for($profile)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => now(),
        ]);

        $this->expectException(AuthorizationException::class);

        app(SubmitApplication::class)->handle($actor, $profile, $opportunity);
    }

    public function test_pending_suspended_and_unverified_accounts_cannot_apply(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();

        foreach ([UserApprovalStatus::Pending, UserApprovalStatus::Suspended] as $status) {
            $actor->approval_status = $status;
            $actor->save();

            try {
                app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
                $this->fail('The account should not have been able to apply.');
            } catch (AuthorizationException) {
                $this->assertDatabaseCount('opportunity_applications', 0);
            }
        }

        $actor->approval_status = UserApprovalStatus::Approved;
        $actor->email_verified_at = null;
        $actor->save();

        $this->expectException(AuthorizationException::class);

        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
    }

    public function test_only_the_owner_of_a_published_applicant_profile_can_apply(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        $other = User::factory()->approved()->create();

        try {
            app(SubmitApplication::class)->handle($other, $applicant, $opportunity);
            $this->fail('Another user should not apply with this profile.');
        } catch (AuthorizationException) {
            $this->assertDatabaseCount('opportunity_applications', 0);
        }

        $applicant->status = ProfileStatus::Suspended;
        $applicant->save();

        $this->expectException(AuthorizationException::class);

        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
    }

    public function test_unpublished_or_expired_opportunities_reject_applications(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        $opportunity->moderation_status = OpportunityModerationStatus::Rejected;
        $opportunity->save();

        try {
            app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
            $this->fail('Rejected opportunities cannot receive applications.');
        } catch (AuthorizationException) {
            $this->assertDatabaseCount('opportunity_applications', 0);
        }

        $opportunity->moderation_status = OpportunityModerationStatus::Approved;
        $opportunity->expires_at = today()->subDay();
        $opportunity->save();

        $this->expectException(AuthorizationException::class);

        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
    }

    public function test_soft_deletion_and_suspension_keep_application_history(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        $application = app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);

        $applicant->status = ProfileStatus::Suspended;
        $applicant->save();
        $opportunity->delete();

        $this->assertDatabaseHas('opportunity_applications', ['id' => $application->id]);
        $this->assertSoftDeleted($opportunity);
    }

    public function test_hard_deletion_is_restricted_while_applications_exist(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);

        $this->expectException(QueryException::class);

        $opportunity->forceDelete();
    }

    public function test_applicant_profile_cannot_be_force_deleted_while_applications_exist(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);

        $this->expectException(QueryException::class);

        $applicant->forceDelete();
    }

    public function test_deleted_submitter_is_anonymized_without_losing_the_application(): void
    {
        [$actor, $applicant, $opportunity] = $this->eligibleApplication();
        $application = app(SubmitApplication::class)->handle($actor, $applicant, $opportunity);
        $actor->delete();

        $this->assertNull($application->fresh()->submitted_by_user_id);
        $this->assertSame($applicant->id, $application->fresh()->applicant_profile_id);
    }

    public function test_factory_creates_a_pending_application(): void
    {
        $application = OpportunityApplication::factory()->create();

        $this->assertSame(OpportunityApplicationStatus::Pending, $application->status);
        $this->assertNotNull($application->opportunity);
        $this->assertNotNull($application->applicantProfile);
    }

    /**
     * @return array{User, Profile, Opportunity}
     */
    private function eligibleApplication(): array
    {
        $actor = User::factory()->approved()->create();
        $applicant = Profile::factory()->published()->for($actor)->create();
        $publisher = Profile::factory()->published()->create();
        $opportunity = Opportunity::factory()->for($publisher)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => now(),
        ]);

        return [$actor, $applicant, $opportunity];
    }
}
