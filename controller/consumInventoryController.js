import consumptionInventory from "../model/consumptionInventory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

///////////////////////////////CREATE consumptionInventory //////////////////////////////////////////////
export const createconsumptionInventory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const NewconsumptionInventory = new consumptionInventory({
                    Name :req.body.Name ,
                    Price : req.body.Price, 
                    Quantity: req.body.Quantity,
                    Category : req.body.Category ,
                    Quantity2 : req.body.Quantity ,
                    Prercent : (req.body.Quantity / req.body.Quantity) *100 , 
                    UserID : req.user.id
            }) 
            await NewconsumptionInventory.save();
            res.status(200).json({message : "consumptionInventory Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

////////////////////////////////////Get consumptionInventory For User//////////////////////////////////////////
export const getconsumptionInventoryForUser = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const consumptionInventories = await consumptionInventory.find({UserID : req.user.id})
                res.status(200).json({consumptionInventories : consumptionInventories})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
