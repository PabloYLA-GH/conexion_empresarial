import clsx from "clsx"

export enum ApplicationCardType {
    Oportunidad = "Oportunidad Comercial",
    Alianza = "Alianza estratégica",
}

interface ApplicationCardProps {
    name: string
    message: string
    type: ApplicationCardType
    date: Date | string
}


export default function ({ name, message, type, date }: ApplicationCardProps) {
    return <div className="card border border-primary/50 bg-primary/5">
        <div className="card-body p-4 md:p-6">
            <div className="grid grid-cols-[1fr_auto] md:grid-cols-12 items-start md:items-center gap-y-4 gap-x-3 md:gap-4">

                <div className="col-span-1 md:col-span-4 min-w-0 flex items-start gap-3">
                    <div className="flex flex-col min-w-0 w-full">
                        <span className="text-primary md:uppercase font-bold text-lg md:text-xl leading-tight truncate">
                            {name}
                        </span>
                        <span className="text-sm md:text-base mt-1 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
                            {message}
                        </span>
                    </div>
                </div>

                <div className="col-span-1 row-start-2 md:row-start-auto md:col-span-4 flex md:justify-center">
                    <div
                        className={clsx("badge badge-soft w-full md:w-56 py-3 font-medium badge-primary",
                            { 'badge-success': type == ApplicationCardType.Alianza })}
                    >
                        {type}
                    </div>
                </div>

                <div className="col-start-2 row-start-1 md:col-start-auto md:row-start-auto md:col-span-3 flex items-center justify-end md:justify-center gap-2 text-sm whitespace-nowrap">
                    <span>{date.toString()}</span>
                </div>

                <div className="col-start-2 row-start-2 md:col-start-auto md:row-start-auto md:col-span-1 flex justify-end items-center">
                    <details className="dropdown dropdown-left dropdown-end">
                        <summary className="btn btn-ghost md:btn-outline md:btn-primary btn-sm md:btn-md px-2 md:px-3">
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
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-md border border-base-200">
                            <li><a>Archivar</a></li>
                            <li><a>Agregar a favoritos</a></li>
                            <div className="divider my-0"></div>
                            <li><a className="text-error">Eliminar</a></li>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    </div>
}
