import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { login } from '@/routes';

export default function RegistrationPending() {
    return (
        <>
            <Head title="Solicitud recibida" />
            <main className="min-w-0 px-4 py-[70px] sm:px-6">
                <section
                    aria-labelledby="pending-title"
                    className="mx-auto w-full max-w-[600px] rounded-[16px] border border-[#e2e8f0] bg-white px-6 py-12 sm:px-10"
                >
                    <p className="font-arial text-[12px] font-bold tracking-[0.6px] text-[#133260] uppercase">
                        Registro de integrantes
                    </p>
                    <h1
                        id="pending-title"
                        className="font-heading mt-4 text-[30px] leading-9 font-extrabold text-[#020618]"
                    >
                        Recibimos tu solicitud
                    </h1>
                    <p className="font-arial mt-5 text-[16px] leading-7 text-[#45556c]">
                        Tu cuenta y perfil están pendientes de revisión
                        administrativa. Te avisaremos cuando tu cuenta sea
                        aprobada para que puedas iniciar sesión.
                    </p>
                    <p className="font-arial mt-3 text-sm text-[#45556c]">
                        Después de la aprobación podrás verificar tu correo con
                        el enlace recibido o solicitar uno nuevo.
                    </p>
                    <Link
                        href={login()}
                        className="font-heading mt-8 inline-flex rounded-[8px] bg-[#133260] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#1c4c88]"
                    >
                        Ir a iniciar sesión
                    </Link>
                </section>
            </main>
        </>
    );
}

RegistrationPending.layout = PublicLayout;
