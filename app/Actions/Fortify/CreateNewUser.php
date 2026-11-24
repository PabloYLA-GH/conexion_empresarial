<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\ContactChannel;
use App\Enums\ProfileStatus;
use App\Models\Category;
use App\Models\MemberType;
use App\Models\Region;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        $validated = Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'member_type' => ['required', Rule::in(['empresarios', 'profesionistas']), Rule::exists(MemberType::class, 'slug')],
            'profile_name' => ['required', 'string', 'max:255'],
            'profile_summary' => ['required', 'string', 'max:280'],
            'category_id' => [Rule::requiredIf(($input['member_type'] ?? null) === 'empresarios'), 'nullable', 'integer', Rule::exists(Category::class, 'id')],
            'region_id' => ['required', 'integer', Rule::exists(Region::class, 'id')->where('country_code', 'MX')],
            'city' => ['required', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:255'],
            'terms_accepted' => ['accepted'],
            'privacy_accepted' => ['accepted'],
        ])->validate();

        return DB::transaction(function () use ($validated): User {
            $memberType = MemberType::query()->where('slug', $validated['member_type'])->firstOrFail();

            $user = User::create([
                'name' => $validated['name'],
                'email' => Str::lower($validated['email']),
                'password' => $validated['password'],
            ]);

            $profile = $user->profiles()->make([
                'member_type_id' => $memberType->id,
                'slug' => Str::limit(Str::slug($validated['profile_name']), 220, '').'-'.Str::lower((string) Str::ulid()),
                'name' => $validated['profile_name'],
                'summary' => $validated['profile_summary'],
            ]);
            $profile->status = ProfileStatus::Pending;
            $profile->save();

            $profile->locations()->create([
                'country_code' => 'MX',
                'region_id' => $validated['region_id'],
                'city' => $validated['city'],
                'is_primary' => true,
            ]);

            if (! empty($validated['category_id'])) {
                $profile->categories()->attach($validated['category_id'], ['is_primary' => true]);
            }

            if (! empty($validated['contact_phone'])) {
                $profile->contacts()->create([
                    'channel' => ContactChannel::Phone,
                    'value' => $validated['contact_phone'],
                    'is_primary' => true,
                ]);
            }

            return $user;
        });
    }
}
