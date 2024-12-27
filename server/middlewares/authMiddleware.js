import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, resizeBy, next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({meesage: "Not authorized, please login!"})
        }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if(!user){
        return res.status(404).json({message: "No user found with this id!"});
    }

    req.user = user;
    next();
    }catch(error){
        console.error(error);
        res.status(401).json({message: "Not authorized, token failed"});
    } 
}

export const adminMiddleware = async (req, res, next) =>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(401).json({message: "Not authorized as an admin"});
    }
}

export const creatorMiddleware = async (req, res, next) => {
    if (
      (req.user && req.user.role === "creator") ||
      (req.user && req.user.role === "admin")
    ) {
      next();
    } else {
      res.status(403).json({ message: "Only creators can do this!" });
    }
  };

  export const verifiedMiddleware = async (req, res, next) => {
    if (req.user && req.user.isVerified) {
      next();
    } else {
      res.status(403).json({ message: "Please verify your email address!" });
    }
  };