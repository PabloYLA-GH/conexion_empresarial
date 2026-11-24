<?php

namespace Database\Factories;

use App\Enums\OpportunityApplicationStatus;
use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OpportunityApplication>
 */
class OpportunityApplicationFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'opportunity_id' => Opportunity::factory(),
            'applicant_profile_id' => Profile::factory(),
            'submitted_by_user_id' => null,
            'message' => fake()->optional()->sentence(),
            'status' => OpportunityApplicationStatus::Pending,
        ];
    }
}
