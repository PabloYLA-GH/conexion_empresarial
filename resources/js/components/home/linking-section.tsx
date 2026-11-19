import { Glyph } from './glyph';
import { PrimaryButton } from './buttons';

const items = [
    {
        title: 'Aliados',
        text: ['Sinergias entre empresas y profesionistas para proyectos conjuntos.'],
    },
    {
        title: 'Colaboradores',
        text: ['Talento especializado para', 'fortalecer equipos y servicios.'],
    },
    {
        title: 'Proveedores',
        text: ['Abastecimiento local con productores y talleres de la comunidad.'],
    },
    {
        title: 'Oportunidades',
        text: ['Solicitudes directas con', 'seguimiento transparente en tu cuenta.'],
    },
];

export function LinkingSection() {
    return (
        <section
            id="vinculaciones"
            className="mx-auto flex h-[463px] w-full max-w-[1217px] flex-col items-start rounded-[16px] border border-solid border-[#e2e8f0] bg-white p-[66px]"
        >
            <div className="flex w-full items-center gap-[70px]">
                <div className="flex w-[484px] shrink-0 flex-col items-start gap-[39px]">
                    <div className="flex w-full flex-col items-start gap-[19px]">
                        <div className="flex items-center gap-[9px]">
                            <Glyph
                                src="icon-link-blue.svg"
                                className="h-[12.081px] w-[13.333px]"
                                inset="-5.52% -5%"
                            />
                            <span className="text-trim font-arial text-[12px] leading-[16px] font-bold tracking-[0.6px] whitespace-nowrap text-[#133260] uppercase">
                                Vinculaciones
                            </span>
                        </div>
                        <div className="flex w-full flex-col items-start gap-[32px]">
                            <h2 className="text-trim w-full font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618]">
                                Alianzas, proveeduría y colaboración directa
                                entre integrantes
                            </h2>
                            <p className="text-trim w-full font-arial text-[16px] leading-[26px] text-[#45556c]">
                                El módulo de Vinculaciones conecta necesidades
                                concretas con capacidades disponibles: encuentra
                                proveedores confiables, identifica aliados
                                estratégicos, descubre colaboradores y envía
                                solicitudes de contacto organizadas desde tu
                                cuenta.
                            </p>
                        </div>
                    </div>
                    <PrimaryButton
                        href="#vinculaciones"
                        className="px-[24px] py-[16px]"
                    >
                        Explorar Vinculaciones
                    </PrimaryButton>
                </div>

                <div className="grid min-w-px flex-1 grid-cols-2 gap-[12px] gap-y-[15px]">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="flex min-w-px flex-col items-start gap-[12px] rounded-[12px] border border-solid border-[#e2e8f0] bg-[#f8fafc] px-[20px] py-[30px]"
                        >
                            <h3 className="text-trim w-full font-heading text-[14px] leading-[20px] font-bold text-[#0f172b]">
                                {item.title}
                            </h3>
                            <p className="text-trim w-full font-arial text-[12px] leading-[19.5px] text-[#45556c]">
                                {item.text.map((line, index) => (
                                    <span key={line}>
                                        {index > 0 && <br />}
                                        {line}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
