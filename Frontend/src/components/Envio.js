import React, { useState } from "react";
import "./../styles/envio.css";

function Envio({ volver }) {
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [mensajeEnvio, setMensajeEnvio] = useState("");

  const zonas = [
    "Barrio Centro",
    "Zona Norte",
    "Zona Sur",
    "La Plata",
    "Villa Luzuriaga",
    "Palermo",
    "Caballito"
  ];

  const guardarDireccion = () => {
    const id_usuario = 1;
    if (!zonaSeleccionada) return;
    fetch("http://localhost:3001/direcciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario, zona: zonaSeleccionada })
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) setMensajeEnvio("Dirección guardada ✅");
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <header>
        <button onClick={volver} className="btn-back">⬅ Volver</button>
        <h1>Zonas de Envío</h1>
      </header>
      <section className="seccion-envio">
        <div className="overlay"></div>
        <div className="contenido-envio">
          <p>¡Llegamos rápido a tu zona!</p>
          <ul>
            {zonas.map((zona, index) => (
              <li
                key={index}
                onClick={() => setZonaSeleccionada(zona)}
                className={zonaSeleccionada === zona ? "seleccionada" : ""}
              >
                {zona}
              </li>
            ))}
          </ul>
          <button className="btn-pedir" onClick={guardarDireccion}>
            Hacer pedido ahora
          </button>
          {mensajeEnvio && <p className="mensaje-envio">{mensajeEnvio}</p>}
        </div>
      </section>
    </div>
  );
}

export default Envio;
