/* IMPORTACIONES */
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'


dotenv.config()                     // Lee las Variables de Entorno (.env en el Raiz)
connectDB()


const app = express()               // Inicializamos el servidor
app.use(cors(corsConfig))

app.use(morgan('dev'))              // Logging

app.use(express.json())            // Habilita la lectura de formato JSON desde los Body de los POST


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)


export default app                  // Funcion que se exporta por Defecto