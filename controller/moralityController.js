import morality from "../model/morality.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE MORALITY //////////////////////////////////////////////
export const createMorality = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newMorality = new morality({
                NumberofDead :req.body.NumberofDead ,
                breed : req.body.breed, 
                Note: req.body.Note,
                FlockID: req.params.id 
            }) 
            await newMorality.save();
            res.status(200).json({message : "Morality Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

//////////////////////////////////////////////Get MORALITY For User//////////////////////////////////////////
export const getMoralityForFlocks = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const Morality = await morality.find({FlockID : req.params.flockiD})
                res.status(200).json({Morlaity : Morality})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const deletemorality = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const moralityID = req.params.moralityID ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await morality.findByIdAndDelete(moralityID)
                res.status(200).json({message : "morality Delted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
