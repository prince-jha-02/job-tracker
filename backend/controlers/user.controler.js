import user from "../models/user.model.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken =(id)=>{
    return jwt.sign(
  { id },
  process.env.JWT_SECRET,
  {
    expiresIn: "30d"
  }
)
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist =await  user.findOne({ email });

        if (exist) {
            return res.json({ success: false, message: "user already exist" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enetr password of min length 8" })
        }

        //hashing

        const salt =await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new user({
            name,
            email,
            password:hashedPassword
        })

        const createdUser =await newUser.save()

        const token=createToken(createdUser._id)

        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:error.message})
    }
    
}


//controler for user login 
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;

        const presentUser=await user.findOne({email});

        if(!presentUser){
            return res.json({success:false,message:"uder doesnot exist"})
        }
        const isMatch=await bcrypt.compare(password,presentUser.password);

        if(isMatch){
            const token=createToken(presentUser._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credintial"})
        }
    } catch (error) {

        console.log(error);
        res.json({success:false,msg:error.message})
        
    }
}



export {registerUser,loginUser}
