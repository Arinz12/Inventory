require("dotenv").config()
const mongoose=require("mongoose");
const {ObjectId}= require("mongodb")
const { User } = require("./add");
mongoose.set("strictQuery", false)

async function deluser(aaa,aa){
    await mongoose.connect(process.env.DATABASEURL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,});
        
try {
   //const userdoc= await User.findOne({_id:ObjectId(aaa)});
   const result = await User.updateOne(
    {_id:ObjectId(aaa)},
    { $pull: { item: { _id:ObjectId(aa)}  } }
  );
  console.log("an item was removed")

} catch (error) {
    console.log(error)
}
}
    module.exports=deluser;