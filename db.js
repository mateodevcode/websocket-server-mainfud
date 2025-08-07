import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@mainfud.8n1sayl.mongodb.net/?retryWrites=true&w=majority&appName=mainfud`
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
};
