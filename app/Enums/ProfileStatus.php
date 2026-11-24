<?php

namespace App\Enums;

/**
 * Publication status of a member profile.
 */
enum ProfileStatus: string
{
    case Draft = 'draft';
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';
    case Suspended = 'suspended';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Borrador',
            self::Pending => 'En revisión',
            self::Approved => 'Aprobado',
            self::Rejected => 'Rechazado',
            self::Suspended => 'Suspendido',
        };
    }
}
