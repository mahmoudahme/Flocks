import axios from'axios';
import cheerio from'cheerio';
import xlsx from'xlsx';
import cron from 'node-cron' ;
import fs from "fs";

export const Data = async(req, res , next)=>{
            const url = 'https://www.elmorshdledwagn.com/prices/l2';
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            // استخراج البيانات من الصفحة
            const rows = [];
            $('table tbody tr').each((index, element) => {
                const row = {};
                $(element).find('td').each((i, elem) => {
                    const cellValue = $(elem).text().trim();
                        if (i === 0) row["الصنف"] = cellValue;
                        if (i === 1) row["سوق"] = cellValue;
                        if (i === 2) row["نتفيذ"] = cellValue;
                        if (i === 3) row["المؤشر"] = cellValue;
                });
                rows.push(row);
            });

            console.log("Fetching data and updating Excel file...");
            const ws = xlsx.utils.json_to_sheet(rows);
            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, ws, 'Prices');
            console.log("Update complete.");
            res.json(rows).status(200)

        // جدولة التحديثات كل يوم في الساعة 9 صباحًا
        cron.schedule('0 9 * * *', () => {
            Data();
        }, {
            scheduled: true,
            timezone: "Africa/Cairo"
        });

}


