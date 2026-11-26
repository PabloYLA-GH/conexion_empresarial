export default function () {
    return (
        <>
            <div className="card border border-slate-200 shadow-xs">
                <div className="card-body">
                    <h2 className="card-title text-primary uppercase">
                        Editar información del perfil
                    </h2>
                    <p>Estado actual: Perfil sin completar</p>
                    <div className="divider before:bg-slate-200 after:bg-slate-200"></div>
                    <p className="font-bold text-slate-600">
                        1. TIPO DE INTEGRANTE
                    </p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                        <input
                            type="radio"
                            name="member-type"
                            className="btn btn-ghost"
                            aria-label="Empresa"
                            defaultChecked
                        />
                        <input
                            type="radio"
                            name="member-type"
                            className="btn btn-ghost"
                            aria-label="Emprendedor"
                        />
                        <input
                            type="radio"
                            name="member-type"
                            className="btn btn-ghost"
                            aria-label="Profesionista"
                        />
                        <input
                            type="radio"
                            name="member-type"
                            className="btn btn-ghost"
                            aria-label="Productor"
                        />
                        <input
                            type="radio"
                            name="member-type"
                            className="btn btn-ghost"
                            aria-label="Organización"
                        />
                    </div>
                    <p className="font-bold text-slate-600">
                        2. DATOS DE CUENTA
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Nombre completo *
                            </legend>
                            <input type="text" className="input w-full" />
                            <p className="label">
                                No visible en perfil publico
                            </p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Correo *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Contraseña (minimo 8 caracteres) *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                    </div>
                    <p className="font-bold text-slate-600">
                        3. FICHA COMERCIAL O PROFESIONAL
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend p-0">
                                Subir foto o logotipo de la empresa
                            </legend>
                        </fieldset>
                        <fieldset className="fieldset w-full rounded-box border border-primary bg-primary/10 p-4 md:col-span-2">
                            <div className="flex flex-col gap-2 md:flex-row">
                                <label
                                    htmlFor="logo-business-image"
                                    className="btn btn-primary"
                                >
                                    Subir foto o logotipo de la empresa
                                </label>
                                <p>
                                    Formato cuadrado 400 × 400 px (mínimo 200 ×
                                    200 px) · Formatos PNG, JPG o WEBP · Peso
                                    máximo 2 MB (se optimiza automáticamente al
                                    cargar).
                                </p>
                            </div>
                            <input
                                id="logo-business-image"
                                type="file"
                                className="file-input hidden w-full file-input-primary"
                                accept="image/png, image/jpg, image/webp"
                            />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Nombre comercial u organización *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Giro o especialidad *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Ubicación (Ciudad y Estado) *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Teléfono de contacto verificable *
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Sitio web
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Red social
                            </legend>
                            <input type="text" className="input w-full" />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Productos o servicios principales (separados por
                                coma)
                            </legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Diseño Web, Diseño Visual, Branding Corporativo, Aplicaciones, Software a la medida."
                            />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Descripción general *
                            </legend>
                            <textarea
                                className="textarea w-full"
                                placeholder="Explica qué haces, qué productos o servicios ofreces y qué tipo de conexiones buscas en la comunidad..."
                            ></textarea>
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Qué alianzas o conexiones buscas
                            </legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Busco proveedores locales de materia prima o aliados comerciales..."
                            />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">
                                Referencias profesionales o comerciales *
                            </legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Personas o negocios que puedan dar referencia."
                            />
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend p-0">
                                Documentación (Credencial LLDM y de Elector)
                            </legend>
                        </fieldset>
                        <fieldset className="fieldset w-full rounded-box border border-primary bg-primary/10 p-4">
                            <label
                                htmlFor="logo-business-image"
                                className="btn btn-primary"
                            >
                                Credencial LLDM
                            </label>
                            <input
                                id="lldm-id-image"
                                type="file"
                                className="file-input hidden w-full file-input-primary"
                                accept="image/png, image/jpg, image/webp"
                            />
                        </fieldset>
                        <fieldset className="fieldset w-full rounded-box border border-primary bg-primary/10 p-4">
                            <label
                                htmlFor="logo-business-image"
                                className="btn btn-primary"
                            >
                                Credencial de Elector
                            </label>
                            <input
                                id="elector-id-image"
                                type="file"
                                className="file-input hidden w-full file-input-primary"
                                accept="image/png, image/jpg, image/webp"
                            />
                        </fieldset>
                    </div>
                    <p className="font-bold text-slate-600">
                        4. PRIVACIDAD Y CONSENTIMIENTO
                    </p>
                    <fieldset className="fieldset w-full rounded-box border border-primary bg-primary/10 p-4">
                        <label className="label cursor-pointer items-start gap-3 whitespace-normal">
                            <input
                                type="checkbox"
                                className="checkbox mt-0.5 shrink-0 checkbox-primary"
                            />
                            <span>
                                <span className="font-bold text-base-content">
                                    Solicitar perfil de bajo perfil.
                                </span>{' '}
                                Mostramos solo logotipo, nombre comercial y
                                canales autorizados; no publicamos nombres
                                personales ni fotografías de integrantes. La
                                verificación interna se mantiene.
                            </span>
                        </label>
                    </fieldset>
                    <fieldset className="fieldset w-full rounded-box border border-warning bg-warning/10 p-4">
                        <label className="label cursor-pointer items-start gap-3 whitespace-normal">
                            <input
                                type="checkbox"
                                className="checkbox mt-0.5 shrink-0 checkbox-warning"
                            />
                            <span>
                                <span className="font-bold text-base-content">
                                    Autorizo la revisión de mis datos
                                    (obligatorio)
                                </span>{' '}
                                para comprobar mi pertenencia a la comunidad y
                                acepto que mi información de verificación se
                                mantenga privada.
                            </span>
                        </label>
                    </fieldset>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
