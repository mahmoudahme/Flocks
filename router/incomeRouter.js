import  express  from "express";
import {verifyAdmin ,verifyUser , verifyUserAndAdmin} from "../Utils/verifyToken.js"
import { createIncome, deleteIncomes, getIncomeBYid, getIncomeForFlocks } from "../controller/incomeController.js";

const router = express.Router();

router.get("/:flockiD/:incomeiD" , getIncomeBYid)
router.get("/:flockiD", getIncomeForFlocks )
router.post("/create/:id" , createIncome);
router.delete("/delete/:flockiD/:incomeiD" , deleteIncomes );

export default router ; 