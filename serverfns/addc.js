require("dotenv").config()
const mongoose=require("mongoose");
const { User } = require("./add");
const {ObjectId} =require("mongodb")
mongoose.set("strictQuery", false)

 

  

  async function createc(i,a,b,c){
await mongoose.connect(process.env.DATABASEURL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true},(err)=>{
      if(!err){console.log("item upload in progress")}
    else{console.log("a problem occured")}
    });
    const update=  {
      $push: {
        item: {
          product: a,
          price: b,
          company: c
        }
      }
    };
  
    try {
      await User.updateOne({_id:ObjectId(i)} , update)
    } catch (error) {
      console.log(error)
    }
   
console.log("user record updated successfully");
//await mongoose.connection.close(false).catch(()=>{"connection refused to close"})
}
module.exports={createc};