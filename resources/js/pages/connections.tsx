import { Head } from '@inertiajs/react';
import { VinculacionCard } from '@/components/vinculaciones/vinculacion-card';
import type { Vinculacion } from '@/components/vinculaciones/vinculacion-card';
import { VinculacionFilters } from '@/components/vinculaciones/vinculacion-filters';
import { VinculacionHero } from '@/components/vinculaciones/vinculacion-hero';

const item: Vinculacion = {
    badge: 'Busco profesional',
    status: 'Activo',
    title: 'Empresa local busca diseñador gráfico para identidad visual',
    description:
        'Buscamos diseñador para crear nuestra identidad visual completa: logo, menú y materiales impresos.',
    location: 'Guadalajara, Jalisco',
    date: '2026-10-08',
    company: 'Bamagro Agroquímicos',
};

// La cuadrícula del diseño tiene 15 tarjetas (3 × 5).
const items: Vinculacion[] = Array.from({ length: 15 }, () => item);

export default function Vinculaciones() {
    return (
        <>
            <Head title="Vinculaciones" />
            <main>
                <VinculacionHero />
                <div className="mt-[101px] bg-[#f8fafc] pb-[285px]">
                    <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-[18px]">
                        <VinculacionFilters />
                        <div className="grid grid-cols-1 gap-x-[15.5px] gap-y-[19px] sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((vinculacion, index) => (
                                <VinculacionCard
                                    key={index}
                                    item={vinculacion}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
