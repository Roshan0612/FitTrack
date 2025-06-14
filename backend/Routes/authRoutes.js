const express =require("express");
const {registerController,loginController, demoofSignIN} =require("../Controller/authController");
const forgotPasswordController = require("../Controller/forgotPasswordController");
const resetPasswordController  = require("../Controller/resetPasswordController");
const { isAdmin, requireSignIn } = require("../Middleware.js/middleware");
const { updateAdditionalInfo } = require("../Controller/updateAdditionalInfo");


const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/test", requireSignIn,isAdmin, demoofSignIN);
router.post("/forgot-password", forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController); 
router.put("/user/additional-info", updateAdditionalInfo);

router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({
    ok:true
  });
})

module.exports=router;