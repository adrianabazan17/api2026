import express from 'express'
import cors from 'cors';


import clientesRoutes from './routes/clientes.routes.js'
import productosRoutes from './routes/productos.routes.js'
import authRoutes from './routes/auth.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}

// Hacer pública la carpeta uploads (antes de las rutas)
const uploadsPath = path.resolve(__dirname, '../uploads');
console.log('📂 Carpeta uploads expuesta en ojo:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

app.use('/api',productosRoutes)

app.use(cors(corsOptions));
app.use(express.json());

//SERVIR IMÁGENES
app.use('/uploads', express.static(path.resolve('src/uploads')));

// RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.json({
    status: "API funcionando correctamente",
    endpoints: [
      "/api/clientes",
      "/api/productos",
      "/api/auth"
    ]
  });
});

// rutas
app.use('/api', clientesRoutes)
app.use('/api', productosRoutes)
app.use('/api', authRoutes)

app.use((req,res,next)=>{
  res.status(400).json({
    message:'Endpoint not found'
  })
})

export default app;