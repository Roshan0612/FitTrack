const express =require("express");
const {registerController} =require("../Controller/authController");

const router=express.Router();



router.post("/register",registerController);

module.exports=router;