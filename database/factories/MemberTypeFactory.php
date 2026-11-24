<?php

namespace Database\Factories;

use App\Models\MemberType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<MemberType>
 */
class MemberTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = Str::ucfirst(fake()->unique()->word());

        return [
            'name' => $name,
            'plural_name' => Str::plural($name),
            'slug' => Str::slug(Str::plural($name)).'-'.Str::lower(Str::random(4)),
        ];
    }
}
