<?php

namespace Tests\Feature\Database;

use App\Enums\UserRole;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class UserRoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_are_members_by_default()
    {
        $user = User::factory()->create();

        $this->assertSame(UserRole::Member, $user->role);
        $this->assertSame(UserRole::Member, $user->fresh()?->role);
    }

    public function test_admin_state_sets_the_admin_role()
    {
        $this->assertSame(UserRole::Admin, User::factory()->admin()->create()->role);
    }

    public function test_role_cannot_be_set_during_registration()
    {
        $this->skipUnlessFortifyHas(Features::registration());

        $this->post(route('register.store'), [
            'name' => 'Intruso',
            'email' => 'intruso@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'admin',
        ]);

        $this->assertSame(UserRole::Member, User::where('email', 'intruso@example.com')->firstOrFail()->role);
    }

    public function test_users_have_profiles()
    {
        $user = User::factory()->create();
        Profile::factory()->count(2)->create(['user_id' => $user->id]);

        $this->assertCount(2, $user->profiles);
    }
}
