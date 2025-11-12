import React, { useState, useEffect } from "react";
import "./App.css";
import Envio from "./components/Envio";
import Soporte from "./components/Soporte";

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [nombreLogin, setNombreLogin] = useState("");
  const [correoLogin, setCorreoLogin] = useState("");
  const [contrasenaLogin, setContrasenaLogin] = useState("");
  const [telefonoLogin, setTelefonoLogin] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setCargando(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  }, []);

  const cambiarPagina = (paginaNueva) => {
    setPagina(paginaNueva);
    setMenuAbierto(false);
    setMostrarLogin(false);
    setMostrarHorario(false);
    if (paginaNueva === "cuenta") setMostrarLogin(true);
    if (paginaNueva === "horario") setMostrarHorario(true);
  };

  const abrirLogin = () => setMostrarLogin(true);
  const cerrarLogin = () => setMostrarLogin(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const enviarLogin = () => {
    if (!nombreLogin || !correoLogin || !contrasenaLogin) {
      setMensajeLogin("Completa todos los campos");
      return;
    }

    fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreLogin,
        correo: correoLogin,
        contrasena: contrasenaLogin,
        telefono: telefonoLogin
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setMensajeLogin("¡Usuario guardado con éxito!");
          setNombreLogin("");
          setCorreoLogin("");
          setContrasenaLogin("");
          setTelefonoLogin("");
          setMostrarLogin(false);
        }
      })
      .catch(err => console.error(err));
  };

  if (cargando)
    return (
      <div className="pantalla-carga">
        <div className="logo-wrap">
          <img
            className="logo-animado"
            src="https://i.pinimg.com/736x/0f/a0/3f/0fa03fce168867af0e957cb5a97b5305.jpg"
            alt="logo"
          />
        </div>
      </div>
    );

  if (pagina === "envio") return <Envio volver={() => setPagina("inicio")} />;
  if (pagina === "soporte") return <Soporte volver={() => setPagina("inicio")} />;

  return (
    <>
      <header className="main-header">
        <div className="menu container">
          <img
            className="logo-1"
            src="https://i.pinimg.com/736x/0f/a0/3f/0fa03fce168867af0e957cb5a97b5305.jpg"
            alt="logo"
          />
          <button className="hamburguesa" onClick={toggleMenu}>☰</button>
          <nav className={`navbar ${menuAbierto ? "activo" : ""}`}>
            <ul>
              <li><button className="link-btn" onClick={() => cambiarPagina("cuenta")}>Cuenta</button></li>
              <li><button className="link-btn" onClick={() => cambiarPagina("envio")}>Envío</button></li>
              <li><button className="link-btn" onClick={() => cambiarPagina("soporte")}>Soporte</button></li>
              <li><button className="link-btn" onClick={() => cambiarPagina("horario")}>Horario</button></li>
            </ul>
          </nav>
        </div>
        <div className="header-content">
          <h1>Moda Urbana</h1>
          <p>Estilo moderno, materiales de calidad y diseños inspirados en la energía de la ciudad.</p>
          <div>
            <button className="btn-1" onClick={abrirLogin}>Más Productos</button>
            <button className="btn-1" onClick={abrirLogin}>Pensado Para Vos</button>
          </div>
        </div>
      </header>

      <main className="products">
        <h2>Variedad en ropa</h2>
        <div className="product-grid">
          {productos.map((prod, i) => (
            <div key={i} className="product">
              <div className="product-img">
                <img src={prod.imagen} alt={prod.nombre} />
              </div>
              <div className="product-txt">
                <h4>{prod.nombre}</h4>
                <p>{prod.descripcion}</p>
                <span className="price">${prod.precio}</span>
                <button className="btn-comprar" onClick={abrirLogin}>Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <section className="info">
        <div className="info-img">
          <img
            src="https://i.pinimg.com/736x/0f/a0/3f/0fa03fce168867af0e957cb5a97b5305.jpg"
            alt="Información"
          />
        </div>
        <div className="info-txt">
          <h2>Información</h2>
          <p>En 222Urban combinamos diseño moderno y materiales de calidad. Cada prenda refleja la energía de la ciudad. Al conectar tu cuenta, nos basamos en lo que ves y elegís para ofrecerte una experiencia personalizada.</p>
          <button className="btn-2" onClick={abrirLogin}>Más información</button>
        </div>
      </section>

      {mostrarLogin && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Cuenta / Iniciar Sesión</h3>
            <input type="text" placeholder="Nombre" value={nombreLogin} onChange={(e) => setNombreLogin(e.target.value)} />
            <input type="email" placeholder="Correo electrónico" value={correoLogin} onChange={(e) => setCorreoLogin(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={contrasenaLogin} onChange={(e) => setContrasenaLogin(e.target.value)} />
            <input type="text" placeholder="Teléfono (opcional)" value={telefonoLogin} onChange={(e) => setTelefonoLogin(e.target.value)} />
            <button className="btn-login" onClick={enviarLogin}>Entrar / Registrarse</button>
            {mensajeLogin && <p>{mensajeLogin}</p>}
            <button className="cerrar" onClick={cerrarLogin}>Cerrar</button>
          </div>
        </div>
      )}

      {mostrarHorario && (
        <div className="modal">
          <div className="modal-content horario">
            <h3>Horario de Atención</h3>
            <table>
              <tbody>
                <tr><td>Lunes - Viernes</td><td>09:00 - 20:00</td></tr>
                <tr><td>Sábado</td><td>10:00 - 18:00</td></tr>
                <tr><td>Domingo</td><td>11:00 - 16:00</td></tr>
              </tbody>
            </table>
            <button className="cerrar" onClick={() => setMostrarHorario(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
