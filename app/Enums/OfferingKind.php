<?php

namespace App\Enums;

/**
 * Whether an offering is a product or a service.
 */
enum OfferingKind: string
{
    case Product = 'product';
    case Service = 'service';

    /**
     * Human-readable label shown in the interface.
     */
    public function label(): string
    {
        return match ($this) {
            self::Product => 'Producto',
            self::Service => 'Servicio',
        };
    }
}
