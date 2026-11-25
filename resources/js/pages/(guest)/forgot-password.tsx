import { Form, Head, Link } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/public-layout';
import { login, register } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    const [emailAddress, setEmailAddress] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');

    return (
        <>
            <Head title="Recuperar contraseña" />
            <main className="flex min-w-0 justify-center bg-[#f8fafc] px-4 py-[70px] sm:px-6">
                <section
                    aria-labelledby="forgot-password-title"
                    className="flex h-fit w-full max-w-[454px] min-w-0 flex-col gap-[29px] rounded-[16px] border border-[#e2e8f0] bg-white px-6 py-[50px] sm:px-[38px]"
                >
                    <div className="flex flex-col gap-[19px]">
                        <p className="font-arial text-[12px] leading-[16px] font-bold tracking-[0.6px] text-[#133260] uppercase text-trim">
                            Acceso a Comunidad 360°
                        </p>
                        <div className="flex flex-col gap-[32px]">
                            <h1
                                id="forgot-password-title"
                                className="font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] text-trim"
                            >
                                Recuperar contraseña
                            </h1>
                            <p className="font-arial text-[16px] leading-[26px] text-[#45556c] text-trim">
                                Ingresa el correo de tu cuenta para recibir un
                                enlace de recuperación.
                            </p>
                        </div>
                    </div>

                    {status && (
                        <div
                            role="status"
                            className="min-w-0 rounded-[8px] border border-[#bcf2d7] bg-[#effcf5] px-[12px] py-[22px] font-arial text-[12px] leading-normal text-[#133260] [overflow-wrap:anywhere]"
                        >
                            Revisa tu bandeja de entrada (y spam)
                            {submittedEmail ? (
                                <>
                                    {' en '}
                                    <strong>{submittedEmail}</strong>
                                </>
                            ) : null}{' '}
                            para restablecer tu contraseña.
                        </div>
                    )}

                    <Form
                        {...email.form()}
                        onSuccess={() => setSubmittedEmail(emailAddress.trim())}
                        className="flex min-w-0 flex-col gap-[12px]"
                    >
                        {({ processing, errors }) => (
                            <>
                                <label
                                    htmlFor="recovery-email"
                                    className="font-arial text-[12px] leading-[16px] font-bold text-[#45556c] text-trim"
                                >
                                    Correo electrónico registrado
                                </label>
                                <Input
                                    id="recovery-email"
                                    type="email"
                                    name="email"
                                    value={emailAddress}
                                    onChange={(event) =>
                                        setEmailAddress(event.target.value)
                                    }
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="nombre@empresa.com"
                                    aria-invalid={Boolean(errors.email)}
                                    className="h-[40px] rounded-[8px] border-[#cad5e2] bg-white px-[20px] font-arial text-[14px] text-[#0f172b] placeholder:text-[#0f172b]/50"
                                />
                                <InputError message={errors.email} role="alert" />
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                    className="h-[33px] w-full rounded-[8px] bg-[#133260] px-[15px] font-arial text-[12px] leading-[20px] font-bold text-white shadow-none hover:bg-[#1b477e]"
                                >
                                    {processing ? (
                                        <Spinner />
                                    ) : (
                                        <KeyRound
                                            aria-hidden="true"
                                            className="size-[14px]"
                                        />
                                    )}
                                    Enviar enlace de recuperación
                                </Button>
                            </>
                        )}
                    </Form>

                    <Link
                        href={login()}
                        className="self-center font-arial text-[12px] leading-[16px] text-[#45556c] text-trim hover:underline"
                    >
                        Volver a iniciar sesión
                    </Link>

                    <div aria-hidden="true" className="h-px w-full bg-[#e2e8f0]" />

                    <p className="flex flex-wrap justify-center gap-x-[8px] gap-y-2 text-center font-arial text-[12px] leading-[20px] text-[#45556c] text-trim">
                        <span>¿Aún no tienes cuenta?</span>
                        <Link
                            href={register()}
                            className="text-[14px] font-bold text-[#133260] hover:underline"
                        >
                            Registrarme en Comunidad 360°
                        </Link>
                    </p>
                </section>
            </main>
        </>
    );
}

ForgotPassword.layout = PublicLayout;
