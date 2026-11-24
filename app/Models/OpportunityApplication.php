<?php

namespace App\Models;

use App\Enums\OpportunityApplicationStatus;
use Database\Factories\OpportunityApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $opportunity_id
 * @property int $applicant_profile_id
 * @property int|null $submitted_by_user_id
 * @property string|null $message
 * @property OpportunityApplicationStatus $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['message'])]
class OpportunityApplication extends Model
{
    /** @use HasFactory<OpportunityApplicationFactory> */
    use HasFactory;

    /** @var array<string, mixed> */
    protected $attributes = [
        'status' => OpportunityApplicationStatus::Pending->value,
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => OpportunityApplicationStatus::class,
        ];
    }

    /**
     * @return BelongsTo<Opportunity, $this>
     */
    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class);
    }

    /**
     * @return BelongsTo<Profile, $this>
     */
    public function applicantProfile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'applicant_profile_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by_user_id');
    }
}
