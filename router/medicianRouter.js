import  express  from "express";
import {createMedician , getMedicianForFlocks  } from "../controller/medicianController.js";

const router = express.Router();


router.get("/:flockiD", getMedicianForFlocks)
router.post("/create/:id" , createMedician);


export default router ; 