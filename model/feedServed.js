import mongoose from "mongoose";

const feedServedSchema = new mongoose.Schema({
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

export default mongoose.model("feedServed" , feedServedSchema)

