import { Head } from '@inertiajs/react';
import { DirectoryFilters } from '@/components/directory/directory-filters';
import { DirectoryHero } from '@/components/directory/directory-hero';
import { ProfileCard, profileBase } from '@/components/home/profile-card';
import type { Profile } from '@/components/home/profile-card';
import { SiteFooter } from '@/components/home/site-footer';
import { SiteHeader } from '@/components/home/site-header';

const IMG = '/images/home';
const DIR = '/images/directory';

// Orden de lectura de la cuadrícula 3 × 5 tal como aparece en el diseño.
// `null` = tarjeta sin imagen (fondo de relleno del diseño, como en Figma).
const images: (string | null)[] = [
    `${IMG}/card-9.png`,
    `${IMG}/card-7.png`,
    `${IMG}/card-8.png`,
    `${IMG}/card-12.png`,
    `${IMG}/card-10.png`,
    `${IMG}/card-11.png`,
    `${IMG}/card-15.png`,
    null,
    null,
    `${DIR}/card-bruma.png`,
    `${IMG}/card-14.png`,
    `${DIR}/card-umbral.png`,
    `${DIR}/card-savia.png`,
    `${DIR}/card-nodal.png`,
    `${DIR}/card-aural.png`,
];

const profiles: Profile[] = images.map((image) => ({ ...profileBase, image }));

export default function Directorio() {
    return (
        <>
            <Head title="Directorio" />
            <div className="min-h-screen bg-white font-arial text-[#0f172b]">
                <SiteHeader current="directorio" />
                <main>
                    <DirectoryHero />
                    <div className="mt-[96px] border-t border-solid border-[#e2e8f0] bg-[#f8fafc] pt-[92px] pb-[156px]">
                        <div className="mx-auto flex w-full max-w-[1216px] items-start gap-[17px]">
                            <DirectoryFilters />
                            <section
                                aria-label="Perfiles"
                                className="flex min-w-px flex-1 flex-col items-start gap-[36px]"
                            >
                                <p className="flex h-[9px] items-center gap-[9px] font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#45556c]">
                                    <span>
                                        Mostrando{' '}
                                        <strong className="font-bold text-[#0f172b]">
                                            456{' '}
                                        </strong>
                                        perfiles{' '}
                                    </span>
                                    <span className="text-[#90a1b9]">·</span>
                                    <span>
                                        436 registros aprobados en comunidad
                                    </span>
                                </p>
                                <div className="grid w-full grid-cols-3 gap-x-[18.5px] gap-y-[18px]">
                                    {profiles.map((profile, index) => (
                                        <ProfileCard
                                            key={index}
                                            profile={profile}
                                            className="min-h-[533px]"
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
