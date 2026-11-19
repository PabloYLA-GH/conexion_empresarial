import { TextLink } from './buttons';
import { FillIcon, HairLine } from './glyph';

export type Profile = {
    name: string;
    tagline: string;
    description: string;
    location: string;
    /** Ruta completa de la imagen. Si es null se muestra el fondo de relleno del diseño. */
    image: string | null;
};

export const profileBase = {
    name: 'Bamagro',
    tagline: 'Productos orgánicos para cultivos y jardín.',
    description:
        'Empresa mexicana fundada en 2010 con sede en Guadalajara, Jalisco, dedicada al desarrollo y fabricación de insumos orgánicos y convencionales para el agro, el campo extensivo, invernaderos, huertas y jardines',
    location: 'Guadalajara, Jalisco',
};

export function ProfileCard({
    profile,
    className = '',
}: {
    profile: Profile;
    className?: string;
}) {
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
                    <h3 className="text-trim w-full font-heading text-[16px] leading-[20px] font-bold text-[#0f172b]">
                        {profile.name}
                    </h3>
                    <p className="text-trim w-[346px] font-arial text-[12px] leading-[19.5px] text-[#45556c]">
                        {profile.tagline}
                    </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[23px]">
                    <p className="text-trim w-full font-arial text-[14px] leading-[19.5px] text-[#45556c]">
                        {profile.description}
                    </p>
                    <div className="flex items-center gap-[6px]">
                        <FillIcon src="icon-location.svg" className="size-[14px]" />
                        <span className="text-trim font-arial text-[12px] leading-[16px] whitespace-nowrap text-[#62748e]">
                            {profile.location}
                        </span>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-[15px]">
                    <HairLine src="divider-card.svg" />
                    <TextLink
                        href="#directorio"
                        arrow="arrow-consultar.svg"
                        arrowClassName="size-[7.778px]"
                        arrowInset="0 0 -6.73% -6.73%"
                        className="gap-[8px]"
                    >
                        Consultar perfil
                    </TextLink>
                </div>
            </div>
        </article>
    );
}
