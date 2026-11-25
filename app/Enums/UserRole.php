<?php

namespace App\Enums;

/**
 * Role of a user in the platform.
 */
enum UserRole: string
{
    case Admin = 'admin';
    case Member = 'member';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrador',
            self::Member => 'Integrante',
        };
    }
}
