const express=require("express")
const router = express.Router();
const Orders=require("../mongooScheme/ordersSchema")

router.get("/",(req,res,next)=>{
    Orders.find().then(orders=>{
        res.send(orders)
    })
    /* res.status(200).json({
        message:"get request for orders"
    }) */
})
router.post("/",(req,res,next)=>{
    const order=new Orders({
        itemname:req.body.itemname,
        price:req.body.price,
        quantity:req.body.quantity
    })
    order.save()
   /*  res.status(200).json({
        message:"post request for orders"
    }) */
})
router.patch("/:orderID",(req,res,next)=>{
    const id=req.body.orderID;
    res.status(200).json({
        message:"update request for orders",
        id:id
    })
})
router.delete("/:orderID",(req,res,next)=>{
    const id=req.body.orderID;
    res.status(200).json({
        message:"delete request for orders",
        id:id
    })
})

module.exports=router