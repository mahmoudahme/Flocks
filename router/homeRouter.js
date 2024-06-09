import  express  from "express";

import {Data } from "../controller/homeController.js";

const router = express.Router();

router.get("/" , Data)

export default router ; 