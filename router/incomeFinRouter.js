import  express  from "express";
import {getBirdsOfFlocks} from "../controller/birdsController.js";

const router = express.Router();

router.get("/" , getBirdsOfFlocks)

export default router ; 
