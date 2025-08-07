import mongoose from "mongoose";
const { models, Schema, model } = mongoose;

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
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
    nombreFormateado: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Categoria =
  models.Categoria || mongoose.model("Categoria", categoriaSchema);
export default Categoria;
