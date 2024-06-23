import flock from "../model/flock.js";
import feedServed from "../model/feedServed.js";
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

export const food = async(req , res , next)=>{
     try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const flockId = req.params.flockId ;
                var feedWithoutWater = [] ;
                const feedServedsWithoutWater = await feedServed.find({FlockID : flockId , Date:  () => {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0'); // الأشهر من 0 إلى 11 لذا نضيف 1
                        const day = String(now.getDate()).padStart(2, '0');
                        
                        // إعادة التاريخ في صيغة "yyyy-mm-dd"
                        return `${year}-${month}-${day}`;}});
                
                for(var i = 0 ; i <feedServedsWithoutWater.length ; i++){
                    if(feedServedsWithoutWater[i].Name =="Water"){
                    }else{
                        feedWithoutWater.push(feedServedsWithoutWater[i].Amount)
                    }
                }
                var number = 0 ;
                for(var i = 0 ; i <feedWithoutWater.length ; i++){
                    number += feedWithoutWater[i]
                }
                res.status(200).json({feedWithoutWater : number})
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
                var waterUsed = 0 ;
                const DateOfDay = () => {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0'); // الأشهر من 0 إلى 11 لذا نضيف 1
                        const day = String(now.getDate()).padStart(2, '0');
                        
                        // إعادة التاريخ في صيغة "yyyy-mm-dd"
                        return `${year}-${month}-${day}`;}
                console.log(DateOfDay())
                const feedServedsForWater = await feedServed.find({
                    Name : "Water" 
                    });
                for(var i = 0 ; i < feedServedsForWater.length ; i ++){
                    waterUsed += feedServedsForWater[i].Amount ;
                }
                
                const Flocks = await flock.find({UserID : req.user.id})
                var numberOfBirds = 0; 
                for(var i = 0 ; i < Flocks.length ; i ++){
                    numberOfBirds += Flocks[i].number ;
                }
                const numberOfLiters = numberOfBirds * 0.5 ;
                res.status(200).json({Liters : numberOfLiters , waterUsed : waterUsed})
            }else{
                return next(new ApiError(`You are not user` , 404))
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
