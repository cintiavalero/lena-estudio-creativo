/* =====================================================================
   Formulario para sumar un producto o servicio al pedido.
   - Modelo del catálogo: elige opción y cantidad, usa el precio publicado.
   - Personalizado: completa las preguntas configuradas en
     personalizaciones.js y queda "a cotizar".
   También se usa para EDITAR una línea que ya está en el carrito.
   ===================================================================== */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import textosSitio from "../../contenido/textosSitio.js";
import configuracionPedidos from "../../contenido/configuracionPedidos.js";
import { avisoArchivosReferencia } from "../../contenido/personalizaciones.js";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import { calcularLinea, obtenerTextoPrecioPublicado, formatearPrecio, ESTADOS_PRECIO } from "../../logica/precios.js";
import SelectorCantidad from "../comunes/SelectorCantidad.jsx";
import CampoFormulario from "./CampoFormulario.jsx";

const textos = textosSitio.ficha;

function modalidadInicial(item, lineaEditando, modoPedido) {
  if (lineaEditando) return lineaEditando.modalidad;
  if (modoPedido === "personalizado" && item.permitePersonalizacion) return "personalizado";
  return item.permiteCompraEstandar ? "estandar" : "personalizado";
}

export default function FormularioPedido({ item, lineaEditando = null, modoPedido = "" }) {
  const { agregar, actualizar } = useCarrito();
  const navegar = useNavigate();
  const formulario = useRef(null);
  const ambasModalidades = item.permiteCompraEstandar && item.permitePersonalizacion;
  const idBase = `pedido-${item.id}`;

  const [modalidad, setModalidad] = useState(() => modalidadInicial(item, lineaEditando, modoPedido));
  const [variante, setVariante] = useState(lineaEditando?.variante || "");
  const [cantidad, setCantidad] = useState(lineaEditando?.cantidad || item.cantidadMinima);
  const [valores, setValores] = useState(lineaEditando?.personalizacion || {});
  const [observaciones, setObservaciones] = useState(lineaEditando?.observaciones || "");
  const [errores, setErrores] = useState({});
  const enfocarPersonalizacion = useRef(false);

  // Si se cambia de producto (navegando entre fichas), se reinicia el formulario.
  useEffect(() => {
    setModalidad(modalidadInicial(item, lineaEditando, modoPedido));
    setVariante(lineaEditando?.variante || "");
    setCantidad(lineaEditando?.cantidad || item.cantidadMinima);
    setValores(lineaEditando?.personalizacion || {});
    setObservaciones(lineaEditando?.observaciones || "");
    setErrores({});
  }, [item, lineaEditando, modoPedido]);

  // Al tocar "Personalizar este producto", lleva el foco a la primera pregunta.
  useEffect(() => {
    if (modalidad === "personalizado" && enfocarPersonalizacion.current) {
      enfocarPersonalizacion.current = false;
      formulario.current?.querySelector(".formulario-pedido__campos input, .formulario-pedido__campos textarea, .formulario-pedido__campos select")?.focus();
    }
  }, [modalidad]);

  const esEstandar = modalidad === "estandar";
  const calculo = calcularLinea(item, modalidad, cantidad);

  const validar = () => {
    const nuevosErrores = {};
    if (esEstandar && item.variantes && !item.variantes.opciones.includes(variante)) {
      nuevosErrores.variante = `Elegí una opción de ${item.variantes.etiqueta.toLowerCase()}.`;
    }
    if (!esEstandar) {
      for (const campo of item.camposPersonalizacion) {
        if (campo.obligatorio && !(valores[campo.idCampo] || "").trim()) {
          nuevosErrores[campo.idCampo] = "Completá este dato para que podamos cotizarlo.";
        }
      }
    }
    return nuevosErrores;
  };

  const alEnviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      // Lleva el foco al primer dato con error.
      requestAnimationFrame(() => formulario.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const datos = {
      tipoItem: item.tipoItem,
      idItem: item.id,
      modalidad,
      cantidad,
      variante: esEstandar ? variante || null : null,
      personalizacion: esEstandar ? {} : valores,
      observaciones: esEstandar ? "" : observaciones,
    };
    if (lineaEditando) {
      actualizar(lineaEditando.idLinea, datos);
      navegar("/carrito");
      return;
    }
    agregar(datos);
    // Deja el formulario listo para otro pedido.
    setValores({});
    setObservaciones("");
    setCantidad(item.cantidadMinima);
  };

  const cambiarValor = (idCampo, valor) => {
    setValores((anteriores) => ({ ...anteriores, [idCampo]: valor }));
    if (errores[idCampo]) setErrores((anteriores) => ({ ...anteriores, [idCampo]: undefined }));
  };

  const textoBotonPersonalizado = item.tipoItem === "servicio"
    ? textos.botonSolicitarServicio
    : ambasModalidades
      ? textos.botonAgregar
      : textos.botonSolicitarMedida;

  return (
    <form ref={formulario} className="formulario-pedido" onSubmit={alEnviar} noValidate>
      {ambasModalidades && (
        <fieldset className="selector-modalidad">
          <legend className="solo-lectores">Cómo lo querés</legend>
          {[
            { valor: "estandar", texto: textos.pestanaEstandar },
            { valor: "personalizado", texto: textos.pestanaPersonalizada },
          ].map((opcion) => (
            <label key={opcion.valor} className={`selector-modalidad__opcion ${modalidad === opcion.valor ? "selector-modalidad__opcion--activa" : ""}`}>
              <input
                type="radio"
                name={`${idBase}-modalidad`}
                value={opcion.valor}
                checked={modalidad === opcion.valor}
                onChange={() => {
                  setModalidad(opcion.valor);
                  setErrores({});
                }}
              />
              {opcion.texto}
            </label>
          ))}
        </fieldset>
      )}

      <div className="formulario-pedido__panel" key={modalidad}>
        {esEstandar ? (
          <>
            <p className="formulario-pedido__precio">
              {calculo.estadoPrecio === ESTADOS_PRECIO.definido
                ? formatearPrecio(calculo.precioUnitario)
                : obtenerTextoPrecioPublicado(item)}
            </p>
            {item.variantes && (
              <div className={`campo ${errores.variante ? "campo--con-error" : ""}`}>
                <label htmlFor={`${idBase}-variante`} className="campo__etiqueta">
                  {item.variantes.etiqueta}
                </label>
                <select
                  id={`${idBase}-variante`}
                  value={variante}
                  required
                  aria-invalid={errores.variante ? true : undefined}
                  aria-describedby={errores.variante ? `${idBase}-variante-error` : undefined}
                  onChange={(evento) => {
                    setVariante(evento.target.value);
                    setErrores((anteriores) => ({ ...anteriores, variante: undefined }));
                  }}
                >
                  <option value="">Elegí una opción</option>
                  {item.variantes.opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
                {errores.variante && (
                  <p id={`${idBase}-variante-error`} className="campo__error">
                    {errores.variante}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="formulario-pedido__aviso">{textos.avisoPersonalizado}</p>
            <div className="formulario-pedido__campos">
              {item.camposPersonalizacion.map((campo) => (
                <CampoFormulario
                  key={campo.idCampo}
                  campo={campo}
                  idBase={idBase}
                  valor={valores[campo.idCampo]}
                  error={errores[campo.idCampo]}
                  alCambiar={cambiarValor}
                />
              ))}
              <div className="campo">
                <label htmlFor={`${idBase}-observaciones`} className="campo__etiqueta">
                  {textos.textoObservaciones}
                  <span className="campo__opcional"> (opcional)</span>
                </label>
                <textarea
                  id={`${idBase}-observaciones`}
                  rows={2}
                  maxLength={2000}
                  placeholder={textos.ejemploObservaciones}
                  value={observaciones}
                  onChange={(evento) => setObservaciones(evento.target.value)}
                />
              </div>
            </div>
            {item.aceptaArchivosReferencia && <p className="formulario-pedido__archivos">{avisoArchivosReferencia}</p>}
          </>
        )}

        <div className="formulario-pedido__cantidad">
          <span className="campo__etiqueta" id={`${idBase}-etiqueta-cantidad`}>
            {textos.textoCantidad}
          </span>
          <SelectorCantidad
            id={`${idBase}-cantidad`}
            valor={cantidad}
            minimo={item.cantidadMinima}
            maximo={item.cantidadMaxima}
            etiqueta={textos.textoCantidad}
            alCambiar={setCantidad}
          />
          {calculo.estadoPrecio === ESTADOS_PRECIO.definido && cantidad > 1 && (
            <span className="formulario-pedido__subtotal">Subtotal {formatearPrecio(calculo.subtotal)}</span>
          )}
          {!esEstandar && <span className="formulario-pedido__subtotal">{configuracionPedidos.textoACotizar}</span>}
        </div>

        <div className="formulario-pedido__botones">
          <button type="submit" className="boton boton--principal boton--ancho">
            {lineaEditando ? textos.botonGuardarCambios : esEstandar ? textos.botonAgregar : textoBotonPersonalizado}
          </button>
          {esEstandar && item.permitePersonalizacion && !lineaEditando && (
            <button
              type="button"
              className="boton boton--secundario boton--ancho"
              onClick={() => {
                enfocarPersonalizacion.current = true;
                setModalidad("personalizado");
                setErrores({});
              }}
            >
              {textos.botonPersonalizar}
            </button>
          )}
          {lineaEditando && (
            <button type="button" className="boton boton--secundario boton--ancho" onClick={() => navegar("/carrito")}>
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
