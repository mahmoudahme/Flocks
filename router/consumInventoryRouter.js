import  express  from "express";
import {createconsumptionInventory , getconsumptionInventoryForUser  } from "../controller/consumInventoryController.js";

const router = express.Router();


router.get("/",  getconsumptionInventoryForUser)
router.post("/create" , createconsumptionInventory);


export default router ; 