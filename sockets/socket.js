import { categoria_socket } from "./categoria_socket.js";
import { orden_socket } from "./orden_socket.js";
import { producto_socket } from "./producto_socket.js";
import { usuario_socket } from "./usuario_socket.js";

export const Socket = (io) => {
  // Productos
  producto_socket(io);
  // Categorías
  categoria_socket(io);
  // Usuarios
  usuario_socket(io);
  // Órdenes
  orden_socket(io);
};
