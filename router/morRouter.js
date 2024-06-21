import  express  from "express";
import {moratalitiesDead} from "../controller/moratalityController.js";

const router = express.Router();

router.get("/:flockiD" , moratalitiesDead)

export default router ; 
