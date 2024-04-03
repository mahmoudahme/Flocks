import mongoose from "mongoose";

const medicianSchema = new mongoose.Schema({
    Name : {
        type : String ,
        required: true
    } , 
    breed :{
        type : String ,
        required: true
    },
    // date : { 
    //     type : Date ,
    //     required: true
    // } , 
    Note : {
        type : String ,
        required : true
    } , 
    FlockID : {
        type: mongoose.Schema.ObjectId,
        ref: 'Flock',
        required : true
    }  
})

export default mongoose.model("Medician" , medicianSchema)
