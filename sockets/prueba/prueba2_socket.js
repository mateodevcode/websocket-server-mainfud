// import mongoose from "mongoose";
// import OrdenProduccion from "../models/ordenProduccion.js";

// export const orden_produccion_socket = (io) => {
//   // Evento cuando un cliente se conecta
//   io.on("connection", (socket) => {
//     console.log("Cliente conectado:", socket.id);

//     // Enviar todas las ordenes de produccion al cliente que se conecta
//     socket.on("client:getorden_produccion", async () => {
//       const ordenes_produccion = await OrdenProduccion.find();
//       socket.emit("server:orden_produccion", ordenes_produccion); // Solo a ese cliente
//     });

//     // Crear una nueva orden de produccion
//     socket.on("client:crear_orden_produccion", async (data) => {
//       const ordenId = new mongoose.Types.ObjectId();
//       const newOrden = new OrdenProduccion(data);
//       const productos = Array.from({ length: newOrden.cantidad }, (_, i) => ({
//         _id: `${ordenId}-${i + 1}`,
//         orden_id: ordenId,
//         estado: "sin iniciar",
//         tracking_id: `${newOrden.track}-${i + 1}`,
//         updatedAt: new Date(),
//       }));
//       newOrden.productos = productos; // Asignar los productos generados a la orden
//       newOrden._id = ordenId; // Asignar el ID generado a la orden
//       newOrden.linkqr = ordenId; // Generar un nuevo ID para el QR
//       await newOrden.save(); // Guardar la orden de produccion en la base de datos
//       const ordenes_produccion = await OrdenProduccion.find(); // Obtener todas las ordenes de produccion actualizadas
//       io.emit("server:orden_produccion", ordenes_produccion); // Emitir a todos
//     });

//     // Eliminar una orden de produccion
//     socket.on("client:eliminar_orden_produccion", async (id) => {
//       await OrdenProduccion.findByIdAndDelete(id);
//       const ordenes_produccion = await OrdenProduccion.find(); // Obtener todas las ordenes de produccion actualizadas
//       io.emit("server:orden_produccion", ordenes_produccion); // Emitir a todos
//     });

//     // Actualizar una orden de produccion
//     socket.on("client:actualizar_orden_produccion", async (id, data) => {
//       const orden = await OrdenProduccion.findByIdAndUpdate(id, data, {
//         new: true,
//       });
//       if (!orden) {
//         return socket.emit("server:error", "Orden de producción no encontrada");
//       }

//       // 2. Verifica si todos los productos de la orden están en "despacho"
//       const todosEnDespacho = orden.productos.every(
//         (p) => p.estado === "despacho"
//       );

//       // 3. Si todos están en "despacho", actualiza la orden a "completado"
//       if (todosEnDespacho) {
//         await OrdenProduccion.findByIdAndUpdate(id, {
//           estado: "completado",
//         });
//       } else {
//         await OrdenProduccion.findByIdAndUpdate(id, {
//           estado: "pendiente",
//         });
//       }

//       const ordenes_produccion = await OrdenProduccion.find(); // Obtener todas las ordenes de produccion actualizadas

//       io.emit("server:orden_produccion", ordenes_produccion); // Emitir a todos
//     });

//     socket.on("disconnect", () => {
//       console.log("Cliente desconectado:", socket.id);
//     });
//   });
// };
