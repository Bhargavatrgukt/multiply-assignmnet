import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utilis/generateToken.js";


export const signup =async(req,res)=>{
    try{
        const {fullName,username, password,confirmPassword,gender}=req.body;
        
        if (password!==confirmPassword){
            return res.status(400).json({error:"Password doesn't match"});
        }

        const user =await User.findOne({username})
        if(user){
           return res.status(400).json({error:"User already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        
        const newUser= new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
        })

        if(newUser){
        //generate JWT token here
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save()

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
           
        })
    }else{
        return res.status(400).json({error:"Invalid user details"});
    }

    }catch(error){
      console.log(`error message ${error.message}`)
      res.status(500).json({error:"new internal error"});
    }
}


export const login=async(req,res)=>{
    try{
       const {username,password}=req.body;
       const user = await User.findOne({username});
       if(!user){
        return res.status(400).json({error:"Invalid User"});
     }else{
        const checkPassword= await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({error:"Invalid Password"});
        }
     }
     
     generateTokenAndSetCookie(user._id,res)

     res.status(201).json({
        _id:user._id,
        fullName:user.fullName,   
        username:user.username,
        profilePic:user.profilePic
    })

    }catch(error){
        console.log(`error message ${error.message}`)
        res.status(500).json({error:"new internal error"});
    }
}

export const logout =async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
      console.log(`error message ${error.message}`)
      res.status(500).json({error:"new internal error"});
    }
}

