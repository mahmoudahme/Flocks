import Vaccination from "../model/vaccination.js";
import consumptionInventory from "../model/consumptionInventory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE Vaccination //////////////////////////////////////////////
export const createVaccination = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                 const conInventory = await consumptionInventory.findOne({Name : req.body.Name, UserID : req.user.id}) ;
                if(conInventory){
                    if(conInventory.Quantity >= 1){
                        const newVaccination = new Vaccination({
                            Name :req.body.Name ,
                            breed : req.body.breed, 
                            VaccinationType: req.body.VaccinationType,
                            Method: req.body.Method,
                            discription: req.body.discription,
                            FlockID: req.params.id 
                        }) 
                        await newVaccination.save();
                        res.status(200).json({message : "Vaccination Created"})
                        const Quantity2 = conInventory.Quantity2 ;
                         await consumptionInventory.findByIdAndUpdate(
                            conInventory.id, 
                            { Quantity:conInventory.Quantity - 1 , 
                              Prercent : ((conInventory.Quantity - 1) /Quantity2)*100 
                            },
                            { new: true }
                        )
                    }else{
                        res.status(200).json({message : "this Quantity isn't enough"})
                    }
                }else{
                     res.status(200).json({message : "this name doesn't Exist"})
                }
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

///////////////////////////////////////////Get Vaccination For User//////////////////////////////////////////
export const getVaccinationForFlocks = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const Vaccinations = await Vaccination.find({FlockID : req.params.flockiD})
                res.status(200).json({Vaccination : Vaccinations})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const deleteVaccination = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const VaccinationID = req.params.VaccinationID ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await Vaccination.findByIdAndDelete(VaccinationID)
                res.status(200).json({message : "Vaccination Delted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
