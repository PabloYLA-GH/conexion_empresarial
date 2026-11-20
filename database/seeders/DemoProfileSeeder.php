<?php

namespace Database\Seeders;

use App\Enums\ContactChannel;
use App\Enums\OpportunityStatus;
use App\Enums\ProfileStatus;
use App\Models\Category;
use App\Models\ContactClick;
use App\Models\MemberType;
use App\Models\Offering;
use App\Models\Opportunity;
use App\Models\Profile;
use App\Models\ProfileContact;
use App\Models\ProfileLocation;
use Database\Factories\ProfileFactory;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Fake directory content for local development. Never run in production.
 * Requires CatalogSeeder to have run first.
 */
class DemoProfileSeeder extends Seeder
{
    private const PROFILES = 50;

    private const FEATURED = 6;

    /**
     * Seed 50 complete demo profiles.
     */
    public function run(): void
    {
        $memberTypes = MemberType::all();
        $subcategories = Category::query()->whereNotNull('parent_id')->get();
        $cities = MexicanData::cities();

        for ($i = 0; $i < self::PROFILES; $i++) {
            $profile = $this->profileFactory($i)
                ->for($memberTypes->random())
                ->createOne();

            // The first profiles cover every city in the sample data, including the six in the directory filter.
            $city = $cities[$i % count($cities)];
            ProfileLocation::factory()->for($profile)->inCity($city)->primary()->create();

            $categories = $subcategories->random(fake()->numberBetween(1, 3))->values();
            foreach ($categories as $index => $category) {
                $profile->categories()->attach($category, ['is_primary' => $index === 0]);
            }

            // Contacts match the profile: its own domain and the area code of its city.
            $domain = Str::slug($profile->name).'.example.com';
            ProfileContact::factory()->for($profile)->primary()->create([
                'channel' => ContactChannel::Email,
                'value' => 'contacto@'.$domain,
            ]);
            ProfileContact::factory()->for($profile)->primary()->create([
                'channel' => ContactChannel::Whatsapp,
                'value' => MexicanData::phone($city[3]),
            ]);
            if (fake()->boolean()) {
                ProfileContact::factory()->for($profile)->create([
                    'channel' => ContactChannel::Website,
                    'value' => 'https://'.$domain,
                ]);
            }

            $offerings = fake()->numberBetween(2, 4);
            for ($order = 0; $order < $offerings; $order++) {
                Offering::factory()->for($profile)->create([
                    'category_id' => $categories->first()?->id,
                    'sort_order' => $order,
                ]);
            }

            if (fake()->boolean(30)) {
                Opportunity::factory()
                    ->for($profile)
                    ->withStatus(fake()->randomElement(OpportunityStatus::cases()))
                    ->create();
            }

            if ($profile->status === ProfileStatus::Approved) {
                ContactClick::factory()->for($profile)->count(fake()->numberBetween(0, 10))->create();
            }
        }
    }

    /**
     * Mix of statuses: mostly published, a few featured, and some in moderation.
     */
    private function profileFactory(int $index): ProfileFactory
    {
        return match (true) {
            $index < self::FEATURED => Profile::factory()->featured($index + 1),
            $index < 40 => Profile::factory()->published(),
            $index < 44 => Profile::factory()->withStatus(ProfileStatus::Pending),
            $index < 47 => Profile::factory()->withStatus(ProfileStatus::Draft),
            $index < 49 => Profile::factory()->withStatus(ProfileStatus::Rejected),
            default => Profile::factory()->withStatus(ProfileStatus::Suspended),
        };
    }
}
