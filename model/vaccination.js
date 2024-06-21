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
    date : {
       type : String ,
       default:  () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // الأشهر من 0 إلى 11 لذا نضيف 1
      const day = String(now.getDate()).padStart(2, '0');
      
      // إعادة التاريخ في صيغة "yyyy-mm-dd"
      return `${year}-${month}-${day}`;
     } 
     } , 
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
