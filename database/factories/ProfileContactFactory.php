<?php

namespace Database\Factories;

use App\Enums\ContactChannel;
use App\Enums\Visibility;
use App\Models\Profile;
use App\Models\ProfileContact;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ProfileContact>
 */
class ProfileContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $channel = fake()->randomElement(ContactChannel::cases());

        return [
            'profile_id' => Profile::factory(),
            'channel' => $channel,
            'value' => self::valueFor($channel),
            'visibility' => Visibility::Public,
            'is_primary' => false,
        ];
    }

    /**
     * A contact on the given channel with a matching value.
     */
    public function channel(ContactChannel $channel): static
    {
        return $this->state(fn (array $attributes) => [
            'channel' => $channel,
            'value' => self::valueFor($channel),
        ]);
    }

    /**
     * The preferred contact for its channel.
     */
    public function primary(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_primary' => true,
        ]);
    }

    /**
     * Build a realistic value for the channel. Domains use example.com (reserved) on purpose.
     */
    private static function valueFor(ContactChannel $channel): string
    {
        $handle = Str::slug(MexicanData::businessName());
        $areaCode = MexicanData::randomCity()[3];

        return match ($channel) {
            ContactChannel::Whatsapp, ContactChannel::Phone => MexicanData::phone($areaCode),
            ContactChannel::Email => 'contacto@'.$handle.'.example.com',
            ContactChannel::Website => 'https://'.$handle.'.example.com',
            ContactChannel::Facebook => 'https://facebook.com/'.$handle,
            ContactChannel::Instagram => '@'.str_replace('-', '_', $handle),
            ContactChannel::Linkedin => 'https://linkedin.com/company/'.$handle,
        };
    }
}
