<?php

namespace App\Models;

use App\Enums\ContactChannel;
use Database\Factories\ContactClickFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $profile_id
 * @property ContactChannel $channel
 * @property string $session_hash
 * @property Carbon|null $created_at
 */
#[Fillable(['channel', 'session_hash'])]
class ContactClick extends Model
{
    /** @use HasFactory<ContactClickFactory> */
    use HasFactory;

    /**
     * Clicks are append-only: there is no updated_at column.
     */
    public const UPDATED_AT = null;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'channel' => ContactChannel::class,
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
