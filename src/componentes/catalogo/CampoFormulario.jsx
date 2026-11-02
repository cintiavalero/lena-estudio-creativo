/* Dibuja una pregunta del formulario según su tipo (texto, lista, fecha…). */

export default function CampoFormulario({ campo, idBase, valor, error, alCambiar }) {
  const id = `${idBase}-${campo.idCampo}`;
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;
  const describe = [campo.ayuda ? idAyuda : "", error ? idError : ""].filter(Boolean).join(" ") || undefined;
  const comunes = {
    id,
    name: campo.idCampo,
    value: valor || "",
    required: campo.obligatorio,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describe,
    onChange: (evento) => alCambiar(campo.idCampo, evento.target.value),
  };

  return (
    <div className={`campo ${error ? "campo--con-error" : ""}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {campo.etiqueta}
        {!campo.obligatorio && <span className="campo__opcional"> (opcional)</span>}
      </label>
      {campo.tipo === "textoLargo" && <textarea rows={4} placeholder={campo.ejemplo} maxLength={2000} {...comunes} />}
      {campo.tipo === "texto" && <input type="text" placeholder={campo.ejemplo} maxLength={300} {...comunes} />}
      {campo.tipo === "fecha" && <input type="date" {...comunes} />}
      {campo.tipo === "seleccion" && (
        <select {...comunes}>
          <option value="">Elegí una opción</option>
          {campo.opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      )}
      {campo.ayuda && (
        <p id={idAyuda} className="campo__ayuda">
          {campo.ayuda}
        </p>
      )}
      {error && (
        <p id={idError} className="campo__error">
          {error}
        </p>
      )}
    </div>
  );
}
