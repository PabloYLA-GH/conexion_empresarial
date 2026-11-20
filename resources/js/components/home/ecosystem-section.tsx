import { HairLine, IMG } from './glyph';
import { TextLink } from './buttons';
import { SectionHeading } from './section-heading';

const profiles = [
    {
        title: 'Empresarios y empresas',
        text: 'Empresas consolidadas, talleres industriales y comercios listos para establecer alianzas y proveeduría.',
        image: 'ecosistema-empresarios.png',
    },
    {
        title: 'Profesionistas',
        text: 'Especialistas en consultoría, derecho, contabilidad, arquitectura, tecnología y servicios técnicos.',
        image: 'ecosistema-profesionistas.png',
    },
    {
        title: 'Emprendedores',
        text: 'Proyectos emergentes con propuestas frescas en diseño, tecnología, servicios y comercio.',
        image: 'ecosistema-emprendedores.png',
    },
    {
        title: 'Productores',
        text: 'Productores locales, agroindustria y talleres artesanales orientados al abastecimiento directo.',
        image: 'ecosistema-productores.png',
    },
    {
        title: 'Organizaciones',
        text: 'Asociaciones civiles, cámaras, colectivos y redes comunitarias de impacto social y económico.',
        image: 'ecosistema-organizaciones.png',
    },
];

export function EcosystemSection() {
    return (
        <section
            id="directorio"
            className="mx-auto flex w-full max-w-[1216px] flex-col gap-[40px] lg:h-[506px] lg:gap-[59px]"
        >
            <div className="flex flex-col items-start gap-[24px] lg:flex-row lg:items-end lg:justify-end lg:gap-[122px]">
                <SectionHeading
                    eyebrow="Concepto y filosofía"
                    title="¿Quiénes integran el ecosistema?"
                    className="min-w-px flex-1"
                >
                    Selecciona un perfil de integrante para explorar sus fichas
                    directamente en el directorio.
                </SectionHeading>
                <TextLink
                    href="/directorio"
                    arrow="arrow-directory.svg"
                    arrowClassName="h-[9.333px] w-[9.334px]"
                    className="w-[175.333px] shrink-0 justify-between"
                    textClassName="text-[14px] text-center"
                >
                    Ver directorio completo
                </TextLink>
            </div>

            <div className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-5">
                {profiles.map((profile) => (
                    <article key={profile.title} className="flex flex-col">
                        <div className="relative h-[172px] w-full rounded-t-[12px] border-x border-t border-solid border-[#e2e8f0]">
                            <img
                                alt=""
                                src={`${IMG}/${profile.image}`}
                                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-t-[12px] object-cover"
                            />
                        </div>
                        <div className="flex w-full flex-col items-start gap-[23px] rounded-b-[12px] border-x border-b border-solid border-[#e2e8f0] p-[20px]">
                            <div className="flex w-full flex-col items-start gap-[14px]">
                                <h3 className="w-full font-heading text-[14px] leading-[20px] font-bold text-[#0f172b] text-trim">
                                    {profile.title}
                                </h3>
                                <p className="w-full font-arial text-[12px] leading-[19.5px] text-[#45556c] text-trim">
                                    {profile.text}
                                </p>
                            </div>
                            <div className="flex w-full flex-col items-start gap-[12px]">
                                <HairLine src="divider-card-small.svg" />
                                <TextLink
                                    href="#directorio"
                                    arrow="arrow-explorar.svg"
                                >
                                    Explorar
                                </TextLink>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
