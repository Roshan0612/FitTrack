const express =require("express");
const {registerController,loginController, demoofSignIN} =require("../Controller/authController");
const { isAdmin, requireSignIn } = require("../Middleware.js/middleware");

const router=express.Router();



router.post("/register",registerController);
router.post("/login",loginController);
router.get("/test", requireSignIn, isAdmin, demoofSignIN);
module.exports=router;