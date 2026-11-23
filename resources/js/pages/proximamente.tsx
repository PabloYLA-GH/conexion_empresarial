import { Head } from '@inertiajs/react';
import {
    Briefcase,
    GraduationCap,
    Landmark,
    Monitor,
    Newspaper,
    Package,
    Sprout,
} from 'lucide-react';
import { ProximamenteCard } from '@/components/proximamente/proximamente-card';
import type { Proximamente } from '@/components/proximamente/proximamente-card';
import { ProximamenteCta } from '@/components/proximamente/proximamente-cta';
import { ProximamenteHero } from '@/components/proximamente/proximamente-hero';

const items: Proximamente[] = [
    {
        number: '01.',
        icon: Package,
        title: 'Productos y servicios',
        text: 'Espacio para descubrir, promocionar y conectar con productos y servicios de integrantes de la comunidad.',
    },
    {
        number: '02.',
        icon: GraduationCap,
        title: 'Capacitación',
        text: 'Cursos, talleres y contenidos educativos para el crecimiento personal, profesional y empresarial.',
    },
    {
        number: '03.',
        icon: Monitor,
        title: 'Recursos para Pymes',
        text: 'Biblioteca de guías, tutoriales y herramientas prácticas para fortalecer pequeños negocios.',
    },
    {
        number: '04.',
        icon: Landmark,
        title: 'Programas y apoyos',
        text: 'Información sobre convocatorias, programas gubernamentales y apoyos institucionales para empresas y emprendedores.',
    },
    {
        number: '05.',
        icon: Briefcase,
        title: 'Asesoría empresarial y profesional',
        text: 'Orientación empresarial, administrativa y jurídica.',
    },
    {
        number: '06.',
        icon: Sprout,
        title: 'Economía local y autoconsumo',
        text: 'Directorio de productores locales, iniciativas de autoconsumo y economía comunitaria.',
    },
    {
        number: '07.',
        icon: Newspaper,
        title: 'Noticias y casos de éxito',
        text: 'Historias, proyectos, noticias y experiencias de los integrantes.',
    },
];

export default function Proximamente() {
    return (
        <>
            <Head title="Próximamente" />
            <main>
                <ProximamenteHero />
                <div className="mt-[103px] bg-[#f8fafc] pt-[47px] pb-[279px]">
                    <div className="mx-auto flex w-full max-w-[1216px] flex-col items-start gap-[77px]">
                        <div className="grid w-full grid-cols-1 gap-x-[18px] gap-y-[26px] sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <ProximamenteCard
                                    key={item.number + item.title}
                                    item={item}
                                />
                            ))}
                        </div>
                        <ProximamenteCta />
                    </div>
                </div>
            </main>
        </>
    );
}
