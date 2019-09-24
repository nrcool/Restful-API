const express = require("express")
const router = express.Router();
const Orders = require("../mongooScheme/ordersSchema")

router.get("/", (req, res, next) => {
    Orders.find().then(orders => {
        res.send(orders)
    })
    /* res.status(200).json({
        message:"get request for orders"
    }) */
})
router.post("/", (req, res, next) => {
    const order = new Orders({
        itemname: req.body.itemname,
        price: req.body.price,
        quantity: req.body.quantity
    })
    order.save()
     res.status(200).json({
         postorder:"Order is Placed"
     }) 
})
router.patch("/", (req, res, next) => {
    Orders.findByIdAndUpdate(req.body.id,req.body,{new:true},(err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        }else{
            res.status(200).json({updateorder:"ORDER is Updatted"})
        }
    })

})
router.delete("/", (req, res, next) => {
    Orders.findByIdAndDelete(req.body.id,(err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        }else{
            res.status(200).json({deleteorder:"ORDER is Deleted"})
        }
    })
})

module.exports = router