import expenses from "../model/expenses.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;

dotenv.config({path : 'config/config.env'});

export const expensesFin = async(req , res , next)=>{
    try {
        const flockiD = req.params.flockiD ;
        verifyToken(req , res , async()=>{
            if(req.user){
                const expensesss = await expenses.find({FlockID : flockiD})
                var fini = 0; 
                for(var i = 0 ; i < expensesss.length ; i++){
                    fini += expensesss[i].Amount ;
                }
                res.status(200).json({Number : fini})
                
            }else{
                return next(new ApiError(`You are not user` , 404))
                
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
