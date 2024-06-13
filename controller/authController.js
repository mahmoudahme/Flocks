import bcrypt from "bcrypt" ;
import {ApiError} from "../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../model/user.js";
import Logger from "../Services/logger.js"
const logger = new Logger("AuthControllers") ;
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'})


///////////////////////////////////REGISTER TO SYSTEM ////////////////////////////////////////////////
export const register = async (req , res , next )=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName ,
            email: req.body.email,
            password: hashedPassword,
            isAdmin :req.body.isAdmin
        });
        await newUser.save();
        logger.info("USer Created" , newUser)
        res.status(200).json({message : "userCreated" , userdata : newUser});
    } catch (error) {
        logger.error("There is error" , error)
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

///////////////////////////////////LOGIN TO SYSTEM ////////////////////////////////////////////////

export const login = async(req , res , next )=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return next(new ApiError("User not found!" , 401));  
        } 
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            return next(new ApiError("password isn't correct" , 401)) ; 
        }
        const token = JsonWebToken.sign({id : user._id , isAdmin : user.isAdmin} , process.env.JWT) ;
        const { password, isAdmin, ...otherDetails } = user._doc; 
        logger.info("User LogIn")
        res.cookie("accessToken" , token , {httpOnly: true,}).status(200).json({ details: { ...otherDetails }, isAdmin , token : token });
        
    } catch (error) {
        logger.error("There is error" , error)
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const logout = async (req, res, next) => {
    try {
      // Clear the token from the cookies
      res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      next(err);
    }
  };
  
