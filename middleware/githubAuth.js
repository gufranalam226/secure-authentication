import GitHubStrategy from 'passport-github';
import passport from 'passport';
import dotenv from "dotenv"
import { User } from '../schema/user.schema.js';

dotenv.config({
    path: "./.env"
})
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const findOrCreate = async (profile, done)=>{
  console.log(profile)
    const user = await User.findOne({ email : profile.email });
    if(user){
        return done(null, user)
    }
    const newUser = await User.create({
        fullname: profile.displayName || "undefined",
        username:profile.username,
        gender:profile?.gender || "Unspecified",
        phoneNumber :"0000",
        email : profile.email || "Undefined", 
        password: "undefined"

    })
    
    newUser.save()
    
    return done(null, newUser)
    
}

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    findOrCreate(profile, function (err, user) {
      return cb(err, user);
    });
  }
));


export default passport