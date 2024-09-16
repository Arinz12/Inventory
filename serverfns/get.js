require("dotenv").config()
const mongoose=require("mongoose");
const { User } = require("./add");
mongoose.set("strictQuery", false)

async function getuser(){
    await mongoose.connect(process.env.DATABASEURL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,});
 const objs= await User.findOne();
    console.log("user found");
    await mongoose.connection.close(false).catch(()=>{"connection refused to close"})
    return objs;
    }
    module.exports=getuser;
    