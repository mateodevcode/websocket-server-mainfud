import { orden_socket } from "./orden_socket.js";
import { usuario_socket } from "./usuario_socket.js";

export const Socket = (io) => {
  // Usuarios
  usuario_socket(io);
  // Órdenes
  orden_socket(io);
};
