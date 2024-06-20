import Medician from "../model/medician.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE MORALITY //////////////////////////////////////////////
export const createMedician = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newmedician = new Medician({
                Name :req.body.Name ,
                breed : req.body.breed, 
                Note: req.body.Note,
                FlockID: req.params.id 
            }) 
            await newmedician.save();
            res.status(200).json({message : "Medician Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

//////////////////////////////////////////////Get MORALITY For User//////////////////////////////////////////
export const getMedicianForFlocks = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const medician = await Medician.find({FlockID : req.params.flockiD})
                res.status(200).json({Medicine : medician})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const deleteMedician = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const MedicianID = req.params.MedicianID ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await Medician.findByIdAndDelete(MedicianID)
                res.status(200).json({message : "Medician Delted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
