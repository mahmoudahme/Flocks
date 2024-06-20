import  express  from "express";
import {expensesFin} from "../controller/expFiniController.js";

const router = express.Router();

router.get("/:flockiD" , expensesFin)

export default router ; 
