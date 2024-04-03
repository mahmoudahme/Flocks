import mongoose from "mongoose";

const productionCategorySchema = new mongoose.Schema({
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

export default mongoose.model("productionCategory" , productionCategorySchema)