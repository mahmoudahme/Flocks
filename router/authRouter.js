import express from "express";
import {register , login } from "../controller/authController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

router.post("/register", register)
router.post("/login" , login)
router.post("/logout", verifyToken ,logout)


export default router
