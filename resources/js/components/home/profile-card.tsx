import { useState } from 'react';
import { FillIcon, Glyph, HairLine } from './glyph';
import { ProfileModal } from './profile-modal';

export type Profile = {
    name: string;
    tagline: string;
    description: string;
    location: string;
    products: string[];
    collaboration: { title: string; text: string };
    contact: { phone: string; email: string };
    /** Ruta completa de la imagen. Si es null se muestra el fondo de relleno del diseño. */
    image: string | null;
};

export const profileBase = {
    name: 'Bamagro',
    tagline: 'Productos orgánicos para cultivos y jardín.',
    description:
        'Empresa mexicana fundada en 2010 con sede en Guadalajara, Jalisco, dedicada al desarrollo y fabricación de insumos orgánicos y convencionales para el agro, el campo extensivo, invernaderos, huertas y jardines',
    location: 'Guadalajara, Jalisco',
    products: ['Nutrición Y Bioestimulación', 'Protección Biológica Y Sanidad'],
    collaboration: {
        title: 'Red De Distribución Y Socios Comerciales',
        text: 'Ampliación de cobertura: Bamagro busca activamente tiendas de agroquímicos, viveros, ferreterías agrícolas y empresas distribuidoras para comercializar su catálogo en todo México.',
    },
    contact: {
        phone: 'Disponible al registrar perfil real',
        email: 'contact@bamagro.com',
    },
};

export function ProfileCard({
    profile,
    className = '',
}: {
    profile: Profile;
    className?: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <article className={`flex w-full flex-col items-start ${className}`}>
            <div
                className={`relative h-[245px] w-full rounded-t-[12px] border-x border-t border-solid border-[#e2e8f0] ${
                    profile.image ? '' : 'bg-[#e6ecf3]'
                }`}
            >
                {profile.image && (
                    <img
                        alt=""
                        src={profile.image}
                        className="pointer-events-none absolute inset-0 size-full max-w-none rounded-t-[12px] object-cover"
                    />
                )}
            </div>
            <div className="flex w-full flex-1 flex-col items-start gap-[23px] rounded-b-[12px] border-x border-b border-solid border-[#e2e8f0] bg-white p-[20px]">
                <div className="flex w-full flex-col items-start gap-[11px]">
                    <h3 className="w-full font-heading text-[16px] leading-[20px] font-bold text-[#0f172b] text-trim">
                        {profile.name}
                    </h3>
                    <p className="w-[346px] font-arial text-[12px] leading-[19.5px] text-[#45556c] text-trim">
                        {profile.tagline}
                    </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[23px]">
                    <p className="w-full font-arial text-[14px] leading-[19.5px] text-[#45556c] text-trim">
                        {profile.description}
                    </p>
                    <div className="flex items-center gap-[6px]">
                        <FillIcon
                            src="icon-location.svg"
                            className="size-[14px]"
                        />
                        <span className="font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#62748e] text-trim">
                            {profile.location}
                        </span>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-[15px]">
                    <HairLine src="divider-card.svg" />
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex shrink-0 cursor-pointer items-center gap-[8px]"
                    >
                        <span className="font-arial text-[12px] leading-[20px] font-bold whitespace-nowrap text-[#133260] text-trim">
                            Consultar perfil
                        </span>
                        <Glyph
                            src="arrow-consultar.svg"
                            className="size-[7.778px]"
                            inset="0 0 -6.73% -6.73%"
                        />
                    </button>
                </div>
            </div>
            <ProfileModal
                profile={profile}
                open={open}
                onOpenChange={setOpen}
            />
        </article>
    );
}
