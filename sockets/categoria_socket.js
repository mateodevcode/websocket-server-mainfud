import mongoose from "mongoose";
import Categoria from "../models/categoria.js";
const { ObjectId } = mongoose.Types;

export const categoria_socket = (io) => {
  // Evento cuando un cliente se conecta
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Enviar todos los usuarios al cliente que se conecta
    socket.on("client:getcategorias", async () => {
      const categorias = await Categoria.find();
      socket.emit("server:categorias", categorias); // Solo a ese cliente
    });

    socket.on("client:reordenar_categorias", async (categorias) => {
      try {
        // const dbClient = await clientPromise;
        // const db = dbClient.db(); // o db('nombre') si lo necesitas
        const collection = mongoose.connection.collection("categorias");

        // Construir las operaciones de bulkWrite
        const operations = categorias.map((cat) => ({
          updateOne: {
            filter: { _id: new ObjectId(cat._id) },
            update: { $set: { position: cat.position } }, // o cat.position si ya viene
          },
        }));

        // Ejecutar el bulkWrite
        await collection.bulkWrite(operations);

        const updatedCategorias = await Categoria.find();

        // Emitir a todos los clientes conectados que se reordenó
        io.emit("server:reordenar_categorias", updatedCategorias);

        console.log("Categorías reordenadas correctamente.");
      } catch (error) {
        console.error("Error reordenando categorías:", error);
        socket.emit("server:error", "Error al reordenar categorías");
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};
