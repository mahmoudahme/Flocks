import  express  from "express";
import { createFeedServied, getFeedServiedForFlocks , deleteFeedServied } from "../controller/feedServiedController.js";

const router = express.Router();


router.get("/:flockiD", getFeedServiedForFlocks )
router.post("/create/:id" ,createFeedServied );
router.delete("/delete/:flockiD/:feedServedID" , deleteFeedServied );


export default router ; 
