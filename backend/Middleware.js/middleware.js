const jwt = require("jsonwebtoken");
const userMoodel = require("../model/userModel");

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ message: "Token must be provided" });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        req.user = decoded;
        console.log("user:" + req.user);
        next();
    } catch (error) {
        console.log(error);
        res.send({ message: "Invalid token" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 'admin') {
            return res.send({
                success: false,
                message: "UnAuthorized Access!!",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in admin credential check",
        });
    }
};

module.exports = {
    requireSignIn,
    isAdmin
};
