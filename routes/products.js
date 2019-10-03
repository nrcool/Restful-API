const express=require("express")
const router = express.Router();
const Products=require("../mongooScheme/productsSchema")
router.get("/", (req, res, next) => {
    Products.find().then(products => {
        res.send(products)
    })
    /* res.status(200).json({
        message:"get request for products"
    }) */
})
router.post("/", (req, res, next) => {
    console.log(req.body)
    let product = new Products({
        itemname: req.body.itemname,
        price: req.body.price,
        quantity: req.body.quantity
    })
    product.save()
     res.status(200).json({
         postproduct:"Product is Placed"
     }) 
})
router.patch("/", (req, res, next) => {
    Products.findByIdAndUpdate(req.body.id,req.body,{new:true},(err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        }else{
            res.status(200).json({updateproduct:"Product is Updatted"})
        }
    })

})
router.delete("/", (req, res, next) => {
    Products.findByIdAndDelete(req.body.id,(err, db) => {
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        }else{
            res.status(200).json({deleteproduct:"Product is Deleted"})
        }
    })
})

module.exports=router