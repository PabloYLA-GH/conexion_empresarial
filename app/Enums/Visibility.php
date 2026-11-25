<?php

namespace App\Enums;

/**
 * Who can see a piece of profile data.
 */
enum Visibility: string
{
    case Public = 'public';
    case Members = 'members';
    case OnRequest = 'on_request';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Public => 'Público',
            self::Members => 'Solo integrantes',
            self::OnRequest => 'Bajo solicitud',
        };
    }
}
