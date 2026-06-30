import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';
import authRoutes from './routes/auth.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

// CORS
app.use(cors(corsOptions));

// JSON
app.use(express.json());

// SERVIR IMÁGENES
const uploadsPath = path.resolve(__dirname, './uploads');

console.log('📂 Carpeta uploads:', uploadsPath);

app.use(
  '/uploads',
  express.static(uploadsPath)
);

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({
    status: 'API funcionando correctamente',
    endpoints: [
      '/api/clientes',
      '/api/productos',
      '/api/login'
    ]
  });
});

// RUTAS API
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);
app.use('/api', authRoutes);
app.use('/api', pedidosRoutes);

// ENDPOINT NO ENCONTRADO
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

export default app;