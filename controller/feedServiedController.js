import feedServed from "../model/feedServed.js";
import morality from "../model/feedServed.js";
import {ApiError} from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'});

////////////////////////////////////////////CREATE FEED SERVIED //////////////////////////////////////////////
export const createFeedServied = async(req , res , next )=>{
    try {
        verifyToken(req , res , async()=>{
            if(req.user){
                const newFeedServied = new feedServed({
                Name :req.body.Name ,
                Category : req.body.Category, 
                Amount: req.body.Amount,
                Note: req.body.Note,
                FlockID: req.params.id 
            }) 
            await newFeedServied.save();
            res.status(200).json({message : "FeedServied Created"})
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
                return next(new ApiError(`You are not user` , 404))
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}
