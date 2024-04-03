import mongoose from "mongoose";

const moralitySchema = new mongoose.Schema({
    NumberofDead : {
        type : Number ,
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
        type : String 
    } , 
    FlockID : {
        type: mongoose.Schema.ObjectId,
        ref: 'Flock',
        required : true
    }  
})

export default mongoose.model("Morality" , moralitySchema)
