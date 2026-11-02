/* =====================================================================
   ESTADO GLOBAL DEL CARRITO
   ⚙️  ARCHIVO TÉCNICO.
   Única fuente de verdad del carrito activo (Context + useReducer).
   Todos los componentes leen y modifican el carrito a través de
   useCarrito(). localStorage solo se usa para guardar una copia.
   ===================================================================== */

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { reducerCarrito, crearLinea, validarLineas } from "../logica/carrito.js";
import { leerCarritoGuardado, guardarCarrito, CLAVE_CARRITO } from "../logica/almacenamientoCarrito.js";
import { construirResumenPedido } from "../logica/resumenPedido.js";
import { useBuscarItem } from "./CatalogoContext.jsx";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [estado, despachar] = useReducer(reducerCarrito, undefined, () => ({ lineas: leerCarritoGuardado() }));
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [avisoAgregado, setAvisoAgregado] = useState(null);
  const buscarItem = useBuscarItem();
  const sincronizando = useRef(false);

  // Guarda una copia cada vez que cambia el carrito.
  useEffect(() => {
    if (sincronizando.current) {
      sincronizando.current = false;
      return;
    }
    guardarCarrito(estado.lineas);
  }, [estado.lineas]);

  // Si el cliente tiene el sitio abierto en dos pestañas, las mantiene iguales.
  useEffect(() => {
    const alCambiarEnOtraPestana = (evento) => {
      if (evento.key !== CLAVE_CARRITO) return;
      sincronizando.current = true;
      despachar({ tipo: "reemplazar", lineas: evento.newValue ? leerCarritoGuardado() : validarLineas([]) });
    };
    window.addEventListener("storage", alCambiarEnOtraPestana);
    return () => window.removeEventListener("storage", alCambiarEnOtraPestana);
  }, []);

  // El aviso "Agregado a tu pedido" se oculta solo.
  useEffect(() => {
    if (!avisoAgregado) return undefined;
    const temporizador = setTimeout(() => setAvisoAgregado(null), 4200);
    return () => clearTimeout(temporizador);
  }, [avisoAgregado]);

  const resumen = useMemo(() => construirResumenPedido(estado.lineas, buscarItem), [estado.lineas, buscarItem]);

  const agregar = useCallback(
    (datosLinea) => {
      const item = buscarItem(datosLinea.tipoItem, datosLinea.idItem);
      if (!item) return;
      despachar({ tipo: "agregar", linea: crearLinea(datosLinea), cantidadMaxima: item.cantidadMaxima });
      setAvisoAgregado({ nombre: item.nombre, momento: Date.now() });
    },
    [buscarItem]
  );

  const actualizar = useCallback(
    (idLinea, cambios) => {
      const linea = estado.lineas.find((actual) => actual.idLinea === idLinea);
      const item = linea ? buscarItem(linea.tipoItem, linea.idItem) : null;
      despachar({ tipo: "actualizar", idLinea, cambios, cantidadMaxima: item?.cantidadMaxima });
    },
    [estado.lineas, buscarItem]
  );

  const cambiarCantidad = useCallback(
    (idLinea, cantidad) => {
      const linea = estado.lineas.find((actual) => actual.idLinea === idLinea);
      const item = linea ? buscarItem(linea.tipoItem, linea.idItem) : null;
      despachar({
        tipo: "cambiarCantidad",
        idLinea,
        cantidad,
        cantidadMinima: item?.cantidadMinima,
        cantidadMaxima: item?.cantidadMaxima,
      });
    },
    [estado.lineas, buscarItem]
  );

  // Funciones estables (no cambian entre renderizados).
  const quitar = useCallback((idLinea) => despachar({ tipo: "quitar", idLinea }), []);
  const vaciar = useCallback(() => despachar({ tipo: "vaciar" }), []);
  const abrirPanel = useCallback(() => setPanelAbierto(true), []);
  const cerrarPanel = useCallback(() => setPanelAbierto(false), []);
  const cerrarAviso = useCallback(() => setAvisoAgregado(null), []);

  const valor = useMemo(
    () => ({
      lineas: estado.lineas,
      resumen,
      cantidadTotalUnidades: resumen.lineas.reduce((total, linea) => total + linea.cantidad, 0),
      agregar,
      actualizar,
      cambiarCantidad,
      quitar,
      vaciar,
      obtenerLinea: (idLinea) => estado.lineas.find((linea) => linea.idLinea === idLinea) || null,
      panelAbierto,
      abrirPanel,
      cerrarPanel,
      avisoAgregado,
      cerrarAviso,
    }),
    [estado.lineas, resumen, agregar, actualizar, cambiarCantidad, quitar, vaciar, panelAbierto, abrirPanel, cerrarPanel, avisoAgregado, cerrarAviso]
  );

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return contexto;
}
