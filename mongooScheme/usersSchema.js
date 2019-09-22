const mongoose=require("mongoose");

const users=mongoose.Schema({
   username:{type:String,required:true},
   password:{type:String,required:true},
   email:{type:String,required:true}
})

const Users=mongoose.model("users",users)

module.exports=Users
