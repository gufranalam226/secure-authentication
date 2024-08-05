// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import GoogleStrategy from "passport-google-oauth2"
import { User } from "../schema/user.schema.js";
import passport from 'passport'
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
  path : "./.env"
})

const findOrCreate = async (profile, done)=>{
  // console.log(profile)
    const user = await User.findOne({ email : profile.email });
    if(user){
        return done(null, user)
    }
    const newUser = await User.create({
        fullname: profile.displayName,
        username:profile.id,
        gender:profile?.gender || "Unspecified",
        phoneNumber :"0000",
        email : profile.email, 
        password: "undefined"

    })
    
    newUser.save()
    
    return done(null, newUser)
    
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/auth/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    findOrCreate(profile, function (err, user) {
      return done(err, user);
    });
  }
)); 

passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser((user, done)=>{
    done(null, user)
})


export {passport}