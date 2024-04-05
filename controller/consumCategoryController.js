import consumptionCategory from "../model/consumptionCategory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import Logger from "../Services/logger.js"
const logger = new Logger("ConsumptionCategoryControllers") ;
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////CREATE ExpensesCategory //////////////////////////////////////////////
export const createConsumptionCategory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newConsumptionCategory = new consumptionCategory({
                CategoryName :req.body.CategoryName ,
                Description : req.body.Description, 
                UserID: req.user.id 
            }) 
            await newConsumptionCategory.save();
            logger.info("ConsumptionCategory Created")
            res.status(200).json({message : "ConsumptionCategory Created"})
            }else{
                logger.error("You are not User")
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

//////////////////////////////////Get ConsumptionCategory For User//////////////////////////////////////////
export const getConsumptionCategory = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const ConsumptionCategory = await consumptionCategory.find({UserID : req.user.id})
                logger.info("ConsumptionCategory" , consumptionCategory)
                res.status(200).json({ConsumptionCategory : ConsumptionCategory})
            }else{
                logger.error("You are not User")
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
