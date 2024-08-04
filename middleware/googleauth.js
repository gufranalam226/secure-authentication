// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import GoogleStrategy from "passport-google-oauth2"
import { User } from "../schema/user.schema.js";
import passport from 'passport'
import mongoose from "mongoose";

const GOOGLE_CLIENT_ID = "752164098138-gigdspltd85765rt1omlf1m2l5gjniim.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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"


const findOrCreate = async (profile, done)=>{
    const user = await User.findOne({ googleId: profile.id });
    console.log("checking user details in DB")
    if(user){
        return done(null, user)
    }
    const newUser = new User({
        fullname: profile.name,
        username:profile.id,
        gender:profile.gender,
        phoneNumber :null,
        email : profile.emails, 
        password: "google"

    })
    console.log("creating new user")
    newUser.save()
    
    return done(null, newUser)
    
}

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/auth/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    findOrCreate({ googleId: profile.id }, function (err, user) {
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