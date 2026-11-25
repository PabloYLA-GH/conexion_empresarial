<?php

namespace App\Models;

use App\Enums\OpportunityDirection;
use App\Enums\OpportunityKind;
use App\Enums\OpportunityStatus;
use Database\Factories\OpportunityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $profile_id
 * @property OpportunityKind $kind
 * @property OpportunityDirection $direction
 * @property string $title
 * @property string|null $description
 * @property OpportunityStatus $status
 * @property Carbon|null $expires_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['kind', 'direction', 'title', 'description', 'status', 'expires_at'])]
class Opportunity extends Model
{
    /** @use HasFactory<OpportunityFactory> */
    use HasFactory, SoftDeletes;

    /**
     * Defaults that mirror the database, so new instances are consistent before saving.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => OpportunityStatus::Open->value,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'kind' => OpportunityKind::class,
            'direction' => OpportunityDirection::class,
            'status' => OpportunityStatus::class,
            'expires_at' => 'date',
        ];
    }

    /**
     * Badge text for the interface, e.g. "Busco proveedor".
     */
    public function badge(): string
    {
        return $this->direction->label().' '.mb_strtolower($this->kind->label());
    }

    /**
     * @return BelongsTo<Profile, $this>
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
