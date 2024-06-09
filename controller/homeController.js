import xlsx from "xlsx";
import fs from "fs";
// قراءة ملف Excel\

export const Data = async(req, res , next)=>{
    const workbook = xlsx.readFile('elmorshd_prices.xlsx');

    // اختيار الورقة الأولى في الملف
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // تحويل البيانات إلى JSON
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    res.status(200).json({data})
        
}


