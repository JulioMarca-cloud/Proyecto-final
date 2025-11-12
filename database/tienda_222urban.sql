CREATE DATABASE IF NOT EXISTS tienda_222urban;
USE tienda_222urban;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  contrasena VARCHAR(255),
  telefono VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  descripcion TEXT,
  precio DECIMAL(10,2),
  imagen VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS direcciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  zona VARCHAR(100),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS soporte (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(100),
  correo VARCHAR(100),
  mensaje TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  id_direccion INT,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_direccion) REFERENCES direcciones(id)
);

CREATE TABLE IF NOT EXISTS pedido_productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT,
  id_producto INT,
  cantidad INT,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

CREATE TABLE IF NOT EXISTS zonas_envio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);

INSERT INTO zonas_envio (nombre) VALUES
('Barrio Centro'),
('Zona Norte'),
('Zona Sur'),
('La Plata'),
('Villa Luzuriaga'),
('Palermo'),
('Caballito');

INSERT INTO productos (titulo, descripcion, precio, imagen) VALUES
('Campera Oversize Negra', 'Campera estilo urbano oversize color negro con cierre metálico.', 29500, 'https://i.pinimg.com/736x/25/55/45/2555453d23b8b4d98d5e2b5a7a3b12f8.jpg'),
('Remera Blanca 222', 'Remera blanca con estampado minimalista 222 Urban.', 13500, 'https://i.pinimg.com/736x/22/2b/3e/222b3e6e789d2e6a379bc0b68d64fdd9.jpg'),
('Pantalón Cargo Beige', 'Pantalón estilo cargo con múltiples bolsillos, ideal para streetwear.', 26500, 'https://i.pinimg.com/736x/0b/50/3d/0b503d6c00cf8c2623f61d2e6b7ce6b2.jpg'),
('Zapatillas Urban Vibes', 'Zapatillas urbanas blancas con suela alta y diseño moderno.', 51000, 'https://i.pinimg.com/736x/1c/7f/38/1c7f3879c20c5dc532eaa0e7ee51e621.jpg'),
('Campera Beige Street', 'Campera liviana beige con capucha, estilo casual.', 31200, 'https://i.pinimg.com/736x/88/b8/2e/88b82e2f31fcd13c49c82fd1b5bcb6b0.jpg'),
('Remera Negra Skull', 'Remera negra con diseño de calavera artística.', 15500, 'https://i.pinimg.com/736x/72/7a/73/727a73f5a4524144d2ff087d66d2b815.jpg'),
('Jogger Gris Urbano', 'Jogger gris con ajuste elástico y corte moderno.', 24500, 'https://i.pinimg.com/736x/4c/6a/f3/4c6af3b7d4043b06bcb42a511d6dc97f.jpg'),
('Campera Corta Mujer', 'Campera corta con cuello alto y cierre central.', 28500, 'https://i.pinimg.com/736x/0f/a0/3f/0fa03fce168867af0e957cb5a97b5305.jpg'),
('Remera Oversize Beige', 'Remera oversize beige, ideal para outfit urbano.', 13000, 'https://i.pinimg.com/736x/1d/2e/8f/1d2e8f7a7b6d87911edbf047c3dc18e8.jpg'),
('Buzo Blanco Minimal', 'Buzo blanco con diseño minimalista bordado.', 27900, 'https://i.pinimg.com/736x/d8/a2/66/d8a2665cb515ca1dbd7af7c73e6b2713.jpg');
