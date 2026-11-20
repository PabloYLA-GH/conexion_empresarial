<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Country>
 */
class CountryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // "X?" is reserved for private use in ISO 3166-1, so it never collides with real countries such as MX.
            'code' => 'X'.strtoupper(fake()->unique()->randomLetter()),
            'name' => fake()->country(),
        ];
    }

    /**
     * Mexico, the default country of profile locations.
     */
    public function mexico(): static
    {
        return $this->state(fn (array $attributes) => [
            'code' => 'MX',
            'name' => 'México',
        ]);
    }
}
