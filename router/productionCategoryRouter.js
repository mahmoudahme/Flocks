import  express  from "express";
import {createProductionCategory , getProductionCategory } from "../controller/ProductionCategoryController.js";

const router = express.Router();


router.get("/",getProductionCategory )
router.post("/create" , createProductionCategory);


export default router ; 