import { Router } from "express";
import { registerUser } from "../controller/registerUser.controller.js";
import {loginUser} from "../controller/login.controller.js"
import { logoutUser } from "../controller/logoutUser.controller.js";

const router = Router()

router.route("/").get((req, res)=>{
    res.render('../views/index')
})

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)


export const userRoute = router