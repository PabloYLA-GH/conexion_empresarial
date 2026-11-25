<?php

namespace Tests\Feature\Database;

use App\Enums\ProfileStatus;
use App\Models\Category;
use App\Models\ContactClick;
use App\Models\Offering;
use App\Models\Opportunity;
use App\Models\Profile;
use App\Models\ProfileContact;
use App\Models\ProfileLocation;
use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_factory_creates_a_draft_profile_with_a_ulid_public_id()
    {
        $profile = Profile::factory()->create();

        $this->assertSame(ProfileStatus::Draft, $profile->status);
        $this->assertTrue(Str::isUlid($profile->public_id));
        $this->assertIsInt($profile->id);
        $this->assertNotNull($profile->memberType);
    }

    public function test_published_scope_only_returns_approved_profiles_with_a_publication_date()
    {
        $published = Profile::factory()->published()->create();
        Profile::factory()->create();
        Profile::factory()->withStatus(ProfileStatus::Pending)->create();
        Profile::factory()->create(['status' => ProfileStatus::Approved, 'published_at' => null]);

        $this->assertSame([$published->id], Profile::published()->pluck('id')->all());
    }

    public function test_profiles_are_resolved_by_slug_in_routes()
    {
        $profile = Profile::factory()->create();
        Route::middleware('web')->get('/_test/profiles/{profile}', fn (Profile $profile) => $profile->public_id);

        $this->get('/_test/profiles/'.$profile->slug)->assertOk()->assertSee($profile->public_id);
        $this->get('/_test/profiles/'.$profile->id)->assertNotFound();
    }

    public function test_soft_deleted_profiles_keep_their_related_data()
    {
        $profile = Profile::factory()->create();
        Offering::factory()->for($profile)->create();

        $profile->delete();

        $this->assertSoftDeleted($profile);
        $this->assertDatabaseCount('offerings', 1);
    }

    public function test_force_deleting_a_profile_cascades_to_its_data()
    {
        $profile = Profile::factory()->create();
        $profile->categories()->attach(Category::factory()->create(), ['is_primary' => true]);
        ProfileLocation::factory()->for($profile)->create();
        ProfileContact::factory()->for($profile)->create();
        Offering::factory()->for($profile)->create();
        Opportunity::factory()->for($profile)->create();
        ContactClick::factory()->for($profile)->create();

        $profile->forceDelete();

        foreach (['category_profile', 'profile_locations', 'profile_contacts', 'offerings', 'opportunities', 'contact_clicks'] as $table) {
            $this->assertDatabaseCount($table, 0);
        }
    }

    public function test_deleting_the_owner_keeps_the_profile_without_owner()
    {
        $user = User::factory()->create();
        $profile = Profile::factory()->create(['user_id' => $user->id]);

        $user->delete();

        $this->assertNull($profile->fresh()?->user_id);
    }

    public function test_categories_relation_exposes_the_primary_flag()
    {
        $profile = Profile::factory()->create();
        [$primary, $secondary] = Category::factory()->count(2)->create();
        $profile->categories()->attach($primary, ['is_primary' => true]);
        $profile->categories()->attach($secondary, ['is_primary' => false]);

        $flags = $profile->categories()->get()->mapWithKeys(
            fn (Category $category) => [$category->id => (bool) $category->getRelationValue('pivot')->getAttribute('is_primary')],
        );

        $this->assertTrue($flags[$primary->id]);
        $this->assertFalse($flags[$secondary->id]);
    }

    public function test_a_profile_cannot_have_two_primary_categories()
    {
        $profile = Profile::factory()->create();
        [$first, $second] = Category::factory()->count(2)->create();
        $profile->categories()->attach($first, ['is_primary' => true]);

        $this->expectException(UniqueConstraintViolationException::class);

        $profile->categories()->attach($second, ['is_primary' => true]);
    }

    public function test_slugs_are_unique_even_after_soft_delete()
    {
        $profile = Profile::factory()->create();
        $profile->delete();

        $this->expectException(UniqueConstraintViolationException::class);

        Profile::factory()->create(['slug' => $profile->slug]);
    }
}
