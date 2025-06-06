const userModel =require("../Model/userModel");
const bcrypt =require("bcrypt");
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
module.exports={
    registerController
}