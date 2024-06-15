import  express  from "express";
import {createMorality , getMoralityForFlocks , deletemorality } from "../controller/moralityController.js";

const router = express.Router();


router.get("/:flockiD", getMoralityForFlocks )
router.post("/create/:id" , createMorality);
router.delete("/delete/:flockiD/:moralityID" , deletemorality );


export default router ; 
