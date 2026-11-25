<?php

namespace Database\Factories;

use App\Enums\OfferingKind;
use App\Models\Offering;
use App\Models\Profile;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Offering>
 */
class OfferingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kind = fake()->randomElement(OfferingKind::cases());
        $name = MexicanData::pick($kind === OfferingKind::Product ? 'products' : 'services');

        return [
            'profile_id' => Profile::factory(),
            'category_id' => null,
            'kind' => $kind,
            'name' => $name,
            'description' => $kind === OfferingKind::Product
                ? $name.' elaborado con insumos de la región. Ventas de mayoreo y menudeo.'
                : $name.' para pequeñas y medianas empresas, con atención personalizada.',
            'sort_order' => 0,
        ];
    }
}
