import  express  from "express";
import { createFeedServied, getFeedServiedForFlocks } from "../controller/feedServiedController.js";

const router = express.Router();


router.get("/:flockiD", getFeedServiedForFlocks )
router.post("/create/:id" ,createFeedServied );


export default router ; 