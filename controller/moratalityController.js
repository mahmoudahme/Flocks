import morality from "../model/morality.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;

dotenv.config({path : 'config/config.env'});

export const moratalitiesDead = async(req , res , next)=>{
    try {
        const flockiD = req.params.flockiD ;
        verifyToken(req , res , async()=>{
            if(req.user){
                const moralities = await morality.find({FlockID : flockiD})
                var NumOfDead = 0; 
                for(var i = 0 ; i < moralities.length ; i++){
                    NumOfDead += moralities[i].NumberofDead ;
                }
                res.status(200).json({Number : NumOfDead})
                
            }else{
                return next(new ApiError(`You are not user` , 404))
                
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
