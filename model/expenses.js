import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
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
    expensesCategory :{
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

export default mongoose.model("Expenses" , expensesSchema)
