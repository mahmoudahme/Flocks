import  express  from "express";
import { createConsumptionCategory, getConsumptionCategory } from "../controller/consumCategoryController.js";

const router = express.Router();


router.get("/",  getConsumptionCategory)
router.post("/create" , createConsumptionCategory);


export default router ; 