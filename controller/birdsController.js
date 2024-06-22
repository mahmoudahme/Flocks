import flock from "../model/flock.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;

dotenv.config({path : 'config/config.env'});

export const getBirdsOfFlocks = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Flocks = await flock.find({UserID : req.user.id})
                var numberOfBirds = 0; 
                for(var i = 0 ; i < Flocks.length ; i ++){
                    numberOfBirds += Flocks[i].number ;
                }
                res.status(200).json({numberOfBirds : numberOfBirds})
                
            }else{
                return next(new ApiError(`You are not user` , 404))
                
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const water = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Flocks = await flock.find({UserID : req.user.id})
                var numberOfBirds = 0; 
                for(var i = 0 ; i < Flocks.length ; i ++){
                    numberOfBirds += Flocks[i].number ;
                }
                const numberOfLiters = numberOfBirds * 0.5 ;
                res.status(200).json({Liters : numberOfLiters})
            }else{
                return next(new ApiError(`You are not user` , 404))
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
