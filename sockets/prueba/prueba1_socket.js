// import Nota from "../models/nota.js";

// export const nota_socket = (io) => {
//   // Evento cuando un cliente se conecta
//   io.on("connection", (socket) => {
//     console.log("Cliente conectado:", socket.id);

//     // Enviar notas cuando un cliente lo solicita
//     socket.on("client:getnotas", async () => {
//       const notas = await Nota.find();
//       socket.emit("server:notas", notas); // Solo a ese cliente
//     });

//     // Crear nueva nota
//     socket.on("client:nuevanota", async (data) => {
//       const newNote = new Nota(data);
//       await newNote.save();
//       const notas = await Nota.find(); // Obtener todas las notas actualizadas
//       io.emit("server:notas", notas); // Emitir a todos
//     });

//     // Eliminar nota
//     socket.on("client:eliminarnota", async (id) => {
//       await Nota.findByIdAndDelete(id);
//       const notas = await Nota.find(); // Obtener todas las notas actualizadas
//       io.emit("server:notas", notas); // Emitir a todos
//     });

//     socket.on("disconnect", () => {
//       console.log("Cliente desconectado:", socket.id);
//     });
//   });
// };
