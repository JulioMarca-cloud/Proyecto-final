import React, { useState, useEffect } from "react";
import "./../styles/envio.css";

function Envio({ volver }) {
  const [zonas, setZonas] = useState([]);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [mensajeEnvio, setMensajeEnvio] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/zonas_envio")
      .then(res => res.json())
      .then(data => setZonas(data))
      .catch(err => console.error(err));
  }, []);

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
      if (data.ok) setMensajeEnvio("Dirección guardada ✅");
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
            {zonas.map((zona) => (
              <li
                key={zona.id}
                onClick={() => setZonaSeleccionada(zona.nombre)}
                className={zonaSeleccionada === zona.nombre ? "seleccionada" : ""}
              >
                {zona.nombre}
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
