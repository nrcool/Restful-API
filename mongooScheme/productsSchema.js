const mongoose=require("mongoose");

const products=mongoose.Schema({
   id:mongoose.Schema.Types.ObjectId,
   itemname:{type:String,required:true},
   price:{type:String,required:true},
   quantity:{type:String,required:true}
})

const Products=mongoose.model("products",products)

module.exports=Products