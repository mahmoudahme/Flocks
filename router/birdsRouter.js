import  express  from "express";
import {getBirdsOfFlocks , water , food} from "../controller/birdsController.js";

const router = express.Router();

router.get("/" , getBirdsOfFlocks)
router.get("/water" , water)
router.get("/food/:flockId" , food)
export default router ; 
