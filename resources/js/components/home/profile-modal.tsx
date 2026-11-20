import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Profile } from './profile-card';

/** Línea divisoria de 0 px de alto (como en Figma: solo el trazo, sin ocupar espacio). */
function Divider() {
    return (
        <div aria-hidden className="relative h-0 w-full shrink-0">
            <span className="absolute inset-x-0 top-0 h-px bg-[#e2e8f0]" />
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex w-full flex-col items-start gap-[28px]">
            <h3 className="font-arial text-[14px] leading-[16px] font-bold text-[#45556c] uppercase text-trim">
                {title}
            </h3>
            {children}
        </section>
    );
}

export function ProfileModal({
    profile,
    open,
    onOpenChange,
}: {
    profile: Profile;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [favorite, setFavorite] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 overflow-y-auto bg-[#151618]/50">
                    <Dialog.Content
                        aria-describedby={undefined}
                        onOpenAutoFocus={(event) => {
                            event.preventDefault();
                            (event.currentTarget as HTMLElement).focus();
                        }}
                        className="relative mx-auto mt-[184px] mb-[40px] flex w-[719px] max-w-[calc(100%-32px)] flex-col items-center gap-[29px] rounded-[16px] border border-solid border-[#e2e8f0] bg-white px-[38px] py-[40px] outline-none"
                    >
                        <header className="flex h-[91.67px] w-full items-start gap-[29px]">
                            <div
                                aria-hidden
                                className="h-full w-[89px] shrink-0 bg-[#f8fafc]"
                            />
                            <div className="relative flex h-full min-w-px flex-1 flex-col items-start gap-[19px]">
                                <span className="flex h-[20px] items-center justify-center rounded-[4px] border border-solid border-[#cad5e2] bg-[#f8fafc] px-[8px] font-arial text-[8px] font-bold tracking-[0.4px] text-[#133260] uppercase">
                                    Empresa
                                </span>
                                <Dialog.Title className="font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] text-trim">
                                    {profile.name}
                                </Dialog.Title>
                                <p className="flex items-center gap-[6px]">
                                    <MapPin
                                        aria-hidden
                                        size={12}
                                        strokeWidth={1.5}
                                        className="text-[#90a1b9]"
                                    />
                                    <span className="font-arial text-[12px] leading-[16px] text-[#62748e] text-trim">
                                        {profile.location}
                                    </span>
                                </p>
                                <div className="absolute top-[17px] right-0 flex items-center gap-[20px]">
                                    <button
                                        type="button"
                                        aria-label="Marcar como favorito"
                                        aria-pressed={favorite}
                                        onClick={() => setFavorite((v) => !v)}
                                        className="flex size-[33px] cursor-pointer items-center justify-center rounded-full border border-solid border-[#cad5e2] bg-white text-[#62748e]"
                                    >
                                        <Heart
                                            size={14}
                                            strokeWidth={1.5}
                                            fill={
                                                favorite
                                                    ? 'currentColor'
                                                    : 'none'
                                            }
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        className="flex h-[31px] cursor-pointer items-center gap-[8px] rounded-[8px] bg-[#133260] px-[12px]"
                                    >
                                        <Send
                                            aria-hidden
                                            size={12}
                                            strokeWidth={1.75}
                                            className="text-white"
                                        />
                                        <span className="font-arial text-[12px] leading-[16px] font-bold whitespace-nowrap text-white text-trim">
                                            Solicitar contacto
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </header>

                        <Divider />

                        <Section title="Descripción y trayectoria">
                            <p className="w-full font-arial text-[14px] leading-[20px] text-[#45556c] text-trim">
                                {profile.description}.
                            </p>
                        </Section>

                        <Divider />

                        <Section title="Productos y servicios">
                            <ul className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2">
                                {profile.products.map((product) => (
                                    <li
                                        key={product}
                                        className="flex h-[56px] items-center rounded-[16px] border border-solid border-[#e2e8f0] bg-[#f8fafc] px-[20px] font-arial text-[14px] text-[#314158]"
                                    >
                                        <span className="leading-[20px] text-trim">
                                            {product}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Divider />

                        <Section title="Interes de colaboración">
                            <div className="flex w-full flex-col items-start gap-[10px] rounded-[18px] px-[20px] py-[22px]">
                                <h4 className="font-arial text-[14px] leading-[16px] font-bold text-[#0f172b]">
                                    {profile.collaboration.title}
                                </h4>
                                <p className="w-full font-arial text-[14px] leading-[20px] text-[#45556c] text-trim">
                                    {profile.collaboration.text}
                                </p>
                            </div>
                        </Section>

                        <Divider />

                        <Section title="Información de contacto">
                            <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-[298px_1fr]">
                                <p className="flex h-[56px] items-center gap-[8px] rounded-[16px] border border-solid border-[#e2e8f0] bg-white px-[20px] font-arial text-[12px] text-[#314158]">
                                    <Phone
                                        aria-hidden
                                        size={12}
                                        strokeWidth={1.5}
                                        className="shrink-0 text-[#62748e]"
                                    />
                                    {profile.contact.phone}
                                </p>
                                <p className="flex h-[56px] items-center gap-[8px] rounded-[16px] border border-solid border-[#e2e8f0] bg-white px-[20px] font-arial text-[12px] text-[#314158]">
                                    <Mail
                                        aria-hidden
                                        size={12}
                                        strokeWidth={1.5}
                                        className="shrink-0 text-[#62748e]"
                                    />
                                    {profile.contact.email}
                                </p>
                            </div>
                        </Section>

                        <Divider />
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
