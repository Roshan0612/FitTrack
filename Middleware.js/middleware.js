



const IsAdmin=async(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(401).send({ message: "Token must be provided" });
    }
    const decode=await jwt.verify(token, process.env.SECRET, function(err, decoded) {
        console.log(decoded.foo)  });
    req.user = decoded;
}
module.exports={
    isAdmin
}