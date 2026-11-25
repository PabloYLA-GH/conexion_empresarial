import { OutlineButton } from './buttons';
import { IMG } from './glyph';
import { ProfileCard, profileBase } from './profile-card';
import type { Profile } from './profile-card';
import { SectionHeading } from './section-heading';

// Orden de lectura de la cuadrícula 3 × 3 tal como aparece en el diseño.
const profiles: Profile[] = [
    'card-9.png',
    'card-7.png',
    'card-8.png',
    'card-12.png',
    'card-10.png',
    'card-11.png',
    'card-15.png',
    'card-13.png',
    'card-14.png',
].map((file) => ({ ...profileBase, image: `${IMG}/${file}` }));

export function FeaturedProfilesSection() {
    return (
        <section className="mx-auto flex w-full max-w-[1216px] flex-col gap-[77px]">
            <div className="flex flex-col items-start gap-[24px] lg:flex-row lg:items-end lg:justify-end lg:gap-[122px]">
                <SectionHeading
                    eyebrow="PERFILES DESTACADOS"
                    title="Detrás de cada empresa hay una historia."
                    className="min-w-px flex-1"
                >
                    Queremos comenzar reconociendo a las personas que, con su
                    trabajo, talento y esfuerzo, contribuyen al crecimiento de
                    nuestra comunidad.
                </SectionHeading>
                <OutlineButton
                    href="/directory"
                    className="px-[14px] py-[12px] text-[12px]"
                >
                    Consultar todos los perfiles
                </OutlineButton>
            </div>

            <div className="grid grid-cols-1 gap-x-[17px] gap-y-[22px] sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((profile) => (
                    <ProfileCard
                        key={profile.image}
                        profile={profile}
                        className="min-h-[513px]"
                    />
                ))}
            </div>
        </section>
    );
}
