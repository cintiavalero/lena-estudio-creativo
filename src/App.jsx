/* =====================================================================
   RUTAS DEL SITIO (qué página se muestra en cada dirección)
   ⚙️  ARCHIVO TÉCNICO. Solo hace falta tocarlo para crear páginas nuevas.
   ===================================================================== */

import { Route, Routes } from "react-router-dom";
import Plantilla from "./componentes/estructura/Plantilla.jsx";
import Inicio from "./paginas/Inicio.jsx";
import Catalogo from "./paginas/Catalogo.jsx";
import DetalleProducto from "./paginas/DetalleProducto.jsx";
import Servicios from "./paginas/Servicios.jsx";
import DetalleServicio from "./paginas/DetalleServicio.jsx";
import OtrosServicios from "./paginas/OtrosServicios.jsx";
import EmpresaAsociada from "./paginas/EmpresaAsociada.jsx";
import Contacto from "./paginas/Contacto.jsx";
import Carrito from "./paginas/Carrito.jsx";
import FinalizarPedido from "./paginas/FinalizarPedido.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Plantilla />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="catalogo/:idProducto" element={<DetalleProducto />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="servicios/:idServicio" element={<DetalleServicio />} />
        <Route path="otros-servicios" element={<OtrosServicios />} />
        <Route path="otros-servicios/:idEmpresa" element={<EmpresaAsociada />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="finalizar-pedido" element={<FinalizarPedido />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
