import expenses from "../model/expenses.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE EXPENSES //////////////////////////////////////////////
export const createExpenses = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){   
                console.log(req.body)
                const newExpenses = new expenses({
                    Name :req.body.Name ,
                    Category : req.body.Category, 
                    Amount :  req.body.Amount,
                    expensesCategory :req.body.expensesCategory ,
                    method: req.body.method,
                    Note: req.body.Note,
                    FlockID: req.params.id 
                }) 
                await newExpenses.save();
                res.status(200).json({message : "Expenses Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 
//////////////////////////////////////////////Delete Expenses //////////////////////////////////////////////
export const deleteExpenses = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const expensesiD = req.params.expensesiD ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await expenses.findOneAndDelete(expensesiD)
                res.status(200).json({message : "expenses Deleted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
//////////////////////////////////////////////Get expenses For User//////////////////////////////////////////
export const getexpensesForFlocks = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const expensess = await expenses.find({FlockID : req.params.flockiD})
 console.log(expensess)
              res.status(200).json({expensess : expensess})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
//////////////////////////////////////////////Get Expenses By Id//////////////////////////////////////////

export const getExpensesBYid = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const expensess = await expenses.find({_id : req.params.expensesiD , FlockID : req.params.flockiD })
                res.status(200).json({expensess : expensess})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
