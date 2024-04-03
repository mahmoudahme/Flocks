import  express  from "express";
import {createproductionInventory , getproductionInventoryForUser  } from "../controller/ProductionInventoryController.js";

const router = express.Router();


router.get("/",  getproductionInventoryForUser)
router.post("/create" , createproductionInventory);


export default router ; 