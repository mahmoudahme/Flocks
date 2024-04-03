import incomeCategory from "../model/incomeCategory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////CREATE incomeCategory //////////////////////////////////////////////
export const createIncomeCategory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newincomeCategory = new incomeCategory({
                CategoryName :req.body.CategoryName ,
                Description : req.body.Description, 
                UserID: req.user.id 
            }) 
            await newincomeCategory.save();
            res.status(200).json({message : "incomeCategory Created"})
            }else{
                return next(new ApiError(`You are not user` , 404))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

//////////////////////////////////////////////Get MORALITY For User//////////////////////////////////////////
export const getIncomeCategory = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const incomeCategories = await incomeCategory.find({UserID : req.user.id})
                res.status(200).json({incomeCategories : incomeCategories})
            }else{
                return next(new ApiError(`You are not user` , 404))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
