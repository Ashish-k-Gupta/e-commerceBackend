import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT = process.env.PORT || 5000;
app.get('/', (req:Request, res: Response) =>{
    try{
        res.status(200).json("Hello, world");
    }catch(error){
        console.log("Server is not working:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.listen(PORT, () =>{
    console.log(`Your server is running on PORT http://localhost:${PORT}`)
})