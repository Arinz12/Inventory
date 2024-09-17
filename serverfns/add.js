require("dotenv").config()
const mongoose=require("mongoose")
const bcrypt= require("bcryptjs")
mongoose.set("strictQuery", false)
 
const itemSchema = new mongoose.Schema({
    product: { type: String },
    price: { type: Number},
    company: { type: String }
  });
  const userSchema= new mongoose.Schema(
    {
      name:{type:String},
      password:{type:String},
      email:{type:String},
      item:[itemSchema]
    }
  )
  const User = mongoose.model('User', userSchema);

  async function createuser(a,b,c){
await mongoose.connect(process.env.DATABASEURL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,});

  const user=new User({
    name:a,
    password:bcrypt.hashSync(b,10) ,
    email:c,
    item:[]

  });
await user.save();
console.log("user saved successfully");
await mongoose.connection.close(false).catch(()=>{"connection refused to close"})
}
module.exports={createuser,User};