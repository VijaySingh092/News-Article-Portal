import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

export const signUp = async(req,res)=>{

    const{userName, password, email} = req.body || {}

    if(!userName || !password || !email || userName==="" || password==="" || email==="" ){
        return res.status(400).json({message:"All the fields are required."})
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