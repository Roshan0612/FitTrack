const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const requireSignIn=async(req,res,next)=>{
    try {
        const token =req.headers.authorization;
    if(!token){
        return res.status(401).send({ message: "Token must be provided" });
    }
    const decoded=await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Invalid token" });
    }
    
}
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== 'admin') {
            return res.status(403).send({
                success: false,
                message: "Unauthorized Access - Admins only",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in admin credential check",
        });
    }
};


module.exports={
    requireSignIn,
    isAdmin
}