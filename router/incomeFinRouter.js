import  express  from "express";
import {InconmeFin} from "../controller/incomeFinController.js";

const router = express.Router();

router.get("/:flockiD" , InconmeFin)

export default router ; 
