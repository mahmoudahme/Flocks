import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema({
    Name : {
        type : String ,
        required: true
    } , 
    breed :{
        type : String ,
        required: true
    },
    VaccinationType : {
        type : String ,
        required: true
    },
    Method : {
        type : String ,
        required: true
    },
    // date : { 
    //     type : Date ,
    //     required: true
    // } , 
    discription : {
        type : String ,
        required : true
    } , 
    FlockID : {
        type: mongoose.Schema.ObjectId,
        ref: 'Flock',
        required : true
    }  
})

export default mongoose.model("Vaccination" , vaccinationSchema)
//+Name:String +Date:date +Breed:object +VaccinationType:object +Method:object +Description:String +FlockID:String 