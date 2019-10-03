const mongoose=require("mongoose");

const orders=mongoose.Schema({
   id:mongoose.Schema.Types.ObjectId,
   username:String,
   itemname:{type:String,required:true},
   price:{type:String,required:true},
   quantity:{type:String,required:true}
})

const Orders=mongoose.model("orders",orders)

module.exports=Orders