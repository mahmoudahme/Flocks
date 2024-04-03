import mongoose from "mongoose";

const consumptionCategorySchema = new mongoose.Schema({
    CategoryName : {
        type : String ,
        required: true
    } , 
    Description : {
        type : String ,
        required: true
    } , 
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 

})

export default mongoose.model("consumptionCategory" , consumptionCategorySchema)