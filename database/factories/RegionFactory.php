<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Region>
 */
class RegionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'country_code' => fn () => Country::factory()->create()->code,
            'code' => fn (array $attributes) => $attributes['country_code'].'-'.Str::upper(fake()->unique()->lexify('???')),
            'name' => fake()->city(),
        ];
    }
}
