// import Cliente from "../models/cliente.js";

// export const cliente_socket = (io) => {
//   // Evento cuando un cliente se conecta
//   io.on("connection", (socket) => {
//     console.log("Cliente conectado:", socket.id);

//     // Enviar todos los clientes al cliente que se conecta
//     socket.on("client:getclientes", async () => {
//       const clientes = await Cliente.find();
//       socket.emit("server:clientes", clientes); // Solo a ese cliente
//     });

//     // Crear un nuevo cliente
//     socket.on("client:crear_cliente", async (data) => {
//       const newCliente = new Cliente(data);
//       await newCliente.save(); // Guardar el cliente en la base de datos
//       const clientes = await Cliente.find(); // Obtener todos los clientes actualizados
//       io.emit("server:clientes", clientes); // Emitir a todos
//     });

//     // Eliminar un cliente
//     socket.on("client:eliminar_cliente", async (id) => {
//       await Cliente.findByIdAndDelete(id);
//       const clientes = await Cliente.find(); // Obtener todos los clientes actualizados
//       io.emit("server:clientes", clientes); // Emitir a todos
//     });

//     // Actualizar un cliente
//     socket.on("client:actualizar_cliente", async (id, data) => {
//       const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });
//       if (!cliente) {
//         return socket.emit("server:error", "Cliente no encontrado");
//       } // Actualizar el cliente en la base de datos
//       const clientes = await Cliente.find(); // Obtener todos los clientes actualizados
//       io.emit("server:clientes", clientes); // Emitir a todos
//     });

//     socket.on("disconnect", () => {
//       console.log("Cliente desconectado:", socket.id);
//     });
//   });
// };
