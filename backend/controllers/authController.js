const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const Signup=async(req ,res )=>{

    try{
        const{name ,email,password}=req.body;

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"Email already Exists"});
        }
        const hashpassword=await bcrypt.hash(password ,10);
        const createUser= new User({
            name,
            email,
            password:hashpassword,
        });
        await createUser.save();

        res.status(200).json({message: "Signup Successfully.", createUser})
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const Login=async(req,res)=>{
    try{
    const{name,email, password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User Not found"});
    }

    const ismatch = await bcrypt.compare(password , user.password);

    if(!ismatch){
        return res.status(400).json({message:"Invalid Password"});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: "7d"})
    res.status(200).json({message:"Login Successfully.",
        user:{
            id: user._id,
            name:user.name,
            email:user.email,
            password:user.password,
        },
        token
    })
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports={Signup ,Login};