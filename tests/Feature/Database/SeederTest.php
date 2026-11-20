<?php

namespace Tests\Feature\Database;

use App\Models\Category;
use App\Models\Country;
use App\Models\MemberType;
use App\Models\Profile;
use App\Models\Region;
use Database\Seeders\CatalogSeeder;
use Database\Seeders\DemoProfileSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_seeder_loads_the_reference_data()
    {
        $this->seed(CatalogSeeder::class);

        $this->assertSame(249, Country::count());
        $this->assertSame(32, Region::where('country_code', 'MX')->count());
        $this->assertSame(
            ['emprendedores', 'empresarios', 'organizaciones', 'productores', 'profesionistas'],
            MemberType::orderBy('slug')->pluck('slug')->all(),
        );
        $this->assertSame(5, Category::whereNull('parent_id')->count());
        $this->assertGreaterThanOrEqual(15, Category::count());
    }

    public function test_catalog_seeder_is_idempotent()
    {
        $this->seed(CatalogSeeder::class);
        $this->seed(CatalogSeeder::class);

        $this->assertSame(249, Country::count());
        $this->assertSame(32, Region::count());
        $this->assertSame(5, MemberType::count());
        $this->assertSame(16, Category::count());
    }

    public function test_demo_seeder_creates_fifty_complete_profiles()
    {
        $this->seed([CatalogSeeder::class, DemoProfileSeeder::class]);

        $this->assertSame(50, Profile::count());
        $this->assertGreaterThan(0, Profile::published()->count());

        $profile = Profile::published()->with(['locations', 'contacts', 'offerings', 'categories'])->firstOrFail();
        $this->assertCount(1, $profile->locations);
        $this->assertGreaterThanOrEqual(2, $profile->contacts->count());
        $this->assertGreaterThanOrEqual(2, $profile->offerings->count());
        $this->assertGreaterThanOrEqual(1, $profile->categories->count());
    }
}
