const express=require("express");
const app =express();
const bodyParser=require("body-parser")
const morgen=require("morgan")
const port=process.env.PORT || 4000;
const usersRoute=require("./routes/users")
const ordersRoute=require("./routes/orders")
const productsRoute=require("./routes/products")
const mongoose=require("mongoose")
const path=require("path")
const cors=require("cors")
require("dotenv").config();


mongoose.connect("mongodb://localhost:27017/RestAPI",{ useUnifiedTopology: true , useNewUrlParser: true  },()=>{console.log(("db connected"))})
app.use(cors())
app.use(express.static("client"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgen("dev"))
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","public","index.html"))
})
app.use("/users",usersRoute)
app.use("/orders",ordersRoute)
app.use("/products",productsRoute)



app.listen(port,()=>{
    console.log("server running on port "+port);
})