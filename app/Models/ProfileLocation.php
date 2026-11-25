<?php

namespace App\Models;

use App\Enums\Visibility;
use Database\Factories\ProfileLocationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $profile_id
 * @property string $country_code
 * @property int|null $region_id
 * @property string $city
 * @property string|null $postal_code
 * @property bool $is_primary
 * @property Visibility $visibility
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['country_code', 'region_id', 'city', 'postal_code', 'is_primary', 'visibility'])]
class ProfileLocation extends Model
{
    /** @use HasFactory<ProfileLocationFactory> */
    use HasFactory;

    /**
     * Defaults that mirror the database, so new instances are consistent before saving.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'country_code' => 'MX',
        'is_primary' => false,
        'visibility' => Visibility::Public->value,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'visibility' => Visibility::class,
        ];
    }

    /**
     * @return BelongsTo<Profile, $this>
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * @return BelongsTo<Country, $this>
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_code', 'code');
    }

    /**
     * @return BelongsTo<Region, $this>
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
