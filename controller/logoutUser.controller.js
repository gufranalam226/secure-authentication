import { asyncHandler } from "../src/asyncHandler.js";
import {User} from "../schema/user.schema.js"
import {verifyJwt} from "../middleware/verifyJwt.middkeware.js"


const logoutUser = asyncHandler(async (req, res)=>{
    console.log(req)
    
    await User.findOneAndUpdate (
        {_id : req.user._id},
        {
            $unset: {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
    .cookie("accessToken","", options)
    .cookie("refreshToken","", options)
    .send("You have logged out successfully")
})

export {logoutUser}