const userModel =require("../Model/userModel");
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const saltRounds=10;
const registerController=async (req,res)=>{
    try {
        const { name,email,password}=req.body;
        if(!name){
            return res.send("please enter the name!")
        }
        if(!email){
            return res.send("please enter the email!")
        }
        if(!password){
            return res.send("please enter the password!")
        }

        const hashedpassword = await bcrypt.hash(password, saltRounds);
        const user = await userModel.findOne({email});
        if(user){
            return res.send({
                message: "Already register ,please login!"
            })
        }
        const newUser= await new userModel({
            name:name,email:email,password: hashedpassword
        }).save();
        res.send({
            newUser,
            message:"user created successfully!"
        });
    } catch (error) {
      console.log(error);
        
      res.status(400).send({
      success: false,
      message: "Errror in Registration",
      error,
    })}

}

const loginController=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.send("please enter the email and password");
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.send({
            message:"user doesnt exist"
        })
    }
    const comparepasswordMatch= await bcrypt.compare(password,user.password);
     if(!comparepasswordMatch){
        return res.send({
            message:"incorrect password or username! try again!"
         })
     }
     const token = await jwt.sign({id: user._id}, process.env.SECRET, { expiresIn: '10d' });
     if(!token){
        return res.send({
            msg:"jwt must be provide,try again"
        })
     }
     res.status(200).send({
      success: true,
      message: "congratulations,login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
      },
      token,
    });
    } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong while logging in",
      error,
    });
    }
}
const demoofSignIN = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports={
    registerController,
    loginController,
    demoofSignIN
}