const express =require("express");
const {registerController,loginController, demoofSignIN} =require("../Controller/authController");
const forgotPasswordController = require("../Controller/forgotPasswordController");
const resetPasswordController  = require("../Controller/resetPasswordController");
const { isAdmin, requireSignIn } = require("../Middleware.js/middleware");

const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/test", requireSignIn,isAdmin, demoofSignIN);
router.post("/forgotpassword", forgotPasswordController);
router.post('/resetpassword/:token', resetPasswordController);
module.exports=router;