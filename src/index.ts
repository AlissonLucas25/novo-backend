// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dogRoutes from './routes/dogRoutes.js'; // ⚠️ garantir extensão .js se estiver compilado
import './config/db.js';

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 3000; // ✅ Render define automaticamente a porta

// Inicializar app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // ou defina seu domínio do frontend: https://og-api-frontend.onrender.com
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cães',
      version: '1.0.0',
      description: 'API para gerenciamento de informações sobre cães',
      contact: {
        name: 'Suporte API',
        email: 'suporte@dogapi.com',
      },
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`, // ✅ Corrigido para Render
        description: 'Servidor de Produção ou Desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js'], // ✅ caminho ajustado
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas principais
app.use('/api/dogs', dogRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('🐶 Bem-vindo à API de Cães! Acesse /api-docs para ver a documentação.');
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📘 Swagger disponível em: ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}/api-docs`);
});
