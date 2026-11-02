/* =====================================================================
   Revisión final del pedido y envío por WhatsApp.
   La lista de esta pantalla y el mensaje salen del MISMO resumen
   (useCarrito().resumen), así lo que se ve es exactamente lo que se envía.
   ===================================================================== */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import configuracionPedidos from "../contenido/configuracionPedidos.js";
import { useCarrito } from "../estado/CarritoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import { generarMensajePedido, crearEnlaceWhatsapp, esEnlaceDemasiadoLargo } from "../logica/mensajeWhatsapp.js";
import LineaCarrito from "../componentes/carrito/LineaCarrito.jsx";
import ResumenTotales from "../componentes/carrito/ResumenTotales.jsx";
import CarritoVacio from "../componentes/carrito/CarritoVacio.jsx";
import Icono from "../componentes/comunes/Icono.jsx";

const textos = textosSitio.finalizar;

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Alternativa para navegadores que no permiten el portapapeles moderno.
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let copiado = false;
    try {
      copiado = document.execCommand("copy");
    } catch {
      copiado = false;
    }
    document.body.removeChild(area);
    return copiado;
  }
}

export default function FinalizarPedido() {
  const { resumen, vaciar } = useCarrito();
  const [datosCliente, setDatosCliente] = useState({ nombre: "", comentarios: "" });
  const [estadoEnvio, setEstadoEnvio] = useState(""); // "" | "abierto"
  const [copiado, setCopiado] = useState(false);
  useMetadatos({ titulo: textos.tituloPagina });

  const camposVisibles = configuracionPedidos.camposOpcionalesPedido.filter((campo) => campo.mostrar);
  const mensaje = useMemo(() => generarMensajePedido(resumen, datosCliente), [resumen, datosCliente]);
  const enlace = crearEnlaceWhatsapp(mensaje);
  const enlaceSinTexto = crearEnlaceWhatsapp();
  const esLargo = enlace && esEnlaceDemasiadoLargo(enlace);

  if (resumen.lineas.length === 0) {
    return (
      <section className="contenedor pagina-carrito pagina-carrito--vacia">
        <h1 className="solo-lectores">{textos.titulo}</h1>
        {estadoEnvio ? (
          <div className="carrito-vacio">
            <h2 className="carrito-vacio__titulo">Vaciaste tu pedido.</h2>
            <p>Si enviaste el mensaje desde WhatsApp, la respuesta te llega por ese chat.</p>
            <Link to="/catalogo" className="boton boton--principal">{textosSitio.carrito.botonSeguir}</Link>
          </div>
        ) : (
          <CarritoVacio />
        )}
      </section>
    );
  }

  const alCopiar = async () => {
    const resultado = await copiarTexto(mensaje);
    setCopiado(resultado);
    if (resultado) setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <section className="contenedor pagina-finalizar" aria-labelledby="titulo-finalizar">
      <Link to="/carrito" className="enlace-volver">
        <Icono nombre="volver" tamano={18} /> {textos.volverCarrito}
      </Link>
      <h1 id="titulo-finalizar" className="cabecera-pagina__titulo">{textos.titulo}</h1>
      <p className="cabecera-pagina__bajada">{textos.bajada}</p>

      <div className="pagina-carrito__grilla">
        <div>
          <ul className="pagina-carrito__lista">
            {resumen.lineas.map((linea) => (
              <LineaCarrito key={linea.idLinea} linea={linea} variante="revision" />
            ))}
          </ul>

          {camposVisibles.length > 0 && (
            <fieldset className="datos-cliente">
              <legend>{textos.tituloDatos}</legend>
              {camposVisibles.map((campo) => (
                <div className="campo" key={campo.idCampo}>
                  <label htmlFor={`cliente-${campo.idCampo}`} className="campo__etiqueta">
                    {campo.etiqueta}
                  </label>
                  {campo.tipo === "textoLargo" ? (
                    <textarea
                      id={`cliente-${campo.idCampo}`}
                      rows={3}
                      maxLength={1000}
                      placeholder={campo.ejemplo}
                      value={datosCliente[campo.idCampo] || ""}
                      onChange={(evento) => setDatosCliente((anteriores) => ({ ...anteriores, [campo.idCampo]: evento.target.value }))}
                    />
                  ) : (
                    <input
                      id={`cliente-${campo.idCampo}`}
                      type="text"
                      maxLength={120}
                      autoComplete={campo.idCampo === "nombre" ? "given-name" : "off"}
                      placeholder={campo.ejemplo}
                      value={datosCliente[campo.idCampo] || ""}
                      onChange={(evento) => setDatosCliente((anteriores) => ({ ...anteriores, [campo.idCampo]: evento.target.value }))}
                    />
                  )}
                </div>
              ))}
            </fieldset>
          )}
        </div>

        <aside className="caja-resumen caja-resumen--fija" aria-label="Enviar pedido">
          <ResumenTotales totales={resumen.totales} />

          {!resumen.sePuedeEnviar && resumen.lineas.length > 0 && (
            <p className="caja-resumen__alerta" role="alert">
              {textosSitio.carrito.noDisponible} <Link to="/carrito">{textos.volverCarrito}</Link>
            </p>
          )}

          {resumen.pideArchivos && <p className="caja-resumen__nota">{configuracionPedidos.recordatorioArchivos}</p>}

          <div className="caja-resumen__botones">
            {enlace && resumen.sePuedeEnviar ? (
              <a
                href={enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="boton boton--whatsapp boton--ancho"
                onClick={() => setEstadoEnvio("abierto")}
              >
                <Icono nombre="whatsapp" tamano={20} /> {textos.botonEnviar}
              </a>
            ) : (
              <button type="button" className="boton boton--whatsapp boton--ancho" disabled>
                <Icono nombre="whatsapp" tamano={20} /> {textos.botonEnviar}
              </button>
            )}
            {resumen.sePuedeEnviar && (
              <button type="button" className="boton boton--secundario boton--ancho" onClick={alCopiar}>
                <Icono nombre={copiado ? "check" : "copiar"} tamano={18} /> {copiado ? textos.textoCopiado : textos.botonCopiar}
              </button>
            )}
            {esLargo && enlaceSinTexto && resumen.sePuedeEnviar && (
              <a href={enlaceSinTexto} target="_blank" rel="noopener noreferrer" className="boton-texto">
                {textos.botonAbrirChat}
              </a>
            )}
          </div>

          <div aria-live="polite">
            {!enlace && <p className="caja-resumen__nota">{textos.avisoSinNumero}</p>}
            {esLargo && <p className="caja-resumen__nota">{textos.avisoLargo}</p>}
            {estadoEnvio === "abierto" && (
              <div className="aviso-envio">
                <p>{textos.avisoEnvio}</p>
                <button type="button" className="boton-texto" onClick={vaciar}>
                  Ya lo envié: vaciar el pedido
                </button>
              </div>
            )}
          </div>

          {resumen.sePuedeEnviar && (
            <details className="vista-mensaje">
              <summary>{textos.verMensaje}</summary>
              <pre>{mensaje}</pre>
            </details>
          )}
        </aside>
      </div>
    </section>
  );
}
