import  express  from "express";
import {createIncomeCategory , getIncomeCategory  } from "../controller/incomeCategoryController.js";

const router = express.Router();


router.get("/",  getIncomeCategory)
router.post("/create" , createIncomeCategory);


export default router ; 