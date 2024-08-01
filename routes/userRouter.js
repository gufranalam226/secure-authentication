import { Router } from "express";

const router = Router()

router.route("/").get((req, res)=>{
    res.render("../views/index")
}
)
router.route("/login").post()
router.route("/register").post()

export const userRouter = router;