<?php

namespace Database\Factories\Support;

use App\Models\Country;
use App\Models\Region;

/**
 * Mexican sample data for factories (Faker has no es_MX locale).
 *
 * @phpstan-type City array{0: string, 1: string, 2: string, 3: string}
 */
final class MexicanData
{
    /** @var array<string, mixed>|null */
    private static ?array $data = null;

    /** @var array<string, string>|null */
    private static ?array $states = null;

    /**
     * @return list<City>
     */
    public static function cities(): array
    {
        /** @var list<City> */
        return self::data()['cities'];
    }

    /**
     * @return City
     */
    public static function randomCity(): array
    {
        return fake()->randomElement(self::cities());
    }

    /**
     * @return list<string>
     */
    public static function list(string $key): array
    {
        /** @var list<string> */
        return self::data()[$key];
    }

    public static function pick(string $key): string
    {
        return fake()->randomElement(self::list($key));
    }

    /**
     * @return list<string>
     */
    public static function opportunityTitles(string $kind): array
    {
        /** @var array<string, list<string>> $titles */
        $titles = self::data()['opportunity_titles'];

        return $titles[$kind];
    }

    /**
     * @return array<string, string>
     */
    public static function states(): array
    {
        /** @var array<string, string> */
        return self::$states ??= require database_path('data/mx_states.php');
    }

    public static function businessName(): string
    {
        return self::pick('business_prefixes').' '.self::pick('business_names');
    }

    /**
     * A Mexican phone number in international format, e.g. "+52 33 1234 5678".
     */
    public static function phone(string $areaCode): string
    {
        $local = fake()->numerify(str_repeat('#', 10 - strlen($areaCode)));

        return strlen($areaCode) === 2
            ? sprintf('+52 %s %s %s', $areaCode, substr($local, 0, 4), substr($local, 4))
            : sprintf('+52 %s %s %s', $areaCode, substr($local, 0, 3), substr($local, 3));
    }

    /**
     * Make sure Mexico exists, since profile locations default to country "MX".
     */
    public static function mexico(): Country
    {
        return Country::query()->firstOrCreate(['code' => 'MX'], ['name' => 'México']);
    }

    /**
     * Find or create the Mexican region (state) with the given ISO 3166-2 code.
     */
    public static function region(string $code): Region
    {
        self::mexico();

        return Region::query()->firstOrCreate(
            ['code' => $code],
            ['country_code' => 'MX', 'name' => self::states()[$code]],
        );
    }

    /**
     * @return array<string, mixed>
     */
    private static function data(): array
    {
        /** @var array<string, mixed> */
        return self::$data ??= require database_path('data/mx.php');
    }
}
