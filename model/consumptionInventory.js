import mongoose from "mongoose";

function formatDateToDateOnly() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // الأشهر من 0 إلى 11 لذا نضيف 1
  const day = String(now.getDate()).padStart(2, '0');
  
  // إعادة التاريخ في صيغة "yyyy-mm-dd"
  return new Date(`${year}-${month}-${day}`);
}
const consumptionInventorySchema = new mongoose.Schema({
    Name : {
        type : String ,
        required: true
    } , 
     date : {
       type : Date ,
       default: formatDateToDateOnly
     } , 
    Price : {
        type : Number 
    } , 
    Quantity : {
        type : Number ,
        required: true
    } , 
    Category: { 
        type : String ,
        required: true 
    },
    UserID : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    } 
})

export default mongoose.model("consumptionInventory" , consumptionInventorySchema)
