import Producto from "../models/producto.js";

export const producto_socket = (io) => {
  // Evento cuando un cliente se conecta
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Enviar todos los usuarios al cliente que se conecta
    socket.on("client:getproductos", async () => {
      const productos = await Producto.find();
      socket.emit("server:productos", productos); // Solo a ese cliente
    });

    socket.on("client:actualizar_producto_disponibilidad", async (id, data) => {
      const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!producto) {
        return socket.emit("server:error", "Producto no encontrado");
      }
      // Emitir a todos los clientes conectados
      const productos = await Producto.find(); // Obtener todos los productos actualizados
      io.emit("server:productos", productos); // Emitir a todos los clientes conectados
      socket.emit("server:producto_actualizado", producto); // Enviar el producto actualizado al cliente que lo modificó
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};
