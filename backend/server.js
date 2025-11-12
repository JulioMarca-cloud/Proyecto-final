import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/usuarios", (req, res) => {
  const { nombre, correo, contrasena, telefono } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre, correo, contrasena, telefono) VALUES (?, ?, ?, ?)",
    [nombre, correo, contrasena, telefono],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ ok: true, id: result.insertId, nombre, correo });
    }
  );
});

app.post("/soporte", (req, res) => {
  const { nombre_usuario, correo, mensaje } = req.body;
  db.query(
    "INSERT INTO soporte (nombre_usuario, correo, mensaje) VALUES (?, ?, ?)",
    [nombre_usuario, correo, mensaje],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ ok: true, id: result.insertId });
    }
  );
});

app.post("/direcciones", (req, res) => {
  const { id_usuario, zona } = req.body;
  db.query(
    "INSERT INTO direcciones (id_usuario, zona) VALUES (?, ?)",
    [id_usuario, zona],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ ok: true, id: result.insertId });
    }
  );
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
