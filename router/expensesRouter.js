import  express  from "express";
import {verifyAdmin ,verifyUser , verifyUserAndAdmin} from "../Utils/verifyToken.js"
import { createExpenses, deleteExpenses, getExpensesBYid, getexpensesForFlocks } from "../controller/expensesController.js";

const router = express.Router();

router.get("/:flockiD/:expensesiD" , getExpensesBYid)
router.get("/:flockiD", getexpensesForFlocks )
router.post("/create/:id" , createExpenses);
router.delete("/delete/:flockiD/:expensesiD" , deleteExpenses );

export default router ; 