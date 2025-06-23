const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const Subscription = require("../model/subscriptionModel");
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


const checkSubscription = async (req, res, next)=> {
  const userId = req.user._id;

  const latest = await Subscription.findOne({ user: userId }).sort({ createdAt: -1 });

  if (!latest || new Date(latest.expiresAt) < new Date()) {
    return res.status(403).json({ locked: true, message: "Subscription expired or not found" });
  }

  next();
};


module.exports = {
    requireSignIn,
    isAdmin,
    checkSubscription
};
