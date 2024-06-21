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

export default mongoose.model("Expenses" , expensesSchema)
