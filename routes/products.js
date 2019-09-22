const express=require("express")
const router = express.Router();
const Products=require("../mongooScheme/productsSchema")
router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"get request for Products"
    })
})
router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:"post request for Products"
    })
})
router.patch("/:productID",(req,res,next)=>{
    const id=req.body.productID;
    res.status(200).json({
        message:"patch request for orders",
        id:id
    })
})
router.delete("/:productID",(req,res,next)=>{
    const id=req.body.productID;
    res.status(200).json({
        message:"delete request for orders",
        id:id
    })
})

module.exports=router