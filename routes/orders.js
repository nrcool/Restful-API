const express = require("express")
const router = express.Router();
const Orders = require("../mongooScheme/ordersSchema")
const Products = require("../mongooScheme/productsSchema")

router.post("/userorders", (req, res, next) => {
    console.log(req.body)
    Orders.find({ username: req.body.username }).then(orders => {
        res.send(orders)
    })
    /* res.status(200).json({
        message:"get request for orders"
    }) */
})
router.post("/", (req, res, next) => {
    Products.findOne({ itemname: req.body.itemname }, (err, item) => {

       
        if (item==null) {
            console.log("errrrrrrrrrrrrrrrrrrrrrrrr",err)
            res.status(404).json({ postorder: "product not avaiable" })
        } else {
            console.log(item)
            item.quantity = item.quantity - req.body.quantity;
            
            if (item.quantity >= 0) {
                let order = new Orders({
                    itemname: req.body.itemname,
                    username: req.body.username,
                    price: req.body.price,
                    quantity: req.body.quantity
                })
                order.save()
                console.log(item)
                Products.findByIdAndUpdate(item._id, item,(err,result)=>{
                    console.log("final ",result)
                    res.status(200).json({
                    postorder: "Order is Placed"
                })
                })
                
            }
        }
    })

})
router.patch("/", (req, res, next) => {
    Orders.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        } else {
            res.status(200).json({ updateorder: "ORDER is Updatted" })
        }
    })

})
router.delete("/", (req, res, next) => {
    Orders.findByIdAndDelete(req.body.id, (err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        } else {
            res.status(200).json({ deleteorder: "ORDER is Deleted" })
        }
    })
})

module.exports = router