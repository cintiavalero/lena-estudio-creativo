/* Botones de contacto (WhatsApp, redes, email).
   Solo muestra los que tienen un dato cargado en la configuración. */

import configuracionSitio from "../../contenido/configuracionSitio.js";
import redesSociales from "../../contenido/redesSociales.js";
import textosSitio from "../../contenido/textosSitio.js";
import { crearEnlaceWhatsapp } from "../../logica/mensajeWhatsapp.js";
import { esEnlaceExterno } from "../../logica/normalizarDatos.js";
import Icono from "./Icono.jsx";

/** Lista de enlaces disponibles, en el orden: WhatsApp, redes, email. */
export function obtenerEnlacesContacto() {
  const enlaces = [];
  const whatsapp = crearEnlaceWhatsapp(textosSitio.contacto.mensajeWhatsappContacto);
  if (whatsapp) enlaces.push({ id: "whatsapp", nombre: "WhatsApp", detalle: "Consultas y pedidos", enlace: whatsapp, icono: "whatsapp" });
  for (const red of redesSociales) {
    if (esEnlaceExterno(red.enlace)) {
      enlaces.push({ id: red.idRed, nombre: red.nombre, detalle: red.usuario || "", enlace: red.enlace.trim(), icono: red.icono || "enlace" });
    }
  }
  const email = (configuracionSitio.contacto?.email || "").trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    enlaces.push({ id: "email", nombre: "Email", detalle: email, enlace: `mailto:${email}`, icono: "email" });
  }
  return enlaces;
}

export default function EnlacesContacto({ variante = "botones", className = "" }) {
  const enlaces = obtenerEnlacesContacto();
  if (enlaces.length === 0) return null;

  if (variante === "iconos") {
    return (
      <ul className={`enlaces-iconos ${className}`}>
        {enlaces.map((enlace) => (
          <li key={enlace.id}>
            <a href={enlace.enlace} target={enlace.id === "email" ? undefined : "_blank"} rel="noopener noreferrer" aria-label={enlace.nombre}>
              <Icono nombre={enlace.icono} tamano={20} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`enlaces-contacto ${className}`}>
      {enlaces.map((enlace) => (
        <li key={enlace.id}>
          <a
            className={`enlace-contacto enlace-contacto--${enlace.id}`}
            href={enlace.enlace}
            target={enlace.id === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            <Icono nombre={enlace.icono} tamano={22} />
            <span>
              <strong>{enlace.nombre}</strong>
              {enlace.detalle && <small>{enlace.detalle}</small>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
