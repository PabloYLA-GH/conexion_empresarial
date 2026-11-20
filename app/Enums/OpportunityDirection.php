<?php

namespace App\Enums;

/**
 * Whether the profile is seeking or offering. The label is the badge prefix (e.g. "Busco proveedor").
 */
enum OpportunityDirection: string
{
    case Seeking = 'seeking';
    case Offering = 'offering';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Seeking => 'Busco',
            self::Offering => 'Ofrezco',
        };
    }
}
