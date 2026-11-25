import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/public-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Iniciar sesión" />
            <main className="flex min-w-0 justify-center px-4 py-[70px] sm:px-6">
                <section
                    aria-labelledby="login-title"
                    className="flex w-full max-w-[454px] flex-col gap-[29px] rounded-[16px] border border-solid border-[#e2e8f0] bg-white px-6 py-[50px] sm:px-[38px]"
                >
                    <div className="flex flex-col gap-[19px]">
                        <p className="font-arial text-[12px] leading-[16px] font-bold tracking-[0.6px] text-[#133260] uppercase text-trim">
                            Acceso a Comunidad 360°
                        </p>
                        <div className="flex flex-col gap-[32px]">
                            <h1
                                id="login-title"
                                className="font-heading text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#020618] text-trim"
                            >
                                Iniciar sesión
                            </h1>
                            <p className="font-arial text-[16px] leading-[26px] text-[#45556c] text-trim">
                                Accede a tu perfil, solicitudes de contacto y
                                estado de publicación.
                            </p>
                        </div>
                    </div>

                    {status && (
                        <p
                            role="status"
                            className="font-arial text-sm text-green-700"
                        >
                            {status}
                        </p>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex min-w-0 flex-col gap-[12px]"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 font-arial text-[12px] leading-[16px] font-bold text-[#45556c]">
                                        <label htmlFor="email">
                                            Correo electrónico
                                        </label>
                                        {canResetPassword && (
                                            <Link
                                                href={request()}
                                                className="hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="nombre@empresa.com"
                                        aria-invalid={Boolean(errors.email)}
                                        className="h-[40px] rounded-[8px] border-[#cad5e2] bg-white px-[20px] font-arial text-[14px] text-[#0f172b] placeholder:text-[#0f172b]/50"
                                    />
                                    <InputError
                                        message={errors.email}
                                        role="alert"
                                    />
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                    <label
                                        htmlFor="password"
                                        className="font-arial text-[12px] leading-[16px] font-bold text-[#45556c]"
                                    >
                                        Contraseña
                                    </label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Contraseña"
                                        aria-invalid={Boolean(errors.password)}
                                        className="h-[40px] rounded-[8px] border-[#cad5e2] bg-white px-[20px] font-arial text-[14px] text-[#0f172b] placeholder:text-[#0f172b]/50"
                                    />
                                    <InputError
                                        message={errors.password}
                                        role="alert"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="outline"
                                    disabled={processing}
                                    data-test="login-button"
                                    className="h-[35px] w-full rounded-[8px] border-[#cad5e2] bg-white px-[30px] font-heading text-[12px] leading-[16px] font-extrabold text-[#1d293d] shadow-none hover:border-[#133260] hover:bg-[#133260] hover:text-white"
                                >
                                    {processing && <Spinner />}
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Form>

                    <p className="flex flex-wrap justify-center gap-x-[8px] gap-y-2 text-center font-arial text-[12px] leading-[20px] text-[#45556c]">
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

Login.layout = PublicLayout;
