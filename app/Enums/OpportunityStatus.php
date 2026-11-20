<?php

namespace App\Enums;

/**
 * Lifecycle status of an opportunity.
 */
enum OpportunityStatus: string
{
    case Open = 'open';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';
    case Closed = 'closed';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Open => 'Activo',
            self::InProgress => 'En proceso',
            self::Resolved => 'Resuelto',
            self::Closed => 'Cerrado',
        };
    }
}
