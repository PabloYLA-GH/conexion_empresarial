<?php

namespace Tests\Feature\Database;

use App\Models\Category;
use App\Models\Country;
use App\Models\MemberType;
use App\Models\Profile;
use App\Models\Region;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_regions_belong_to_a_country_by_code()
    {
        $region = Region::factory()->create();

        $this->assertSame($region->country_code, $region->country->code);
        $this->assertTrue($region->country->regions->contains($region));
    }

    public function test_a_country_with_regions_cannot_be_deleted()
    {
        $region = Region::factory()->create();

        $this->expectException(QueryException::class);

        $region->country->delete();
    }

    public function test_member_types_have_singular_and_plural_names()
    {
        $type = MemberType::factory()->create(['name' => 'Empresa', 'plural_name' => 'Empresarios']);
        Profile::factory()->for($type)->create();

        $this->assertSame('Empresarios', $type->plural_name);
        $this->assertCount(1, $type->profiles);
    }

    public function test_a_member_type_in_use_cannot_be_deleted()
    {
        $profile = Profile::factory()->create();

        $this->expectException(QueryException::class);

        $profile->memberType->delete();
    }

    public function test_categories_have_parent_and_children()
    {
        $parent = Category::factory()->create();
        $child = Category::factory()->childOf($parent)->create();

        $this->assertTrue($child->parent?->is($parent));
        $this->assertTrue($parent->children->contains($child));
    }

    public function test_a_category_with_subcategories_cannot_be_deleted()
    {
        $parent = Category::factory()->create();
        Category::factory()->childOf($parent)->create();

        $this->expectException(QueryException::class);

        $parent->delete();
    }

    public function test_country_factory_never_uses_real_country_codes()
    {
        Country::factory()->mexico()->create();
        $countries = Country::factory()->count(5)->create();

        foreach ($countries as $country) {
            $this->assertStringStartsWith('X', $country->code);
        }
    }
}
