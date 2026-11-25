<?php

namespace App\Models;

use Database\Factories\CountryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 */
#[Fillable(['code', 'name'])]
#[WithoutTimestamps]
class Country extends Model
{
    /** @use HasFactory<CountryFactory> */
    use HasFactory;

    /**
     * @return HasMany<Region, $this>
     */
    public function regions(): HasMany
    {
        return $this->hasMany(Region::class, 'country_code', 'code');
    }
}
