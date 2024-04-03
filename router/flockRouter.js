import  express  from "express";
import {verifyAdmin ,verifyUser , verifyUserAndAdmin} from "../Utils/verifyToken.js"
import {createFlocks, deleteFlocks, getFlockBid, getFlocks } from "../controller/flockController.js";

const router = express.Router();

router.get("/" , getFlocks)
router.get("/:id" , getFlockBid)
router.post("/create" ,  createFlocks);
router.delete("/delete/:id" ,  deleteFlocks);

export default router ; 