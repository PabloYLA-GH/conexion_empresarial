<?php

namespace App\Enums;

/**
 * Type of business opportunity (vinculación).
 */
enum OpportunityKind: string
{
    case StrategicAlliance = 'strategic_alliance';
    case Supplier = 'supplier';
    case Collaborator = 'collaborator';
    case BusinessOpportunity = 'business_opportunity';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::StrategicAlliance => 'Alianza estratégica',
            self::Supplier => 'Proveedor',
            self::Collaborator => 'Colaborador',
            self::BusinessOpportunity => 'Oportunidad comercial',
        };
    }
}
