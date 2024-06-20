import mongoose from "mongoose";

const consumptionInventorySchema = new mongoose.Schema({
    Name : {
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
    Price : {
        type : Number 
    } , 
    Quantity : {
        type : Number ,
        required: true
    } ,
    Quantity2 : {
        type : Number ,
        required: true
    }, 
    Category: { 
        type : String ,
        required: true 
    },
    Prercent: {
        type : Number 
    } ,
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 
})

export default mongoose.model("consumptionInventory" , consumptionInventorySchema)
