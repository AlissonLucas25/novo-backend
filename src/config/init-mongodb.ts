import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI não encontrado no .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    console.log("⚠️ A API funcionará em modo simulado.");
  }
};
