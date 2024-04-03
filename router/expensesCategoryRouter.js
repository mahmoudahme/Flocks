import  express  from "express";
import {createExpensesCategory , getExpensesCategory  } from "../controller/expensesCategoryController.js";

const router = express.Router();


router.get("/",  getExpensesCategory)
router.post("/create" , createExpensesCategory);


export default router ; 