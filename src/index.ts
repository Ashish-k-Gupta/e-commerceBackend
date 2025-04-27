import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import { AppDataSource } from './config/data-source'
import authRoutes from './routes/auth.route'
import authMiddleware from './middlewares/authMiddleware'
import addressRouter from './routes/address.route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/auth', authRoutes)
app.use('/orders', authMiddleware, )
app.use('/api/addresses', addressRouter)
app.get('/', (req:Request, res: Response) =>{
    res.status(200).json("Hello, world");

})
AppDataSource.initialize()
.then(() => {
      console.log('Connected to database');


app.listen(PORT, () =>{
        console.log(`Your server is running on PORT http://localhost:${PORT}`)
    })
})
.catch((error) =>{
    console.error("Database connnection failed:", error)
})


