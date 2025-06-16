const express =require("express");
const multer = require('multer');
const {registerController,loginController, demoofSignIN, uploadPhoto} =require("../Controller/authController");
const forgotPasswordController = require("../Controller/forgotPasswordController");
const resetPasswordController  = require("../Controller/resetPasswordController");
const { isAdmin, requireSignIn } = require("../Middleware.js/middleware");
const { updateAdditionalInfo, getUserInfo } = require("../Controller/updateAdditionalInfo");
const { getUserById , getAllUsers } = require("../Controller/adminUserController");
const { createExercise, getExercisesByGender } = require('../controller/exerciseController');



const router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Define route for file upload

router.post("/upload", upload.single('image'), uploadPhoto);

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/test", requireSignIn,isAdmin, demoofSignIN);
router.post("/forgot-password", forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController); 
router.put("/user/additional-info", updateAdditionalInfo);
router.get("/user-info/:id", requireSignIn, getUserInfo);

// Admin Routes
router.get("/admin/users", requireSignIn, isAdmin, getAllUsers);
router.get("/admin/users/:id", requireSignIn, isAdmin, getUserById);




router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({
    ok:true
  });

})
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({
    ok:true
  });

})

module.exports=router;