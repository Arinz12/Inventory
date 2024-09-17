require("dotenv").config()
var express = require('express');
const {createuser, User}=require("../serverfns/add");
const { createc } = require('../serverfns/addc');
const deluser = require('../serverfns/del');
var router = express.Router();
var path=require('path');
var fs=require("fs");
const session = require("express-session");
const getuser = require('../serverfns/get');
const p=path.join(__dirname,"..","pages","login.html");
const p2=path.join(__dirname,"..","pages","signup.html");
router.use(express.json())
router.use(express.urlencoded({ extended: false })); 
const MongoStore = require('connect-mongo');
const {query,body,validationResult}=require("express-validator")
const mongoose=require("mongoose")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());
passport.use(
  new LocalStrategy(
    async (username,password,done)=>{
      await mongoose.connect(process.env.DATABASEURL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,});
      try {
        const user= await User.findOne({name:username});
        if (!user){
return done(null,false,{message:"Username is incorrect"})
        }
        const match= password== user.password
        if(!match){
return done(null,false,{message:"password is incorrect"})
        }
        return done(null,user)
      } catch (error) {
       console.log(error) 
      }
    }
  )
)
passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
try {
  const user= await User.findById(id)
  done(null,user)
} catch (error) {
  done(error)
}
})





const allow=async (req,res,next)=>{
  console.log(req.session.view)
  if(req.isAuthenticated()){
    
  try {
    console.log(req.session)
    const ob= req.user
  res.render("logged",{objs:ob.item,pd:process.env.PASSID,obj:ob})
  } catch (error) {
    console.log(req.user)
    res.send(error)
  }}
  else{
    res.redirect("/signup")
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "ZONA'S INVENTORY" });
});
router.get("/login",(req,res)=>{
  res.send(fs.readFileSync(p,"utf8"))
})
router.get("/signup",(req,res)=>{
  res.send(fs.readFileSync(p2,"utf8"))
})
router.post("/logg",passport.authenticate("local",{
failureRedirect: "/login",
successRedirect:"/logged"
}))
router.get("/logged", allow)













router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
// validations to be done
const validations=[
  body('password')
.isLength({ min: 8 })
.withMessage('Password must be at least 8 characters long')
.matches(/\d/)
.withMessage('Password must contain at least one number')
.matches(/[A-Z]/)
.withMessage('Password must contain at least one uppercase letter'),

body("name").notEmpty()
.trim().isLength({min:5,max:15})
.withMessage("Length must be between 5 and 15 ") ,

body("email").notEmpty()
.isEmail()
.withMessage("Must be an email")
]




//creating user
router.post("/users/user",validations,async (req,res)=>{
const result=validationResult(req)
if (result.isEmpty()){
const aa=req.body.name;
const bb=req.body.password;
const cc=req.body.email;


console.log("on it")
await createuser(aa,bb,cc).catch(()=>{console.log("SOMETHING WENT WRONG")})
res.redirect("/login")
}
else{
  console.log(result)
  res.redirect("/signup")
}


})




//Adding items to inventory
router.post("/users/usercom/:iid",async (req,res)=>{
  
   const {iid}=req.params
   const a=req.body.product;
   const b= req.body.price;
  const c=req.body.company;
  try {
    await createc(iid,a,b,c)
  } catch (error) {
    console.log(error)
    res.status(500).send("An error occured with a function")
  }
console.log(req.isAuthenticated())

res.redirect("/logged")
})

//removing items
router.post("/users/loggedd/:sid",async (req,res)=>{
  const id=req.user._id;
const {sid} =req.params;
try {
 await deluser(id,sid);
res.redirect("/logged")
} catch (error) {
 res.send(error)
}

})

module.exports = router;
