import { Head, Link, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/public-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Option = { id: number; name: string };
type MemberType = { slug: 'empresarios' | 'profesionistas'; name: string };
type RegistrationData = {
    member_type: string; name: string; email: string; password: string;
    password_confirmation: string; profile_name: string; profile_summary: string;
    category_id: string; region_id: string; city: string; contact_phone: string;
    terms_accepted: boolean; privacy_accepted: boolean;
};
type Props = { passwordRules: string; memberTypes: MemberType[]; categories: Option[]; regions: Option[] };
const field = 'h-11 w-full rounded-[8px] border border-[#cad5e2] bg-white px-4 font-arial text-[14px] text-[#0f172b]';
const label = 'font-arial text-[12px] font-bold text-[#314158]';
const action = 'rounded-[8px] bg-[#133260] px-6 font-heading font-extrabold text-white hover:bg-[#1c4c88]';

export default function Register({ passwordRules, memberTypes, categories, regions }: Props) {
    const [step, setStep] = useState(1);
    const form = useForm<RegistrationData>({
        member_type: 'empresarios', name: '', email: '', password: '', password_confirmation: '',
        profile_name: '', profile_summary: '', category_id: '', region_id: '', city: '',
        contact_phone: '', terms_accepted: false, privacy_accepted: false,
    });
    const isCompany = form.data.member_type === 'empresarios';
    const catalogReady = memberTypes.length === 2 && regions.length > 0 && (!isCompany || categories.length > 0);

    function advance() {
        form.clearErrors();
        if (step === 1) {
            if (!form.data.name.trim()) form.setError('name', 'Escribe el nombre del responsable.');
            else if (!form.data.email.trim()) form.setError('email', 'Escribe un correo electrónico.');
            else if (!form.data.password) form.setError('password', 'Escribe una contraseña.');
            else if (form.data.password !== form.data.password_confirmation) form.setError('password_confirmation', 'Las contraseñas no coinciden.');
            else { setStep(2); return; }
        } else if (step === 2) {
            if (!form.data.profile_name.trim()) form.setError('profile_name', 'Escribe el nombre del perfil.');
            else if (!form.data.profile_summary.trim()) form.setError('profile_summary', 'Escribe una descripción breve.');
            else if (isCompany && !form.data.category_id) form.setError('category_id', 'Selecciona un giro empresarial.');
            else if (!form.data.region_id) form.setError('region_id', 'Selecciona un estado.');
            else if (!form.data.city.trim()) form.setError('city', 'Escribe la ciudad.');
            else { setStep(3); return; }
        }
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (step < 3) { advance(); return; }
        form.clearErrors();
        if (!form.data.terms_accepted) { form.setError('terms_accepted', 'Debes aceptar los términos.'); return; }
        if (!form.data.privacy_accepted) { form.setError('privacy_accepted', 'Debes aceptar el aviso de privacidad.'); return; }
        form.post(store().url, {
            onError: (errors) => {
                if (['member_type', 'name', 'email', 'password', 'password_confirmation'].some((key) => key in errors)) setStep(1);
                else if (['profile_name', 'profile_summary', 'category_id', 'region_id', 'city', 'contact_phone'].some((key) => key in errors)) setStep(2);
            },
        });
    }

    return <>
        <Head title="Registro de integrantes" />
        <main className="min-w-0 px-4 py-[70px] sm:px-6">
            <section aria-labelledby="registration-title" className="mx-auto w-full max-w-[872px] rounded-[16px] border border-[#e2e8f0] bg-white px-5 py-8 sm:px-10 sm:py-12">
                <p className="font-arial text-[12px] font-bold tracking-[0.6px] text-[#133260] uppercase">Registro de integrantes</p>
                <h1 id="registration-title" className="mt-3 font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] sm:text-[34px]">Forma parte de Comunidad 360°</h1>
                <p className="mt-4 font-arial text-[15px] leading-6 text-[#45556c]">Crea tu cuenta y envía los datos iniciales de tu perfil. La administración revisará la información antes de hacerla pública en el directorio.</p>
                {!catalogReady && <p role="status" className="mt-5 rounded-[8px] border border-[#fbbf24] bg-[#fffbeb] p-4 font-arial text-sm text-[#92400e]">El registro estará disponible cuando se carguen los catálogos de integrantes, categorías y estados.</p>}
                <ol className="mt-8 grid grid-cols-3 gap-2 border-t border-[#e2e8f0] pt-6" aria-label="Etapas del registro">
                    {['Cuenta', 'Perfil inicial', 'Confirmación'].map((title, index) => <li key={title} aria-current={step === index + 1 ? 'step' : undefined} className={step === index + 1 ? 'rounded-[8px] bg-[#133260] px-2 py-3 text-center font-arial text-xs font-bold text-white sm:text-sm' : 'rounded-[8px] bg-[#f1f5f9] px-2 py-3 text-center font-arial text-xs font-bold text-[#45556c] sm:text-sm'}>{index + 1}. {title}</li>)}
                </ol>
                <form onSubmit={submit} noValidate className="mt-8">
                    {step === 1 && <div className="space-y-6">
                        <fieldset><legend className="mb-3 font-arial text-[12px] font-bold text-[#45556c] uppercase">Tipo de integrante *</legend>
                            <div className="grid gap-2 sm:grid-cols-2">{memberTypes.map((type) => <button key={type.slug} type="button" aria-pressed={form.data.member_type === type.slug} onClick={() => form.setData('member_type', type.slug)} className={form.data.member_type === type.slug ? 'min-h-11 rounded-[8px] bg-[#133260] px-4 font-arial text-sm font-bold text-white' : 'min-h-11 rounded-[8px] bg-[#f1f5f9] px-4 font-arial text-sm font-bold text-[#314158]'}>{type.name}</button>)}</div>
                            <InputError message={form.errors.member_type} />
                        </fieldset>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2"><label htmlFor="name" className={label}>Nombre completo del responsable *</label><Input id="name" autoComplete="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} className={field} /><p className="text-xs text-[#45556c]">No será visible en el perfil público.</p><InputError message={form.errors.name} /></div>
                            <div className="grid gap-2"><label htmlFor="email" className={label}>Correo electrónico *</label><Input id="email" type="email" autoComplete="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className={field} /><InputError message={form.errors.email} /></div>
                            <div className="grid gap-2"><label htmlFor="password" className={label}>Contraseña *</label><PasswordInput id="password" autoComplete="new-password" passwordrules={passwordRules} value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} className={field} /><InputError message={form.errors.password} /></div>
                            <div className="grid gap-2"><label htmlFor="password_confirmation" className={label}>Confirmar contraseña *</label><PasswordInput id="password_confirmation" autoComplete="new-password" value={form.data.password_confirmation} onChange={(e) => form.setData('password_confirmation', e.target.value)} className={field} /><InputError message={form.errors.password_confirmation} /></div>
                        </div>
                    </div>}
                    {step === 2 && <div className="space-y-6">
                        <h2 className="font-arial text-[12px] font-bold text-[#45556c] uppercase">Ficha {isCompany ? 'empresarial' : 'profesional'}</h2>
                        <div className="grid gap-2"><label htmlFor="profile_name" className={label}>{isCompany ? 'Nombre comercial' : 'Nombre público'} *</label><Input id="profile_name" value={form.data.profile_name} onChange={(e) => form.setData('profile_name', e.target.value)} className={field} /><InputError message={form.errors.profile_name} /></div>
                        <div className="grid gap-2"><label htmlFor="profile_summary" className={label}>{isCompany ? 'Descripción breve' : 'Descripción profesional'} *</label><textarea id="profile_summary" maxLength={280} value={form.data.profile_summary} onChange={(e) => form.setData('profile_summary', e.target.value)} rows={4} className="w-full resize-y rounded-[8px] border border-[#cad5e2] bg-white px-4 py-3 font-arial text-sm text-[#0f172b]" /><p className="text-xs text-[#45556c]">{form.data.profile_summary.length}/280 caracteres</p><InputError message={form.errors.profile_summary} /></div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2"><label htmlFor="category_id" className={label}>{isCompany ? 'Giro empresarial *' : 'Especialidad (opcional)'}</label><select id="category_id" value={form.data.category_id} onChange={(e) => form.setData('category_id', e.target.value)} className={field}><option value="">Selecciona una categoría</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><InputError message={form.errors.category_id} /></div>
                            <div className="grid gap-2"><label htmlFor="region_id" className={label}>Estado *</label><select id="region_id" value={form.data.region_id} onChange={(e) => form.setData('region_id', e.target.value)} className={field}><option value="">Selecciona un estado</option>{regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}</select><InputError message={form.errors.region_id} /></div>
                            <div className="grid gap-2"><label htmlFor="city" className={label}>Ciudad *</label><Input id="city" value={form.data.city} onChange={(e) => form.setData('city', e.target.value)} className={field} /><InputError message={form.errors.city} /></div>
                            <div className="grid gap-2"><label htmlFor="contact_phone" className={label}>Teléfono {isCompany ? 'comercial' : 'profesional'} (opcional)</label><Input id="contact_phone" type="tel" autoComplete="tel" value={form.data.contact_phone} onChange={(e) => form.setData('contact_phone', e.target.value)} className={field} /><p className="text-xs text-[#45556c]">Visible cuando se publique el perfil.</p><InputError message={form.errors.contact_phone} /></div>
                        </div>
                    </div>}
                    {step === 3 && <div className="space-y-6">
                        <h2 className="font-arial text-[12px] font-bold text-[#45556c] uppercase">Revisa tu solicitud</h2>
                        <dl className="grid gap-4 rounded-[8px] bg-[#f8fafc] p-5 font-arial text-sm sm:grid-cols-2">
                            <div><dt className="font-bold text-[#314158]">Tipo</dt><dd>{isCompany ? 'Empresa' : 'Profesionista'}</dd></div>
                            <div><dt className="font-bold text-[#314158]">Responsable</dt><dd>{form.data.name}</dd></div>
                            <div><dt className="font-bold text-[#314158]">Correo</dt><dd className="break-all">{form.data.email}</dd></div>
                            <div><dt className="font-bold text-[#314158]">Perfil</dt><dd>{form.data.profile_name}</dd></div>
                            <div><dt className="font-bold text-[#314158]">Estado y ciudad</dt><dd>{regions.find((region) => String(region.id) === form.data.region_id)?.name}, {form.data.city}</dd></div>
                            <div><dt className="font-bold text-[#314158]">{isCompany ? 'Giro' : 'Especialidad'}</dt><dd>{categories.find((category) => String(category.id) === form.data.category_id)?.name ?? 'No indicada'}</dd></div>
                            <div className="sm:col-span-2"><dt className="font-bold text-[#314158]">Descripción</dt><dd>{form.data.profile_summary}</dd></div>
                        </dl>
                        <div className="space-y-3 border-t border-[#e2e8f0] pt-5">
                            <label className="flex items-start gap-3 font-arial text-sm text-[#314158]"><input type="checkbox" checked={form.data.terms_accepted} onChange={(e) => form.setData('terms_accepted', e.target.checked)} className="mt-1 accent-[#133260]" /><span>Acepto los términos de uso. *</span></label><InputError message={form.errors.terms_accepted} />
                            <label className="flex items-start gap-3 font-arial text-sm text-[#314158]"><input type="checkbox" checked={form.data.privacy_accepted} onChange={(e) => form.setData('privacy_accepted', e.target.checked)} className="mt-1 accent-[#133260]" /><span>Acepto el aviso de privacidad y autorizo la revisión de mis datos. *</span></label><InputError message={form.errors.privacy_accepted} />
                            <p className="font-arial text-xs text-[#45556c]">Los enlaces oficiales de términos y aviso de privacidad están pendientes de publicación.</p>
                        </div>
                        <p className="font-arial text-sm text-[#45556c]">Tu cuenta y perfil quedarán pendientes de aprobación. No aparecerás en el directorio hasta que se apruebe la publicación.</p>
                    </div>}
                    <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-[#e2e8f0] pt-6 sm:flex-row sm:items-center">
                        {step > 1 ? <Button type="button" variant="outline" onClick={() => { form.clearErrors(); setStep(step - 1); }} className="rounded-[8px] border-[#133260] bg-white font-heading font-bold text-[#133260] shadow-none hover:bg-[#133260] hover:text-white">Volver</Button> : <span />}
                        <Button type="submit" disabled={form.processing || !catalogReady} className={action}>{form.processing && <Spinner />}{step === 3 ? 'Enviar solicitud' : 'Continuar'}</Button>
                    </div>
                </form>
                <p className="mt-8 text-center font-arial text-sm text-[#45556c]">¿Ya tienes una cuenta? <Link href={login()} className="font-bold text-[#133260] hover:underline">Iniciar sesión</Link></p>
            </section>
        </main>
    </>;
}

Register.layout = PublicLayout;
