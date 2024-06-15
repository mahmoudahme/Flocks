import income from "../model/income.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

//////////////////////////////////////////////CREATE INCOME //////////////////////////////////////////////
export const createIncome = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const newIncome = new income({
                    Name :req.body.Name ,
                    Category : req.body.Category, 
                    Amount :  req.body.Amount,
                    IncomeCategory :req.body.IncomeCategory ,
                    method: req.body.method,
                    Note: req.body.Note,
                    FlockID: req.params.id 
                }) 
                await newIncome.save();
                res.status(200).json({message : "Income Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 
//////////////////////////////////////////////Delete INCOME //////////////////////////////////////////////
export const deleteIncomes = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const incomeiD = req.params.incomeiD ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await income.findOneAndDelete(incomeiD)
                res.status(200).json({message : "Income Delted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

//////////////////////////////////////////////Get INCOME For User//////////////////////////////////////////
export const getIncomeForFlocks = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Incomes = await income.find({FlockID : req.params.flockiD})
                res.status(200).json({Income : Incomes})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
//////////////////////////////////////////////Get Income By Id//////////////////////////////////////////

export const getIncomeBYid = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Income = await income.find({_id : req.params.incomeiD , FlockID : req.params.flockiD })
                res.status(200).json({Income : Income})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
