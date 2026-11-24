<?php

namespace App\Enums;

enum OpportunityApplicationStatus: string
{
    case Pending = 'pending';
    case UnderReview = 'under_review';
    case Accepted = 'accepted';
    case Rejected = 'rejected';
    case Withdrawn = 'withdrawn';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pendiente',
            self::UnderReview => 'En revisión',
            self::Accepted => 'Aceptada',
            self::Rejected => 'Rechazada',
            self::Withdrawn => 'Retirada',
        };
    }
}
