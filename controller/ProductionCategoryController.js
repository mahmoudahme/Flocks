import productionCategory from "../model/productionCategory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////CREATE productionCategory //////////////////////////////////////////////
export const createProductionCategory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newProductionCategory = new productionCategory({
                CategoryName :req.body.CategoryName ,
                Description : req.body.Description, 
                UserID: req.user.id 
            }) 
            await newProductionCategory.save();
            res.status(200).json({message : "ProductionCategory Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

////////////////////////////////////////Get ExpensesCategory For User//////////////////////////////////////////
export const getProductionCategory = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const ProductionCategory = await productionCategory.find({UserID : req.user.id})
                res.status(200).json({ProductionCategory : ProductionCategory})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
