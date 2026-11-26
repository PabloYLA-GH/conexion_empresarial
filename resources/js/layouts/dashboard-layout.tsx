import { ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import PublicLayout from "./public-layout";
import clsx from "clsx";
import { useCurrentUrl } from "@/hooks/use-current-url";

export default function ({ children }: { children: ReactNode }) {

    const { auth: { user } } = usePage().props;
    const { currentUrl } = useCurrentUrl()

    return <PublicLayout>
        <div className="mx-5 md:mx-auto md:w-4/5 my-15">
            <h2 className='text-6xl font-bold'>{user.name}</h2>
            <div className='flex gap-4'>
                <span className='text-gray-600 mt-2'>{user.email}</span>
                <span className='text-gray-600 mt-2'>Administrador</span>
            </div>

            <div className="divider before:bg-slate-200 after:bg-slate-200"></div>
            <div className='flex gap-3 overflow-auto'>
                <Link
                    href="/dashboard"
                    className={clsx('btn btn-primary',
                        { "btn-outline": currentUrl != '/dashboard' }
                    )}>
                    Resumen de Cuenta
                </Link>
                <Link
                    href="/dashboard/profile"
                    className={clsx('btn btn-primary',
                        { "btn-outline": currentUrl != '/dashboard/profile' }
                    )}>
                    Mi perfil y edicion
                </Link>
                <Link
                    href="/dashboard/applications-received"
                    className={clsx('btn btn-primary',
                        { "btn-outline": currentUrl != '/dashboard/applications-received' }
                    )}>
                    Solicitudes recibidas (0)
                </Link>
                <Link
                    href="/dashboard/applications-sent"
                    className={clsx('btn btn-primary',
                        { "btn-outline": currentUrl != '/dashboard/applications-sent' }
                    )}>
                    Solicitudes enviadas (0)
                </Link>
                <Link
                    href="/dashboard/applications-archived-deleted"
                    className={clsx('btn btn-primary',
                        { "btn-outline": currentUrl != '/dashboard/applications-archived-deleted' }
                    )}>
                    Solicitudes archivadas y eliminadas (2)
                </Link>
            </div>
            <div className="divider before:bg-slate-200 after:bg-slate-200"></div>
            {children}
        </div>
    </PublicLayout>
}
