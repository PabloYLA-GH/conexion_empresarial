<?php

namespace Tests\Feature\Auth;

use App\Enums\ProfileStatus;
use App\Enums\UserApprovalStatus;
use App\Models\Category;
use App\Models\Country;
use App\Models\MemberType;
use App\Models\Region;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));

        $response->assertOk();
    }

    public function test_new_users_can_register()
    {
        Country::factory()->create(['code' => 'MX']);
        $memberType = MemberType::factory()->create(['slug' => 'empresarios']);
        $category = Category::factory()->create();
        $region = Region::factory()->create(['country_code' => 'MX']);

        $response = $this->post(route('register.store'), [
            'member_type' => 'empresarios',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'profile_name' => 'Empresa de prueba',
            'profile_summary' => 'Empresa para probar el registro.',
            'category_id' => $category->id,
            'region_id' => $region->id,
            'city' => 'Guadalajara',
            'contact_phone' => '3312345678',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ]);

        $this->assertGuest();
        $response->assertRedirect(route('registration.pending', absolute: false));
        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $profile = $user->profiles()->firstOrFail();
        $this->assertSame(UserApprovalStatus::Pending, $user->approval_status);
        $this->assertSame($memberType->id, $profile->member_type_id);
        $this->assertSame(ProfileStatus::Pending, $profile->status);
        $this->assertNull($profile->published_at);
        $this->assertSame('Guadalajara', $profile->locations()->firstOrFail()->city);
        $this->assertSame($category->id, $profile->categories()->firstOrFail()->id);
        $this->assertSame('3312345678', $profile->contacts()->firstOrFail()->value);
    }

    public function test_professional_registration_can_omit_category_and_contact(): void
    {
        Country::factory()->create(['code' => 'MX']);
        MemberType::factory()->create(['slug' => 'profesionistas']);
        $region = Region::factory()->create(['country_code' => 'MX']);

        $this->post(route('register.store'), [
            'member_type' => 'profesionistas',
            'name' => 'Profesional de prueba',
            'email' => 'profesional@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'profile_name' => 'Profesional Público',
            'profile_summary' => 'Servicios profesionales en la ciudad.',
            'region_id' => $region->id,
            'city' => 'Guadalajara',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ])->assertRedirect(route('registration.pending', absolute: false));

        $this->assertGuest();
        $profile = User::query()->where('email', 'profesional@example.com')->firstOrFail()->profiles()->firstOrFail();
        $this->assertSame(ProfileStatus::Pending, $profile->status);
        $this->assertCount(0, $profile->categories);
        $this->assertCount(0, $profile->contacts);
    }

    public function test_invalid_registration_does_not_create_partial_records(): void
    {
        Country::factory()->create(['code' => 'MX']);
        MemberType::factory()->create(['slug' => 'empresarios']);
        $region = Region::factory()->create(['country_code' => 'MX']);

        $this->post(route('register.store'), [
            'member_type' => 'empresarios',
            'name' => 'Sin giro',
            'email' => 'invalida@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'profile_name' => 'Sin giro',
            'profile_summary' => 'Falta una categoría requerida.',
            'region_id' => $region->id,
            'city' => 'Guadalajara',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ])->assertSessionHasErrors('category_id');

        $this->assertDatabaseMissing('users', ['email' => 'invalida@example.com']);
    }

    public function test_duplicate_email_cannot_create_another_account_or_profile(): void
    {
        Country::factory()->create(['code' => 'MX']);
        $region = Region::factory()->create(['country_code' => 'MX']);
        $category = Category::factory()->create();
        MemberType::factory()->create(['slug' => 'empresarios']);
        User::factory()->create(['email' => 'duplicado@example.com']);

        $this->post(route('register.store'), [
            'member_type' => 'empresarios',
            'name' => 'Otra persona',
            'email' => 'DUPLICADO@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'profile_name' => 'Otra empresa',
            'profile_summary' => 'Registro con correo duplicado.',
            'category_id' => $category->id,
            'region_id' => $region->id,
            'city' => 'Guadalajara',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ])->assertSessionHasErrors('email');

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('profiles', 0);
    }
}
