import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import configuracionSitio from "../../contenido/configuracionSitio.js";
import { menuPrincipal } from "../../contenido/navegacion.js";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import Icono from "../comunes/Icono.jsx";

export default function Encabezado() {
  const { cantidadTotalUnidades, abrirPanel, avisoAgregado } = useCarrito();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conSombra, setConSombra] = useState(false);
  const [pulso, setPulso] = useState(false);
  const ubicacion = useLocation();
  const botonMenu = useRef(null);
  const { logo } = configuracionSitio;

  // Cierra el menú del celular al cambiar de página.
  useEffect(() => setMenuAbierto(false), [ubicacion.pathname]);

  // Bloquea el scroll de fondo y permite cerrar con Escape.
  useEffect(() => {
    if (!menuAbierto) return undefined;
    document.body.classList.add("sin-scroll");
    const alPresionarTecla = (evento) => {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
        botonMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.body.classList.remove("sin-scroll");
      window.removeEventListener("keydown", alPresionarTecla);
    };
  }, [menuAbierto]);

  useEffect(() => {
    const alHacerScroll = () => setConSombra(window.scrollY > 8);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  // Pequeño "salto" del ícono del carrito cuando se agrega algo.
  useEffect(() => {
    if (!avisoAgregado) return undefined;
    setPulso(true);
    const temporizador = setTimeout(() => setPulso(false), 600);
    return () => clearTimeout(temporizador);
  }, [avisoAgregado]);

  return (
    <header className={`encabezado ${conSombra ? "encabezado--con-sombra" : ""}`}>
      <div className="encabezado__contenido contenedor">
        <Link to="/" className="encabezado__logo" aria-label={`${configuracionSitio.nombreEmprendimiento}, ir al inicio`}>
          <img src={logo.archivo} alt={logo.textoAlternativo} width={logo.ancho} height={logo.alto} />
        </Link>

        <nav className={`navegacion ${menuAbierto ? "navegacion--abierta" : ""}`} aria-label="Principal" id="menu-principal">
          <ul>
            {menuPrincipal.map((enlace) => (
              <li key={enlace.ruta}>
                <NavLink to={enlace.ruta} className={({ isActive }) => `navegacion__enlace ${isActive ? "navegacion__enlace--activo" : ""}`}>
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="encabezado__acciones">
          <button
            type="button"
            className={`boton-carrito ${pulso ? "boton-carrito--pulso" : ""}`}
            onClick={abrirPanel}
            aria-label={`Abrir tu pedido, ${cantidadTotalUnidades} ${cantidadTotalUnidades === 1 ? "unidad" : "unidades"}`}
          >
            <Icono nombre="carrito" tamano={22} />
            {cantidadTotalUnidades > 0 && (
              <span className="boton-carrito__contador" key={cantidadTotalUnidades}>
                {cantidadTotalUnidades > 99 ? "99+" : cantidadTotalUnidades}
              </span>
            )}
          </button>
          <button
            ref={botonMenu}
            type="button"
            className="boton-menu"
            aria-expanded={menuAbierto}
            aria-controls="menu-principal"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <Icono nombre={menuAbierto ? "cerrar" : "menu"} tamano={24} />
            <span className="solo-lectores">{menuAbierto ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
