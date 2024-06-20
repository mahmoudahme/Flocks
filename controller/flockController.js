import flock from "../model/flock.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
import Logger from "../Services/logger.js"
const logger = new Logger("FlockControllers") ;
dotenv.config({path : 'config/config.env'});

export const updateFlock = async(req, res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const flockId = req.params.id ;
                const newDataOfFlock = await flock.findByIdAndUpdate( 
                    flockId, 
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json({Flock : newDataOfFlock});
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
            })
    } catch (error) {
        return next(new ApiError(`System Error ${error}`) , 404);
    }
}


//////////////////////////////////////////////Get Flock For User//////////////////////////////////////////
export const getFlocks = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Flocks = await flock.find({UserID : req.user.id})
                logger.info("Flocks List" , Flocks)
                res.status(200).json({Flocks : Flocks})
            }else{
                logger.error("YOU ARE NOT ALLAWED");
                return next(new ApiError(`You are not user` , 401))
                
            } 
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
//////////////////////////////////////////////Get Flock By Id//////////////////////////////////////////

export const getFlockBid = async(req , res , next)=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const Flocks = await flock.find({_id : req.params.id , UserID : req.user.id })
                logger.info("Flocks List" , Flocks)
                res.status(200).json({Flocks : Flocks})
            }else{
                logger.error("YOU ARE NOT ALLAWED");
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
//////////////////////////////////////////////CREATE FLOCKS //////////////////////////////////////////////
export const createFlocks = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const newFlock = new flock({
                    flockName :req.body.flockName ,
                    // date : req.body.date, 
                    number :  req.body.number,
                    Breed :req.body.Breed ,
                    CostPerBirds: req.body.CostPerBirds,
                    Supplier: req.body.Supplier,
                    Active : req.body.Active ,
                    UserID: req.user.id 
                })
                await newFlock.save();
                logger.info("Flocks Craeted")
                res.status(200).json({message : "Flock Created"})
            }else{
                logger.error("YOU ARE NOT ALLAWED");
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

//////////////////////////////////////////////Delete FLOCKS //////////////////////////////////////////////
export const deleteFlocks = async(req , res , next )=>{
    try {
        const flockiD = req.params.id ;
        verifyToken(req , res , async()=>{
            if(req.user){
                const user = req.user.id
                await flock.findOneAndDelete(flockiD)
                logger.info("Flocks Deleted")
                res.status(200).json({message : "Flock Delted"})
            }else{
                logger.error("YOU ARE NOT ALLAWED");
                return next(new ApiError(`You are not user` , 401))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
