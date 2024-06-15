import  express  from "express";
import {createVaccination , getVaccinationForFlocks , deleteVaccination } from "../controller/vaccinationController.js";

const router = express.Router();


router.get("/:flockiD", getVaccinationForFlocks)
router.post("/create/:id" , createVaccination);
router.delete("/delete/:flockiD/:VaccinationID" , deleteVaccination );

export default router ; 
