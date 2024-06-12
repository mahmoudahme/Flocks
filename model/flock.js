import mongoose from "mongoose";


const FlockSchema = new mongoose.Schema({
    flockName : {
        type : String ,
        required: true
    } , 
    //date : {
    //    type : Date ,
    //    required  :true 
   // },
    number : {
        type :Number ,
        required : true  
    },
    Breed : {
        type : String ,
        required: true
    } ,
    CostPerBirds : {
        type : Number ,
        required: true
    } ,
    Supplier : {
        type : String ,
        required: true
    } ,
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 
});
export default mongoose.model("Flock", FlockSchema);