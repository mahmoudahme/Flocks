import feedServed from "../model/feedServed.js";
import morality from "../model/feedServed.js";
import consumptionInventory from "../model/consumptionInventory.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

////////////////////////////////////////////CREATE FEED SERVIED //////////////////////////////////////////////
export const createFeedServied = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const conInventory = await consumptionInventory.findOne({Name : req.body.Name}) ;
                if(conInventory.Quantity >= req.body.Amount && conInventory.Name == req.body.Name){
                    const newFeedServied = new feedServed({
                        Name :req.body.Name ,
                        Category : req.body.Category, 
                        Amount: req.body.Amount,
                        Note: req.body.Note,
                        FlockID: req.params.id 
                    }) 
                    await newFeedServied.save();
                    res.status(200).json({message : "FeedServied Created"})
                    const Quantity2 = conInventory.Quantity2 ;
                    await consumptionInventory.findByIdAndUpdate(
                        conInventory.id, 
                        { Quantity:conInventory.Quantity - req.body.Amount , 
                          Prercent : ((conInventory.Quantity - req.body.Amount) /Quantity2)*100 
                        },
                        { new: true }
                    )
                }else{
                    res.status(200).json({message : "this Quantity isn't enough or the this name doesn't Exist"})
                }
            }else{
                return next(new ApiError(`You are not user` , 404))
            }
            
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
} 

///////////////////////////////////////////Get FEED SERVIED For User//////////////////////////////////////////
export const getFeedServiedForFlocks = async(req , res , next)=>{
    try {

        verifyToken(req , res , async()=>{
            if(req.user){
                const FeedServied = await feedServed.find({FlockID : req.params.flockiD})
                res.status(200).json({FeedServied : FeedServied})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

export const deleteFeedServied = async(req , res , next )=>{
    try {
        const flockiD = req.params.flockiD ;
        const feedServedID = req.params.feedServedID ;
        verifyToken(req , res , async()=>{
            if(req.user){
                await feedServed.findByIdAndDelete(feedServedID)
                res.status(200).json({message : "feedServedID Deleted"})
            }else{
                return next(new ApiError(`You are not user` , 401))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
