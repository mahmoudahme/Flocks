import ExpensesCategory from "../model/ExpensesCategory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////CREATE ExpensesCategory //////////////////////////////////////////////
export const createExpensesCategory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newExpensesCategory = new ExpensesCategory({
                CategoryName :req.body.CategoryName ,
                Description : req.body.Description, 
                UserID: req.user.id 
            }) 
            await newExpensesCategory.save();
            res.status(200).json({message : "ExpensesCategory Created"})
            }else{
                return next(new ApiError(`You are not user` , 404))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

//////////////////////////////////////////////Get ExpensesCategory For User//////////////////////////////////////////
export const getExpensesCategory = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const ExpensesCategories = await ExpensesCategory.find({UserID : req.user.id})
                res.status(200).json({ExpensesCategories : ExpensesCategories})
            }else{
                return next(new ApiError(`You are not user` , 404))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
