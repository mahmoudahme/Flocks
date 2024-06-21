import  express  from "express";
import {moratalitiesDead} from "../controller/moratalityController.js";

const router = express.Router();

router.get("/" , moratalitiesDead)

export default router ; 
