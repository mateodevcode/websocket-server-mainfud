import mongoose from "mongoose";
const { models, Schema, model } = mongoose;

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    ingredientes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingrediente",
      },
    ],
    disponibilidad: {
      type: Boolean,
      default: true,
    },
    disponible_comer_aqui: {
      type: Boolean,
      default: true,
    },
    disponible_para_llevar: {
      type: Boolean,
      default: true,
    },
    insumos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto", // o "Insumo", si los tienes separados
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Producto = models.Producto || mongoose.model("Producto", productoSchema);
export default Producto;
