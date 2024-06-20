import income from "../model/income.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;

dotenv.config({path : 'config/config.env'});

export const InconmeFin = async(req , res , next)=>{
    try {
        const flockiD = req.params.flockiD ;
        verifyToken(req , res , async()=>{
            if(req.user){
                const Incomes = await income.find({flockiD : flockiD})
                console.log(Incomes)
                var fini = 0; 
                for(var i = 0 ; i < Incomes.length ; i++){
                    fini += Incomes[i].Amount ;
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
