import { Router } from "express";
import { registerUser } from "../controller/registerUser.controller.js";
import {loginUser} from "../controller/login.controller.js"
import { logoutUser } from "../controller/logoutUser.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.middkeware.js"
import {passport } from  '../middleware/googleauth.js'
import gitpassport from "../middleware/githubAuth.js";

const router = Router()

router.route("/").get((req, res)=>{
    res.render('../views/index')
})

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJwt, logoutUser)
router.route("/google/auth").get(passport.authenticate('google', {scope: ['email', 'profile']}))
router.route("/login/auth/callback").get(passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/error'
}))
router.route("/user").get((req, res)=>{
    res.send("you have logged in successfully")
})
router.route("/error").get((req, res)=>{
    res.send("You have got some error")
})


router.route("/github/auth").get(gitpassport.authenticate("github"))

router.route("/github/callback").get(gitpassport.authenticate("github" , {
    successRedirect : "/user",
    failureRedirect: "/error"
}) )
export const userRoute = router