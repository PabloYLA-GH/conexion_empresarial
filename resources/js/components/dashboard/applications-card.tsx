import clsx from 'clsx';

export enum ApplicationCardType {
    Oportunidad = 'Oportunidad Comercial',
    Alianza = 'Alianza estratégica',
}

interface ApplicationCardProps {
    name: string;
    message: string;
    type: ApplicationCardType;
    date: Date | string;
}

export default function ({ name, message, type, date }: ApplicationCardProps) {
    return (
        <div className="card border border-primary/50 bg-primary/5">
            <div className="card-body p-4 md:p-6">
                <div className="grid grid-cols-[1fr_auto] items-start gap-x-3 gap-y-4 md:grid-cols-12 md:items-center md:gap-4">
                    <div className="col-span-1 flex min-w-0 items-start gap-3 md:col-span-4">
                        <div className="flex w-full min-w-0 flex-col">
                            <span className="truncate text-lg leading-tight font-bold text-primary md:text-xl md:uppercase">
                                {name}
                            </span>
                            <span className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm md:min-h-[3rem] md:text-base">
                                {message}
                            </span>
                        </div>
                    </div>

                    <div className="col-span-1 row-start-2 flex md:col-span-4 md:row-start-auto md:justify-center">
                        <div
                            className={clsx(
                                'badge w-full badge-soft py-3 font-medium badge-primary md:w-56',
                                {
                                    'badge-success':
                                        type == ApplicationCardType.Alianza,
                                },
                            )}
                        >
                            {type}
                        </div>
                    </div>

                    <div className="col-start-2 row-start-1 flex items-center justify-end gap-2 text-sm whitespace-nowrap md:col-span-3 md:col-start-auto md:row-start-auto md:justify-center">
                        <span>{date.toString()}</span>
                    </div>

                    <div className="col-start-2 row-start-2 flex items-center justify-end md:col-span-1 md:col-start-auto md:row-start-auto">
                        <details className="dropdown dropdown-left dropdown-end">
                            <summary className="btn btn-ghost px-2 btn-sm md:btn-outline md:px-3 md:btn-md md:btn-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    className="text-primary"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 14q-.82 0-1.41-.59T4 12t.59-1.41T6 10q.83 0 1.41.59Q8 11.18 8 12t-.59 1.41T6 14m6 0q-.82 0-1.41-.59T10 12t.59-1.41T12 10t1.41.59T14 12t-.59 1.41T12 14m6 0q-.82 0-1.41-.59T16 12t.59-1.41T18 10t1.41.59T20 12t-.59 1.41T18 14"></path>
                                </svg>
                            </summary>
                            <ul className="dropdown-content menu z-10 w-52 rounded-box border border-base-200 bg-base-100 p-2 shadow-md">
                                <li>
                                    <a>Archivar</a>
                                </li>
                                <li>
                                    <a>Agregar a favoritos</a>
                                </li>
                                <div className="divider my-0"></div>
                                <li>
                                    <a className="text-error">Eliminar</a>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
