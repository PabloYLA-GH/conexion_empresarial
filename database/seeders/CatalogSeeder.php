<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Country;
use App\Models\MemberType;
use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Reference data required in every environment, including production.
 * Idempotent: it can run any number of times without duplicating rows.
 */
class CatalogSeeder extends Seeder
{
    /**
     * Member types: [singular name, plural name]. The slug is the plural, used in directory URLs.
     *
     * @var list<array{0: string, 1: string}>
     */
    private const MEMBER_TYPES = [
        ['Empresa', 'Empresarios'],
        ['Profesionista', 'Profesionistas'],
        ['Emprendedor', 'Emprendedores'],
        ['Productor', 'Productores'],
        ['Organización', 'Organizaciones'],
    ];

    /**
     * Example categories, two levels deep: parent => children.
     *
     * @var array<string, list<string>>
     */
    private const CATEGORIES = [
        'Agroindustria' => ['Insumos agrícolas', 'Alimentos y bebidas'],
        'Construcción' => ['Materiales de construcción', 'Arquitectura y diseño'],
        'Servicios profesionales' => ['Contabilidad y finanzas', 'Servicios legales', 'Marketing y publicidad'],
        'Tecnología' => ['Desarrollo de software', 'Soporte y redes'],
        'Manufactura' => ['Textil y confección', 'Muebles y madera'],
    ];

    /**
     * Seed the reference data.
     */
    public function run(): void
    {
        $this->seedCountries();
        $this->seedMexicanStates();
        $this->seedMemberTypes();
        $this->seedCategories();
    }

    private function seedCountries(): void
    {
        /** @var array<string, string> $countries */
        $countries = require database_path('data/countries.php');

        $rows = [];
        foreach ($countries as $code => $name) {
            $rows[] = ['code' => $code, 'name' => $name];
        }

        Country::query()->upsert($rows, ['code'], ['name']);
    }

    private function seedMexicanStates(): void
    {
        /** @var array<string, string> $states */
        $states = require database_path('data/mx_states.php');

        $rows = [];
        foreach ($states as $code => $name) {
            $rows[] = ['country_code' => 'MX', 'code' => $code, 'name' => $name];
        }

        Region::query()->upsert($rows, ['code'], ['country_code', 'name']);
    }

    private function seedMemberTypes(): void
    {
        $rows = array_map(fn (array $type) => [
            'name' => $type[0],
            'plural_name' => $type[1],
            'slug' => Str::slug($type[1]),
        ], self::MEMBER_TYPES);

        MemberType::query()->upsert($rows, ['slug'], ['name', 'plural_name']);
    }

    private function seedCategories(): void
    {
        foreach (self::CATEGORIES as $parentName => $children) {
            $parent = Category::query()->updateOrCreate(
                ['slug' => Str::slug($parentName)],
                ['name' => $parentName, 'parent_id' => null],
            );

            foreach ($children as $childName) {
                Category::query()->updateOrCreate(
                    ['slug' => Str::slug($childName)],
                    ['name' => $childName, 'parent_id' => $parent->id],
                );
            }
        }
    }
}
