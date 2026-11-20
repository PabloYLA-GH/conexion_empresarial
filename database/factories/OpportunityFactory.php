<?php

namespace Database\Factories;

use App\Enums\OpportunityDirection;
use App\Enums\OpportunityKind;
use App\Enums\OpportunityStatus;
use App\Models\Opportunity;
use App\Models\Profile;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Opportunity>
 */
class OpportunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kind = fake()->randomElement(OpportunityKind::cases());

        return [
            'profile_id' => Profile::factory(),
            'kind' => $kind,
            'direction' => fake()->randomElement(OpportunityDirection::cases()),
            'title' => fake()->randomElement(MexicanData::opportunityTitles($kind->value)),
            'description' => 'Buscamos establecer una relación de largo plazo. Escríbenos para conocer los detalles y requisitos.',
            'status' => OpportunityStatus::Open,
            'expires_at' => fake()->optional(0.5)->dateTimeBetween('+1 week', '+3 months'),
        ];
    }

    /**
     * An opportunity in the given status.
     */
    public function withStatus(OpportunityStatus $status): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => $status,
        ]);
    }
}
