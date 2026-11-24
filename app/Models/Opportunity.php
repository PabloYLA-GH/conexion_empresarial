<?php

namespace App\Models;

use App\Enums\OpportunityDirection;
use App\Enums\OpportunityKind;
use App\Enums\OpportunityModerationStatus;
use App\Enums\OpportunityStatus;
use Database\Factories\OpportunityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
 * @property OpportunityModerationStatus $moderation_status
 * @property int|null $reviewed_by
 * @property Carbon|null $approved_at
 * @property string|null $rejection_reason
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
        'moderation_status' => OpportunityModerationStatus::Pending->value,
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
            'moderation_status' => OpportunityModerationStatus::class,
            'approved_at' => 'datetime',
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

    /**
     * @return BelongsTo<User, $this>
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * @return HasMany<OpportunityApplication, $this>
     */
    public function applications(): HasMany
    {
        return $this->hasMany(OpportunityApplication::class);
    }

    /**
     * Approved, active opportunities from published profiles.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function publiclyVisible(Builder $query): void
    {
        $query->where('moderation_status', OpportunityModerationStatus::Approved)
            ->whereNotNull('approved_at')
            ->whereIn('status', [OpportunityStatus::Open, OpportunityStatus::InProgress])
            ->where(function (Builder $query) {
                $query->whereNull('expires_at')->orWhereDate('expires_at', '>=', today());
            })
            ->whereHas('profile', fn (Builder $profileQuery) => $profileQuery->published());
    }
}
