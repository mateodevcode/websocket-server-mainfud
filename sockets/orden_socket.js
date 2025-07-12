import Orden from "../models/orden.js";

export const orden_socket = (io) => {
  // Evento cuando se conecta un cliente
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("client:getordenes", async () => {
      const ordenes = await Orden.find();
      socket.emit("server:ordenes", ordenes); // Enviar todas las órdenes al cliente que se conecta
    });

    // Crear una nueva orden
    socket.on("client:crear_orden", async (data) => {
      const newOrden = new Orden(data);
      await newOrden.save(); // Guardar la orden en la base de datos
      const ordenes = await Orden.find(); // Obtener todas las órdenes
      socket.emit("server:orden_creada", newOrden); // Enviar la nueva orden al cliente que la creó
      io.emit("server:ordenes", ordenes); // Emitir a todos los clientes conectados
    });

    // Eliminar una orden
    socket.on("client:eliminar_orden", async (id) => {
      await Orden.findByIdAndDelete(id);
      const ordenes = await Orden.find(); // Obtener todas las órdenes actualizadas
      io.emit("server:ordenes", ordenes); // Emitir a todos los clientes conectados
    });

    // Actualizar una orden
    socket.on("client:actualizar_orden", async (id, data) => {
      const orden = await Orden.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!orden) {
        return socket.emit("server:error", "Orden no encontrada");
      }
      // const ordenes = await Orden.find(); // Obtener todas las órdenes actualizadas
      io.emit("server:actualizar_orden", orden); // Emitir a todos los clientes conectados
      const ordenes = await Orden.find(); // Obtener todas las órdenes actualizadas
      io.emit("server:ordenes", ordenes); // Emitir a todos los clientes conectados
    });

    socket.on(
      "client:eliminar_producto_orden",
      async (id_orden, id_producto) => {
        const orden = await Orden.findById(id_orden);
        if (!orden) {
          return socket.emit("server:error", "Orden no encontrada");
        }

        // Eliminar el item de cada pedido
        orden.listaPedidos = orden.listaPedidos
          .map((pedido) => {
            // Filtrar los items quitando el que coincide con el id
            pedido.items = pedido.items.filter(
              (item) => item._id.toString() !== id_producto
            );

            return pedido;
          })
          // Eliminar el pedido si ya no tiene items
          .filter((pedido) => pedido.items.length > 0);

        // Recalcular totales
        let totalOrden = 0;
        orden.listaPedidos = orden.listaPedidos.map((pedido) => {
          const totalPedido = pedido.items.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0
          );
          pedido.total = totalPedido;
          totalOrden += totalPedido;
          return pedido;
        });

        orden.total = totalOrden;

        // Guardar cambios
        await orden.save();

        const ordenes = await Orden.find(); // Obtener todas las órdenes actualizadas
        io.emit("server:ordenes", ordenes);
      }
    );

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};
