<?php

namespace App\Models;

use App\Enums\ContactChannel;
use App\Enums\Visibility;
use Database\Factories\ProfileContactFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $profile_id
 * @property ContactChannel $channel
 * @property string $value
 * @property Visibility $visibility
 * @property bool $is_primary
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['channel', 'value', 'visibility', 'is_primary'])]
class ProfileContact extends Model
{
    /** @use HasFactory<ProfileContactFactory> */
    use HasFactory;

    /**
     * Defaults that mirror the database, so new instances are consistent before saving.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'visibility' => Visibility::Public->value,
        'is_primary' => false,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'channel' => ContactChannel::class,
            'visibility' => Visibility::class,
            'is_primary' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<Profile, $this>
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
