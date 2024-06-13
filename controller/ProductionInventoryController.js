import productionInventory from "../model/productionInventory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

///////////////////////////////CREATE consumptionInventory //////////////////////////////////////////////
export const createproductionInventory = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                console.log(req.body)
                const NewproductionInventory= new productionInventory({
                    Name :req.body.Name ,
                    Price : req.body.Price, 
                    Quantity: req.body.Quantity,
                    Category : req.body.Category ,
                    UserID : req.user.id
            }) 
            await NewproductionInventory.save();
            res.status(200).json({message : "productionInventory Created"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

////////////////////////////////Get productionInventories For User//////////////////////////////////////////
export const getproductionInventoryForUser = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const productionInventories = await productionInventory.find({UserID : req.user.id})
                res.status(200).json({productionInventories : productionInventories})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
