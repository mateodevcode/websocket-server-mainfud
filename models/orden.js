import mongoose from "mongoose";
const { models, Schema, model } = mongoose;

const itemSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

const pedidoSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  pedido: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
  },
});

const ordenSchema = new Schema(
  {
    pedido: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      default: "",
    },
    direccion: {
      type: String,
      default: "",
    },
    mesa: {
      type: String,
      default: "",
    },
    total: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      default: "pendiente",
      enum: ["pendiente", "enviado", "entregado", "cancelado"],
    },
    listaPedidos: [pedidoSchema],
    para_llevar: {
      type: Boolean,
      default: false,
    },
    id_usuario: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Orden = models.Orden || model("Orden", ordenSchema);
export default Orden;
