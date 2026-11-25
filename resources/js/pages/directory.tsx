import { Head, Link } from '@inertiajs/react';
import { DirectoryFilters } from '@/components/directory/directory-filters';
import { DirectoryHero } from '@/components/directory/directory-hero';
import { FillIcon, Glyph } from '@/components/home/glyph';
import { ProfileCard, profileBase } from '@/components/home/profile-card';
import type { Profile } from '@/components/home/profile-card';
import { directory, register } from '@/routes';

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
            <main>
                <DirectoryHero />
                <div className="mt-[96px] border-t border-solid border-[#e2e8f0] bg-[#f8fafc] pt-[92px] pb-[156px]">
                    <div className="mx-auto flex w-full max-w-[1216px] flex-col items-start gap-[32px] px-[18px] md:px-0 lg:flex-row lg:gap-[17px]">
                        <DirectoryFilters />
                        <section
                            aria-label="Perfiles"
                            className="flex w-full min-w-px flex-1 flex-col items-start gap-[36px]"
                        >
                            <p className="flex flex-wrap items-center gap-[9px] font-arial text-[12px] leading-[16px] text-[#45556c]">
                                <span>
                                    Mostrando{' '}
                                    <strong className="font-bold text-[#0f172b]">
                                        456{' '}
                                    </strong>
                                    perfiles{' '}
                                </span>
                                <span className="hidden text-[#90a1b9] md:inline">
                                    ·
                                </span>
                                <span className="hidden md:inline">
                                    436 registros aprobados en comunidad
                                </span>
                            </p>
                            <div className="grid w-full grid-cols-1 gap-x-[18.5px] gap-y-[18px] sm:grid-cols-2 lg:grid-cols-3">
                                {profiles.map((profile, index) => (
                                    <ProfileCard
                                        key={index}
                                        profile={profile}
                                        className="sm:min-h-[533px]"
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="self-center rounded-[8px] border border-solid border-[#cad5e2] bg-white px-[24px] py-[18.5px] font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#0f172b] md:hidden"
                            >
                                Ver más perfiles (56 restantes)
                            </button>
                            <div className="flex w-full flex-col items-start gap-[80px] rounded-[16px] bg-[#133260] px-[35px] py-[67px] md:hidden">
                                <div className="flex w-full flex-col items-start gap-[27px]">
                                    <h2 className="w-full font-heading text-[26px] leading-[36px] font-extrabold tracking-[-0.75px] text-white text-trim">
                                        Forma parte de Comunidad 360° desde esta
                                        primera etapa
                                    </h2>
                                    <p className="w-full font-arial text-[14px] leading-[26px] text-[#e2e8f0] text-trim">
                                        Crea tu cuenta, registra tu perfil
                                        empresarial o profesional y comienza a
                                        conectar con aliados, proveedores y
                                        oportunidades de la comunidad.
                                    </p>
                                </div>
                                <div className="flex w-full flex-col gap-[9px]">
                                    <Link
                                        href={directory()}
                                        className="flex w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-[#4f5d72] bg-[#142743] px-[25px] py-[20px]"
                                    >
                                        <FillIcon
                                            src="icon-directory.svg"
                                            className="size-[16px]"
                                        />
                                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-white text-trim">
                                            Explorar directorio
                                        </span>
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="flex w-full items-center justify-center gap-[10px] rounded-[8px] border border-solid border-white bg-white px-[25px] py-[20px]"
                                    >
                                        <Glyph
                                            src="icon-register.svg"
                                            className="h-[15.6px] w-[17.333px]"
                                            inset="-5.56% -5% -5.55% -5%"
                                        />
                                        <span className="font-arial text-[14px] leading-[20px] font-bold whitespace-nowrap text-[#133260] text-trim">
                                            Registrarme ahora
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
