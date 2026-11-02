/* Imagen de producto o servicio con respaldo:
   si no hay foto, o la foto no carga, muestra un dibujo de la categoría. */

import { useState } from "react";
import IlustracionRespaldo from "./IlustracionRespaldo.jsx";

export default function ImagenProducto({ src, alt, ilustracion, className = "", prioridad = false, nombre = "" }) {
  const [fallo, setFallo] = useState(false);
  const hayImagen = Boolean(src) && !fallo;

  return (
    <div className={`imagen-producto ${hayImagen ? "" : "imagen-producto--respaldo"} ${className}`}>
      {hayImagen ? (
        <img
          src={src}
          alt={alt || ""}
          loading={prioridad ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFallo(true)}
        />
      ) : (
        <>
          <IlustracionRespaldo tipo={ilustracion} />
          {nombre && <span className="imagen-producto__leyenda">Foto próximamente</span>}
          {alt && <span className="solo-lectores">{alt}</span>}
        </>
      )}
    </div>
  );
}
