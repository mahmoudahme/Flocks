import  express  from "express";
import {createVaccination , getVaccinationForFlocks  } from "../controller/vaccinationController.js";

const router = express.Router();


router.get("/:flockiD", getVaccinationForFlocks)
router.post("/create/:id" , createVaccination);


export default router ; 