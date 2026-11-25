<?php

namespace App\Models;

use App\Enums\ProfileStatus;
use Database\Factories\ProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\RouteKey;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $public_id
 * @property string $slug
 * @property int $member_type_id
 * @property int|null $user_id
 * @property string $name
 * @property string|null $legal_name
 * @property string|null $tagline
 * @property string|null $summary
 * @property string|null $description
 * @property string|null $logo_path
 * @property ProfileStatus $status
 * @property bool $is_low_profile
 * @property bool $is_featured
 * @property int|null $featured_order
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable([
    'slug',
    'member_type_id',
    'name',
    'legal_name',
    'tagline',
    'summary',
    'description',
    'logo_path',
    'is_low_profile',
])]
#[RouteKey('slug')]
class Profile extends Model
{
    /** @use HasFactory<ProfileFactory> */
    use HasFactory, HasUlids, SoftDeletes;

    /**
     * Defaults that mirror the database, so new instances are consistent before saving.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => ProfileStatus::Draft->value,
        'is_low_profile' => false,
        'is_featured' => false,
    ];

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return list<string>
     */
    public function uniqueIds(): array
    {
        return ['public_id'];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ProfileStatus::class,
            'is_low_profile' => 'boolean',
            'is_featured' => 'boolean',
            'featured_order' => 'integer',
            'published_at' => 'datetime',
        ];
    }

    /**
     * Only approved profiles that have been published.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('status', ProfileStatus::Approved)->whereNotNull('published_at');
    }

    /**
     * @return BelongsTo<MemberType, $this>
     */
    public function memberType(): BelongsTo
    {
        return $this->belongsTo(MemberType::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withPivot('is_primary');
    }

    /**
     * @return HasMany<ProfileLocation, $this>
     */
    public function locations(): HasMany
    {
        return $this->hasMany(ProfileLocation::class);
    }

    /**
     * @return HasMany<ProfileContact, $this>
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(ProfileContact::class);
    }

    /**
     * @return HasMany<Offering, $this>
     */
    public function offerings(): HasMany
    {
        return $this->hasMany(Offering::class);
    }

    /**
     * @return HasMany<Opportunity, $this>
     */
    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }

    /**
     * @return HasMany<ContactClick, $this>
     */
    public function contactClicks(): HasMany
    {
        return $this->hasMany(ContactClick::class);
    }
}
