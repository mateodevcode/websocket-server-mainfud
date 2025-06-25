// server.mjs
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import "./config.js";
import { PORT } from "./config.js";
import { connectMongoDB } from "./db.js";
import { Socket } from "./sockets/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL, // Cambia esto por tu dominio en producción
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor de sockets funcionando!");
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

connectMongoDB(); // Conectar a MongoDB al iniciar el servidor

Socket(io);
