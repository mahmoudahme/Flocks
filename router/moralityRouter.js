import  express  from "express";
import {createMorality , getMoralityForFlocks  } from "../controller/moralityController.js";

const router = express.Router();


router.get("/:flockiD", getMoralityForFlocks )
router.post("/create/:id" , createMorality);


export default router ; 