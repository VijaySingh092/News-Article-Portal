import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

export const signUp = async(req,res, next)=>{

    const{userName, password, email} = req.body || {}
    console.log(req.body)

    if(!userName || !password || !email || userName==="" || password==="" || email==="" ){
        return next(errorHandler(400,"All fields are required"))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
        userName, 
        password:hashedPassword, 
        email})

    try{
        await newUser.save()
        res.json("Sign Up successful")
    }catch(err){
        res.status(500).json({message:err})
    }
    
}