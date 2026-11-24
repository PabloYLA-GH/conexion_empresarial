<?php

namespace Tests\Feature\Database;

use App\Enums\OpportunityModerationStatus;
use App\Enums\OpportunityStatus;
use App\Enums\ProfileStatus;
use App\Models\Opportunity;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class OpportunityModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_opportunities_wait_for_review_independently_of_activity_status(): void
    {
        $opportunity = Opportunity::factory()->create();

        $this->assertSame(OpportunityModerationStatus::Pending, $opportunity->moderation_status);
        $this->assertSame(OpportunityStatus::Open, $opportunity->status);
        $this->assertFalse($opportunity->isFillable('moderation_status'));
        $this->assertSame(0, Opportunity::publiclyVisible()->count());
    }

    public function test_approved_active_and_unexpired_opportunities_from_published_profiles_are_public(): void
    {
        $profile = Profile::factory()->published()->create();
        $admin = User::factory()->admin()->create();
        $visible = Opportunity::factory()->for($profile)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'reviewed_by' => $admin->id,
            'approved_at' => now(),
            'expires_at' => today(),
        ]);
        Opportunity::factory()->for($profile)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => now(),
            'status' => OpportunityStatus::Closed,
        ]);
        Opportunity::factory()->for($profile)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => now(),
            'expires_at' => today()->subDay(),
        ]);
        Opportunity::factory()->for($profile)->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => null,
        ]);
        Opportunity::factory()->for(Profile::factory()->withStatus(ProfileStatus::Suspended)->create())->create([
            'moderation_status' => OpportunityModerationStatus::Approved,
            'approved_at' => now(),
        ]);

        $this->assertSame([$visible->id], Opportunity::publiclyVisible()->pluck('id')->all());
        $this->assertSame($admin->id, $visible->reviewer->id);
        $this->assertTrue($admin->reviewedOpportunities->contains($visible));
    }

    public function test_rejection_keeps_activity_status_and_reason(): void
    {
        $admin = User::factory()->admin()->create();
        $opportunity = Opportunity::factory()->create();
        $opportunity->forceFill([
            'moderation_status' => OpportunityModerationStatus::Rejected,
            'reviewed_by' => $admin->id,
            'rejection_reason' => 'Información incompleta',
        ])->save();

        $this->assertSame(OpportunityStatus::Open, $opportunity->fresh()->status);
        $this->assertSame(OpportunityModerationStatus::Rejected, $opportunity->fresh()->moderation_status);
        $this->assertSame('Información incompleta', $opportunity->fresh()->rejection_reason);
        $this->assertSame(0, Opportunity::publiclyVisible()->count());
    }

    public function test_existing_opportunities_become_pending_without_changing_activity_status(): void
    {
        $migration = require database_path('migrations/2026_11_24_000002_add_moderation_to_opportunities_table.php');
        $migration->down();
        $profile = Profile::factory()->published()->create();
        $id = DB::table('opportunities')->insertGetId([
            'profile_id' => $profile->id,
            'kind' => 'supplier',
            'direction' => 'seeking',
            'title' => 'Vinculación anterior',
            'status' => OpportunityStatus::Resolved->value,
        ]);

        $migration->up();

        $opportunity = Opportunity::query()->findOrFail($id);
        $this->assertSame(OpportunityModerationStatus::Pending, $opportunity->moderation_status);
        $this->assertSame(OpportunityStatus::Resolved, $opportunity->status);
        $this->assertNull($opportunity->approved_at);
    }
}
