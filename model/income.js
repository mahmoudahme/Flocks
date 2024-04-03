import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    Name : {
        type : String ,
        required: true
    } , 
    Category : {
        type : String ,
        required: true
    } , 
    Amount : {
        type : Number ,
        required: true
    } , 
    IncomeCategory :{
        type : String ,
        required: true
    },
    method :{
        type : String ,
        required: true
    }, 
    // date : { 
    //     type : Date ,
    //     required: true
    // } , 
    Note : {
        type : String 
    } , 
    FlockID : {
        type: mongoose.Schema.ObjectId,
        ref: 'Flock',
        required : true
    }  
})

export default mongoose.model("Income" , incomeSchema)
