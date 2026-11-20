<?php

namespace Tests\Feature\Database;

use App\Enums\ContactChannel;
use App\Enums\OpportunityDirection;
use App\Enums\OpportunityKind;
use App\Enums\OpportunityStatus;
use App\Enums\Visibility;
use App\Models\Category;
use App\Models\ContactClick;
use App\Models\Offering;
use App\Models\Opportunity;
use App\Models\Profile;
use App\Models\ProfileContact;
use App\Models\ProfileLocation;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileDataTest extends TestCase
{
    use RefreshDatabase;

    public function test_locations_default_to_mexico_and_belong_to_a_state()
    {
        $location = ProfileLocation::factory()->create();

        $this->assertSame('MX', $location->country_code);
        $this->assertSame('México', $location->country->name);
        $this->assertSame('MX', $location->region?->country_code);
        $this->assertSame(Visibility::Public, $location->visibility);
        $this->assertCount(1, $location->profile->locations);
    }

    public function test_a_profile_cannot_have_two_primary_locations()
    {
        $profile = Profile::factory()->create();
        ProfileLocation::factory()->for($profile)->primary()->create();

        $this->expectException(UniqueConstraintViolationException::class);

        ProfileLocation::factory()->for($profile)->primary()->create();
    }

    public function test_deleting_a_region_keeps_the_location()
    {
        $location = ProfileLocation::factory()->create();

        $location->region?->delete();

        $this->assertNull($location->fresh()?->region_id);
    }

    public function test_contacts_allow_one_primary_per_channel()
    {
        $profile = Profile::factory()->create();
        ProfileContact::factory()->for($profile)->channel(ContactChannel::Email)->primary()->create();
        ProfileContact::factory()->for($profile)->channel(ContactChannel::Whatsapp)->primary()->create();

        $this->assertCount(2, $profile->contacts);

        $this->expectException(UniqueConstraintViolationException::class);

        ProfileContact::factory()->for($profile)->channel(ContactChannel::Email)->primary()->create();
    }

    public function test_phone_contacts_are_stored_in_e164_format()
    {
        foreach ([ContactChannel::Whatsapp, ContactChannel::Phone] as $channel) {
            $contact = ProfileContact::factory()->channel($channel)->create();

            $this->assertMatchesRegularExpression('/^\+52\d{10}$/', $contact->value);
        }
    }

    public function test_offerings_survive_the_deletion_of_their_category()
    {
        $category = Category::factory()->create();
        $offering = Offering::factory()->create(['category_id' => $category->id]);

        $this->assertTrue($offering->category?->is($category));

        $category->delete();

        $this->assertNull($offering->fresh()?->category_id);
    }

    public function test_opportunities_default_to_open_and_build_the_badge()
    {
        $opportunity = Opportunity::factory()->create([
            'kind' => OpportunityKind::Supplier,
            'direction' => OpportunityDirection::Seeking,
        ]);

        $this->assertSame(OpportunityStatus::Open, $opportunity->status);
        $this->assertSame('Busco proveedor', $opportunity->badge());
        $this->assertSame('En proceso', OpportunityStatus::InProgress->label());
    }

    public function test_contact_clicks_only_store_the_creation_time()
    {
        $click = ContactClick::factory()->create();

        $this->assertNotNull($click->created_at);
        $this->assertArrayNotHasKey('updated_at', $click->getAttributes());
        $this->assertTrue($click->profile->contactClicks->contains($click));
    }
}
