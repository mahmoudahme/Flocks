import  express  from "express";
import {createMedician , getMedicianForFlocks , deleteMedician  } from "../controller/medicianController.js";

const router = express.Router();


router.get("/:flockiD", getMedicianForFlocks)
router.post("/create/:id" , createMedician);
router.delete("/delete/:flockiD/:MedicianID" , deleteMedician );

export default router ; 
