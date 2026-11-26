import ApplicationsCard, { ApplicationCardType } from "@/components/dashboard/applications-card";

export default function () {

    return <>
        <div className="card border border-slate-200 shadow-xs">
            <div className="card-body">
                <h2 className='card-title text-primary uppercase'>
                    Solicitudes de contacto eliminadas o archivadas
                </h2>
                <p>Historia, respuestas recibidas y conversación directa sobre cada conexión eliminada o archivada.</p>
                <ApplicationsCard
                    name="Cristine Martinez"
                    message="Hola, que tal? Me dedico a la hotelería, me interesa una pagina web. Me gustaría una cotización."
                    type={ApplicationCardType.Oportunidad}
                    date="21 nov 2026"
                />
                <ApplicationsCard
                    name="Lucia perez"
                    message="Hola, me encantaria trabajar contigo en este proyecto. Se ve interesante"
                    type={ApplicationCardType.Alianza}
                    date="21 nov 2026"
                />
            </div>
        </div>
    </>
}
