<?php

namespace Database\Factories;

use App\Enums\ContactChannel;
use App\Models\ContactClick;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactClick>
 */
class ContactClickFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'profile_id' => Profile::factory(),
            'channel' => fake()->randomElement(ContactChannel::cases()),
            'session_hash' => hash('sha256', fake()->uuid()),
            'created_at' => fake()->dateTimeBetween('-90 days'),
        ];
    }
}
