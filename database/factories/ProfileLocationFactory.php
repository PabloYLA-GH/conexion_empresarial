<?php

namespace Database\Factories;

use App\Enums\Visibility;
use App\Models\Profile;
use App\Models\ProfileLocation;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProfileLocation>
 */
class ProfileLocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        [$regionCode, $city, $postalPrefix] = MexicanData::randomCity();

        return [
            'profile_id' => Profile::factory(),
            'country_code' => fn () => MexicanData::mexico()->code,
            'region_id' => fn () => MexicanData::region($regionCode)->id,
            'city' => $city,
            'postal_code' => $postalPrefix.fake()->numerify('###'),
            'is_primary' => false,
            'visibility' => Visibility::Public,
        ];
    }

    /**
     * A location in the given city from the Mexican sample data.
     *
     * @param  array{0: string, 1: string, 2: string, 3: string}  $city
     */
    public function inCity(array $city): static
    {
        [$regionCode, $name, $postalPrefix] = $city;

        return $this->state(fn (array $attributes) => [
            'region_id' => fn () => MexicanData::region($regionCode)->id,
            'city' => $name,
            'postal_code' => $postalPrefix.fake()->numerify('###'),
        ]);
    }

    /**
     * The main location shown on the profile card.
     */
    public function primary(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_primary' => true,
        ]);
    }
}
