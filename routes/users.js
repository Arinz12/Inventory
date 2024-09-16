var express = require('express');
var router = express.Router();
const {createuser, User}=require("../serverfns/add");
const { createc } = require('../serverfns/addc');
const deluser = require('../serverfns/del');
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const  mongoose  = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
mongoose.set("strictQuery", false)
const pool = new Pool({
  // add your configuration
});
// mongoose.connect(process.env.DATABASEURL ,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,});
// const MongoStore = require('connect-mongo')

// router.use(session({
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   secret: 'cats',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }));

//router.use(passport.session());



router.use((req,res,next)=>{
if(!req.isAuthenticated()){
  res.redirect("/login")
}
next()
 })
/* GET user listing. */

module.exports = router;
