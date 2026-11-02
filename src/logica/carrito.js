/* =====================================================================
   LÓGICA DEL CARRITO
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.

   Cada línea del carrito guarda SOLO referencias y elecciones del
   cliente. Nunca copia nombre, imagen ni precio: esos datos se leen
   siempre del catálogo (fuente única de verdad).

   Forma de una línea:
   {
     idLinea:        "l-…"            identificador único de la línea
     tipoItem:       "producto" | "servicio"
     idItem:         "agendas-personalizadas"
     modalidad:      "estandar" | "personalizado"
     cantidad:       2
     variante:       "Semanal" | null   (opción del modelo estándar)
     personalizacion:{ descripcion: "…", talle: "M" }
     observaciones:  "…"
   }

   Este formato está pensado para enviarse tal cual a una futura API.
   ===================================================================== */

export const TIPOS_ITEM = ["producto", "servicio"];
export const MODALIDADES = ["estandar", "personalizado"];
export const CANTIDAD_MAXIMA_GENERAL = 100000;

export function crearIdLinea() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `l-${crypto.randomUUID()}`;
  }
  return `l-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Limpia la personalización: solo textos, sin vacíos. */
export function limpiarPersonalizacion(personalizacion) {
  const limpia = {};
  if (!personalizacion || typeof personalizacion !== "object" || Array.isArray(personalizacion)) return limpia;
  for (const [clave, valor] of Object.entries(personalizacion)) {
    if (typeof clave === "string" && typeof valor === "string" && valor.trim() !== "") {
      limpia[clave] = valor.trim().slice(0, 2000);
    }
  }
  return limpia;
}

export function ajustarCantidad(cantidad, minima = 1, maxima = CANTIDAD_MAXIMA_GENERAL) {
  const numero = Math.floor(Number(cantidad));
  if (!Number.isFinite(numero)) return minima;
  return Math.min(Math.max(numero, minima), maxima);
}

/** Crea una línea nueva con datos validados. */
export function crearLinea({ tipoItem, idItem, modalidad, cantidad, variante, personalizacion, observaciones }) {
  return {
    idLinea: crearIdLinea(),
    tipoItem: TIPOS_ITEM.includes(tipoItem) ? tipoItem : "producto",
    idItem: String(idItem),
    modalidad: MODALIDADES.includes(modalidad) ? modalidad : "personalizado",
    cantidad: ajustarCantidad(cantidad),
    variante: typeof variante === "string" && variante.trim() !== "" ? variante.trim() : null,
    personalizacion: modalidad === "personalizado" ? limpiarPersonalizacion(personalizacion) : {},
    observaciones: typeof observaciones === "string" ? observaciones.trim().slice(0, 2000) : "",
  };
}

/** Dos líneas son "la misma elección" si coinciden producto, modalidad y detalles. */
function sonMismaEleccion(a, b) {
  return (
    a.tipoItem === b.tipoItem &&
    a.idItem === b.idItem &&
    a.modalidad === b.modalidad &&
    a.variante === b.variante &&
    a.observaciones === b.observaciones &&
    JSON.stringify(ordenarClaves(a.personalizacion)) === JSON.stringify(ordenarClaves(b.personalizacion))
  );
}

function ordenarClaves(objeto) {
  return Object.keys(objeto || {})
    .sort()
    .reduce((acumulado, clave) => ({ ...acumulado, [clave]: objeto[clave] }), {});
}

/* ── REDUCER: única forma de modificar el carrito ─────────────────────── */
export function reducerCarrito(estado, accion) {
  switch (accion.tipo) {
    case "agregar": {
      const nueva = accion.linea;
      const maxima = accion.cantidadMaxima || CANTIDAD_MAXIMA_GENERAL;
      const existente = estado.lineas.find((linea) => sonMismaEleccion(linea, nueva));
      if (existente) {
        // Misma elección exacta: se suman las unidades en la misma línea.
        return {
          ...estado,
          lineas: estado.lineas.map((linea) =>
            linea.idLinea === existente.idLinea
              ? { ...linea, cantidad: ajustarCantidad(linea.cantidad + nueva.cantidad, 1, maxima) }
              : linea
          ),
        };
      }
      // Personalizaciones distintas del mismo producto = líneas independientes.
      return { ...estado, lineas: [...estado.lineas, { ...nueva, cantidad: ajustarCantidad(nueva.cantidad, 1, maxima) }] };
    }

    case "actualizar":
      return {
        ...estado,
        lineas: estado.lineas.map((linea) =>
          linea.idLinea === accion.idLinea
            ? {
                ...linea,
                cantidad: ajustarCantidad(accion.cambios.cantidad ?? linea.cantidad, 1, accion.cantidadMaxima),
                variante: accion.cambios.variante !== undefined ? accion.cambios.variante || null : linea.variante,
                modalidad: MODALIDADES.includes(accion.cambios.modalidad) ? accion.cambios.modalidad : linea.modalidad,
                personalizacion:
                  accion.cambios.personalizacion !== undefined
                    ? limpiarPersonalizacion(accion.cambios.personalizacion)
                    : linea.personalizacion,
                observaciones:
                  typeof accion.cambios.observaciones === "string"
                    ? accion.cambios.observaciones.trim().slice(0, 2000)
                    : linea.observaciones,
              }
            : linea
        ),
      };

    case "cambiarCantidad":
      return {
        ...estado,
        lineas: estado.lineas.map((linea) =>
          linea.idLinea === accion.idLinea
            ? { ...linea, cantidad: ajustarCantidad(accion.cantidad, accion.cantidadMinima || 1, accion.cantidadMaxima) }
            : linea
        ),
      };

    case "quitar":
      return { ...estado, lineas: estado.lineas.filter((linea) => linea.idLinea !== accion.idLinea) };

    case "vaciar":
      return { ...estado, lineas: [] };

    case "reemplazar": // usado al sincronizar entre pestañas
      return { ...estado, lineas: accion.lineas };

    default:
      return estado;
  }
}

/* ── VALIDACIÓN DE LÍNEAS GUARDADAS ──────────────────────────────────── */
/** Devuelve solo las líneas con estructura correcta (descarta datos dañados). */
export function validarLineas(lineas) {
  if (!Array.isArray(lineas)) return [];
  const ids = new Set();
  const validas = [];
  for (const linea of lineas) {
    if (!linea || typeof linea !== "object") continue;
    if (typeof linea.idLinea !== "string" || ids.has(linea.idLinea)) continue;
    if (!TIPOS_ITEM.includes(linea.tipoItem) || !MODALIDADES.includes(linea.modalidad)) continue;
    if (typeof linea.idItem !== "string" || linea.idItem.trim() === "") continue;
    const cantidad = Number(linea.cantidad);
    if (!Number.isInteger(cantidad) || cantidad < 1) continue;
    ids.add(linea.idLinea);
    validas.push({
      idLinea: linea.idLinea,
      tipoItem: linea.tipoItem,
      idItem: linea.idItem,
      modalidad: linea.modalidad,
      cantidad: Math.min(cantidad, CANTIDAD_MAXIMA_GENERAL),
      variante: typeof linea.variante === "string" && linea.variante !== "" ? linea.variante : null,
      personalizacion: linea.modalidad === "personalizado" ? limpiarPersonalizacion(linea.personalizacion) : {},
      observaciones: typeof linea.observaciones === "string" ? linea.observaciones.slice(0, 2000) : "",
    });
  }
  return validas;
}
