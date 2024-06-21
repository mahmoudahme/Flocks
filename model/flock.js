import mongoose from "mongoose";


const FlockSchema = new mongoose.Schema({
    flockName : {
        type : String ,
        required: true
    } , 
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
     },
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
    Active : {
        type : Boolean,
        required : true
    } , 
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 
});
export default mongoose.model("Flock", FlockSchema);
