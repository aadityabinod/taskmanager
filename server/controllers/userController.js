import User from '../models/userModel.js';
import generateToken from '../handlers/generateToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from '../models/token.model.js';   
import crypto from 'crypto';
import hashToken from '../handlers/hashToken.js';
import sendEmail from '../handlers/sendEmail.js';

export const registerUser = async(req, res)=>{
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({message: 'Please fill in all fields'});
    }

    if(password.length < 6){
        return res.status(400).json({message: 'Password must be at least 6 characters'});
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }

    const user = await User.create({
        name,
        email,
        password
    });
    
    const token = generateToken(user._id);

    res.cookie('token', token, {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        sameSite: "none", // cross-site access --> allow all third-party cookies
        secure: false,    });

        if(user){
            const { _id, name, email, role, photo, bio, isVerified } = user;

            res.status(201).json({
                _id,
                name,
                email,
                role,
                photo,
                bio,
                isVerified,
                token
            });
        }else{
            res.status(400).json({message: 'Invalid user data'});
        }
}

export const loginUser = async(req,res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Please fill in all fields'});
    }

    const userExists = await User.findOne({email});

    if(!userExists){
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if(!isMatch){
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const token = generateToken(userExists._id);

    if(userExists && isMatch){
        const { _id, name, email, role, photo, bio, isVerified } = userExists;

        res.cookie('token', token, {
            path: "/",
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: "none", // cross-site access --> allow all third-party cookies
            secure: true,
        });

        res.status(200).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token
        });
    }else{
        res.status(400).json({message: 'Invalid user data'});
    }
}

export const logoutUser = async(_, res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });
    res.status(200).json({message: 'Logged out successfully'});
}

export const getUser = async(req, res)=>{
    const user = await User.findById(req.user._id).select('-password');

    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({ message: "User not found" });

    }

}

export const updateUser = async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){

        const { name, bio, photo } = req.body;

        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.photo = photo || user.photo;

        const updated = await user.save();

        res.status(200).json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            photo: updated.photo,
            bio: updated.bio,
            isVerified: updated.isVerified,
        });

    }else{
        res.status(404).json({ message: "User not found" });
    }
}

export const userLoginStatus = async(req, res)=>{
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Not authorized, please login!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
        res.status(200).json(true);
      } else {
        res.status(401).json(false);
      }
    }

    export const verifyEmail = async(req, res)=>{
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        if(user.isVerified){
            return res.status(400).json({message: 'Email is already verified'});
        }

        let token = await Token.findOne({ userId: user._id });

        if(token){
            await token.deleteOne();
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const hashedToken = hashToken(verificationToken);

        await new Token({
            userId: user._id,
            passwordtoken: hashedToken,
            createdAt: Date.now(),
        }).save();

        const  verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

     
        const subject = 'Account Verification';
        const template = 'verifyEmail';
        const url = verificationLink;
        const name = user.name; 
        const from= process.env.EMAIL
        const  to = user.email;
         const  reply_to = "noreply@gmail.com";

        try{
            await sendEmail(subject, template, from, reply_to, to, name, url);
            return res.json({ message: "Email sent" });

        } catch (error) {
            console.log("Error sending email: ", error);
            return res.status(500).json({ message: "Email could not be sent" });
          }

        }

 export const verifyUser = async(req,res)=>{
            const {verificationToken} = req.params;

            if(!verificationToken){
                return res.status(400).json({message: 'Invalid token'});
            }

            const hashedToken = hashToken(verificationToken);

            const userToken = await Token.findOne({verificationToken: hashedToken,
                expiresAt: { $gt: Date.now() }
            });
                if(!userToken){
                    return res.status(400).json({message: 'Token has expired'});
                }

                const user = await User.findById(userToken.userId);

                if(user.isVerified){
                    return res.status(400).json({message: 'Email is already verified'});
                }


                user.isVerified = true;
                await user.save();
                res.status(200).json({message: 'Email verified successfully'});     
        }


export const forgotPassword = async(req, res)=>{
    const { email } = req.body;

    if(!email){
        return res.status(400).json({message: 'Please fill in all fields'});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: 'User not found'});
    }

    let token = await Token.findOne({ userId: user._id });

    if(token){
        await token.deleteOne();
    }

    const resetToken = crypto.randomBytes(64).toString('hex');

    const hashedToken = hashToken(resetToken);

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000, 
    }).save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const subject = 'Password Reset';
    const template = 'forgotPassword';
    const url = resetLink;
    const name = user.name;
    const from = process.env.EMAIL
    const to = user.email;
    const reply_to = "noreply@noreply.com";

    try{
        await sendEmail(subject, template, from, reply_to, to, name, url);
        return res.json({ message: "Email sent" });

    } catch (error) {
        console.log("Error sending email: ", error);
        return res.status(500).json({ message: "Email could not be sent" });
      }
}


export const resetPassword = async(req, res)=>{
    const { password } = req.body;
    const { resetToken } = req.params;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
    
      // hash the reset token
      const hashedToken = hashToken(resetToken);
      const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
      });

        if (!userToken) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(userToken.userId);
        user.password = password;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    }

    export const changePassword = async (req, res) => {
        const { currentPassword, newPassword } = req.body;
      
        if (!currentPassword || !newPassword) {
          return res.status(400).json({ message: "All fields are required" });
        }
      
        const user = await User.findById(req.user._id);
      
        const isMatch = await bcrypt.compare(currentPassword, user.password);
      
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid password!" });
        }
      
        if (isMatch) {
          user.password = newPassword;
          await user.save();
          return res.status(200).json({ message: "Password changed successfully" });
        } else {
          return res.status(400).json({ message: "Password could not be changed!" });
        }
      };

