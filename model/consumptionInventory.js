import mongoose from "mongoose";

const consumptionInventorySchema = new mongoose.Schema({
    Name : {
        type : String ,
        required: true
    } , 
     date : {
       type : Date ,
       required: true
     } , 
    Price : {
        type : Number ,
        required: true
    } , 
    Quantity : {
        type : Number ,
        required: true
    } , 
    Description : {
        type : String ,
        required: true
    } , 
    Category: { 
        type : String ,
        required: true 
    },
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 
})

export default mongoose.model("consumptionInventory" , consumptionInventorySchema)