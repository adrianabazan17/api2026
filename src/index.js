import app from './app.js'
import {PORT} from './config.js'
import dotenv from 'dotenv'
dotenv.config()
app.listen(PORT); //3000
console.log('Servidor está ejecutando en el puerto',PORT)