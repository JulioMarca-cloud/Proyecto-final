import React, { useState } from "react";
import "../styles/Soporte.css";

function Soporte({ volver }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pedido, setPedido] = useState("");
  const [consulta, setConsulta] = useState("");
  const [mensajeEnvio, setMensajeEnvio] = useState("");

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/soporte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_usuario: nombre, correo: email, mensaje: consulta })
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) setMensajeEnvio("¡Gracias! Tu consulta ha sido enviada 📦");
      setNombre(""); setEmail(""); setPedido(""); setConsulta("");
    })
    .catch(err => console.error(err));
  };

  return (
    <>
      <header className="soporte-header">
        <button className="volver-btn" onClick={volver}>← Atrás</button>
        <div className="hero">
          <div className="hero-overlay">
            <h1>Soporte al Cliente</h1>
            <p>Estamos aquí para ayudarte con tus pedidos y consultas</p>
          </div>
        </div>
      </header>
      <main className="soporte-container">
        <div className="contacto">
          <h2>Contáctanos 📬</h2>
          <p>Rellena el formulario y uno de nuestros agentes responderá pronto</p>
          <form onSubmit={enviarFormulario}>
            <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Número de pedido (opcional)" value={pedido} onChange={(e) => setPedido(e.target.value)} />
            <textarea placeholder="Escribe tu consulta..." value={consulta} onChange={(e) => setConsulta(e.target.value)} required />
            <button type="submit">Enviar consulta</button>
          </form>
          {mensajeEnvio && <p className="mensaje-envio">{mensajeEnvio}</p>}
        </div>
        <div className="info-soporte">
          <h2>Otras formas de contactarnos 📱</h2>
          <ul>
            <li>📞 Teléfono: 1123-761762</li>
            <li>✉️ Correo: soporte222urban@gmail.com</li>
            <li>💬 Chat en vivo: 9am - 9pm</li>
            <li>📱 Instagram: 222UrbanOficial</li>
          </ul>
        </div>
      </main>
      <section className="info-222urban">
        <div className="info-img">
          <img src="https://i.pinimg.com/736x/0f/a0/3f/0fa03fce168867af0e957cb5a97b5305.jpg" alt="Información" />
        </div>
        <div className="info-txt">
          <h2>Sobre 222Urban</h2>
          <p>En 222Urban combinamos diseño moderno y materiales de calidad. Cada prenda refleja la energía de la ciudad y sigue las últimas tendencias de moda urbana.</p>
        </div>
      </section>
      <footer>
        <p>© 2025 222Urban. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default Soporte;
