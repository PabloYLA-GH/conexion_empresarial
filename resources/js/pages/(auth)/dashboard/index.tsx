export default function () {
    return (
        <>
            <div className="grid gap-3 md:grid-cols-3">
                <div className="card border border-slate-200 shadow-xs">
                    <div className="card-body">
                        <h2 className="card-title text-primary uppercase">
                            Area privada de usuario
                        </h2>
                        <h3 className="text-2xl">Perfil sin completar</h3>
                        <p>
                            Tu ficha ya es visible públicamente en el Directorio
                            y en Vinculaciones.
                        </p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-ghost btn-primary">
                                Editar información
                            </button>
                            <button className="btn btn-ghost btn-primary">
                                Vista previa
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card border border-slate-200 shadow-xs">
                    <div className="card-body">
                        <h2 className="card-title text-primary uppercase">
                            Solicitudes recibidas
                        </h2>
                        <h3 className="text-2xl">0</h3>
                        <p>0 pendientes de atencion</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-ghost btn-primary">
                                Administrar recibidas
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card border border-slate-200 shadow-xs">
                    <div className="card-body">
                        <h2 className="card-title text-primary uppercase">
                            Solicitudes enviadas
                        </h2>
                        <h3 className="text-2xl">0</h3>
                        <p>
                            Contactos iniciados desde el directorio o
                            vinculaciones
                        </p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-ghost btn-primary">
                                Administrar enviadas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
