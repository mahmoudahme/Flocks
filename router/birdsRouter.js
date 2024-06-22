import  express  from "express";
import {getBirdsOfFlocks , water} from "../controller/birdsController.js";

const router = express.Router();

router.get("/" , getBirdsOfFlocks)
router.get("/water" , water)

export default router ; 
