<?php

namespace Database\Factories;

use App\Enums\ProfileStatus;
use App\Models\MemberType;
use App\Models\Profile;
use Database\Factories\Support\MexicanData;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = MexicanData::businessName();
        $city = MexicanData::randomCity()[1];

        return [
            'slug' => Str::slug($name).'-'.Str::lower(Str::random(5)),
            'member_type_id' => MemberType::factory(),
            'user_id' => null,
            'name' => $name,
            'legal_name' => $name.' '.MexicanData::pick('legal_suffixes'),
            'tagline' => sprintf(MexicanData::pick('taglines'), $city),
            'summary' => sprintf('%s es una empresa de %s que atiende clientes en todo México.', $name, $city),
            'description' => sprintf(
                '%s nació en %s con la idea de ofrecer productos y servicios de calidad. '
                .'Trabajamos con proveedores locales y buscamos alianzas con empresas que compartan nuestros valores. '
                .'Contáctanos para conocer nuestro catálogo y condiciones para distribuidores.',
                $name,
                $city,
            ),
            'logo_path' => null,
            'status' => ProfileStatus::Draft,
            'is_low_profile' => false,
            'is_featured' => false,
            'featured_order' => null,
            'published_at' => null,
        ];
    }

    /**
     * An approved profile that is visible in the directory.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProfileStatus::Approved,
            'published_at' => fake()->dateTimeBetween('-6 months'),
        ]);
    }

    /**
     * A published profile highlighted on the home page.
     */
    public function featured(int $order = 1): static
    {
        return $this->published()->state(fn (array $attributes) => [
            'is_featured' => true,
            'featured_order' => $order,
        ]);
    }

    /**
     * A profile in the given moderation status (not published).
     */
    public function withStatus(ProfileStatus $status): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => $status,
            'published_at' => null,
        ]);
    }
}
