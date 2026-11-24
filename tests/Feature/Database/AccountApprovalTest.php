<?php

namespace Tests\Feature\Database;

use App\Enums\UserApprovalStatus;
use App\Enums\UserRole;
use App\Models\User;
use App\Models\Category;
use App\Models\Country;
use App\Models\MemberType;
use App\Models\Region;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AccountApprovalTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_creates_a_pending_member_without_accepting_administrative_fields(): void
    {
        Country::factory()->create(['code' => 'MX']);
        $region = Region::factory()->create(['country_code' => 'MX']);
        $category = Category::factory()->create();
        MemberType::factory()->create(['slug' => 'empresarios']);
        $this->post(route('register.store'), [
            'member_type' => 'empresarios',
            'name' => 'Nueva integrante',
            'email' => 'integrante@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'profile_name' => 'Empresa de ejemplo',
            'profile_summary' => 'Resumen de la empresa de ejemplo.',
            'category_id' => $category->id,
            'region_id' => $region->id,
            'city' => 'Guadalajara',
            'terms_accepted' => true,
            'privacy_accepted' => true,
            'role' => 'admin',
            'approval_status' => 'approved',
            'approved_by' => 1,
        ])->assertRedirect();

        $user = User::query()->where('email', 'integrante@example.com')->firstOrFail();

        $this->assertSame(UserRole::Member, $user->role);
        $this->assertSame(UserApprovalStatus::Pending, $user->approval_status);
        $this->assertNull($user->approved_by);
        $this->assertNull($user->approved_at);
        $this->assertFalse($user->isFillable('approval_status'));
        $this->assertFalse($user->isFillable('role'));
    }

    public function test_approval_and_rejection_keep_the_reviewer_and_reason(): void
    {
        $admin = User::factory()->admin()->create();
        $approved = User::factory()->create();
        $rejected = User::factory()->create();

        $approved->forceFill([
            'approval_status' => UserApprovalStatus::Approved,
            'approved_by' => $admin->id,
            'approved_at' => now(),
        ])->save();
        $rejected->forceFill([
            'approval_status' => UserApprovalStatus::Rejected,
            'rejection_reason' => 'Faltan documentos',
        ])->save();

        $this->assertSame($admin->id, $approved->fresh()->approver->id);
        $this->assertNotNull($approved->fresh()->approved_at);
        $this->assertSame('Faltan documentos', $rejected->fresh()->rejection_reason);
        $this->assertNull($rejected->fresh()->approved_by);
        $this->assertCount(1, $admin->approvedAccounts);
        $this->assertSame(UserApprovalStatus::Approved, $admin->approval_status);
    }

    public function test_migration_preserves_access_for_accounts_that_already_existed(): void
    {
        $migration = require database_path('migrations/2026_11_24_000001_add_approval_to_users_table.php');
        $migration->down();

        $id = DB::table('users')->insertGetId([
            'name' => 'Administrador anterior',
            'email' => 'anterior@example.com',
            'password' => 'hash-placeholder',
            'role' => UserRole::Admin->value,
        ]);

        $migration->up();

        $this->assertSame(
            UserApprovalStatus::Approved,
            User::query()->findOrFail($id)->approval_status,
        );
        $this->assertNull(User::query()->findOrFail($id)->approved_at);
        DB::table('users')->insert([
            'name' => 'Cuenta nueva',
            'email' => 'nueva@example.com',
            'password' => 'hash-placeholder',
        ]);

        $this->assertSame('pending', DB::table('users')->where('email', 'nueva@example.com')->value('approval_status'));
    }
}
