import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use("/api/auth",authRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

app.listen(5000,()=>{
    console.log("server is running on PORT 5000")
})

