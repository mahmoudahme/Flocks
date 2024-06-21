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
