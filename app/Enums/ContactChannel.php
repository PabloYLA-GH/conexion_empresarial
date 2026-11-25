<?php

namespace App\Enums;

/**
 * Channel through which a profile can be contacted.
 */
enum ContactChannel: string
{
    case Whatsapp = 'whatsapp';
    case Phone = 'phone';
    case Email = 'email';
    case Website = 'website';
    case Facebook = 'facebook';
    case Instagram = 'instagram';
    case Linkedin = 'linkedin';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Whatsapp => 'WhatsApp',
            self::Phone => 'Teléfono',
            self::Email => 'Correo electrónico',
            self::Website => 'Sitio web',
            self::Facebook => 'Facebook',
            self::Instagram => 'Instagram',
            self::Linkedin => 'LinkedIn',
        };
    }
}
