
export default function () {

    return <>
        <div className="card border border-slate-200 shadow-xs">
            <div className="card-body">
                <h2 className='card-title text-primary uppercase'>
                    Solicitudes de contacto recibidas
                </h2>
                <p>Administra los mensajes que otros integrantes han enviado hacia tu perfil.</p>
                <div className="card border border-dotted border-slate-500">
                    <div className="card-body grid place-content-center text-slate-400">
                        Aún no has recibido solicitudes de contacto.
                    </div>
                </div>
            </div>
        </div>
    </>
}
