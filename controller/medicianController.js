import Medician from "../model/medician.js";
import consumptionInventory from "../model/consumptionInventory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE MORALITY //////////////////////////////////////////////
export const createMedician = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                // const conInventory = await consumptionInventory.findOne({Name : req.body.Name}) ;
                // if(conInventory){
                    // if(conInventory.Quantity >= req.body.Amount){
                        const newmedician = new Medician({
                        Name :req.body.Name ,
                        breed : req.body.breed, 
                        Note: req.body.Note,
                        FlockID: req.params.id 
                    }) 
                        await newmedician.save();
                        res.status(200).json({message : "Medician Created"})

                     // const Quantity2 = conInventory.Quantity2 ;
                     //    await consumptionInventory.findByIdAndUpdate(
                     //        conInventory.id, 
                     //        { Quantity:conInventory.Quantity - req.body.Amount , 
                     //          Prercent : ((conInventory.Quantity - req.body.Amount) /Quantity2)*100 
                     //        },
                     //        { new: true }
                     //    )
                    // }else{
                    //     res.status(200).json({message : "this Quantity isn't enough"})
                    // }
                // }else{
                //      res.status(200).json({message : "this name doesn't Exist"})
                // }
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
