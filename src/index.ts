import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dogRoutes from './routes/dogRoutes';
import './config/db';

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 3000;

// Inicializar app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MongoDB é inicializada pelo import acima

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
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/api/dogs', dogRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Cães! Acesse /api-docs para a documentação.');
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
