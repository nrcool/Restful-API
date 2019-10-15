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
            res.status(404).json({ postorder: "product not avaiable" })
        } else {
         
            item.quantity = item.quantity - req.body.quantity;
            
            if (item.quantity >= 0) {
                let order = new Orders({
                    itemname: req.body.itemname,
                    username: req.body.username,
                    price: Number(item.price)* Number(req.body.quantity),
                    quantity: req.body.quantity
                })
                order.save()
                Products.findByIdAndUpdate(item._id, item,(err,result)=>{
                   /*  console.log("final ",result) */
                    res.status(200).json({
                    postorder: "Order is Placed"
                })
                })
                
            }
        }
    })

})
router.patch("/", (req, res, next) => {
  Orders.findById(req.body.id,(err,db)=>{
      if(err){
          res.status(404).json({
              error:"item not found"
          })
      }
      console.log(db)
      Products.findOne({itemname:db.itemname},(err,item)=>{
          item.quantity=Number(item.quantity)+Number(db.quantity)
          item.quantity=Number(item.quantity)-Number(req.body.quantity)
          item.save().then(()=>{
              db.quantity=Number(req.body.quantity)
              db.save()
              res.status(200).json({
                updateorder: "Order is Updated"
            })
          })
      })

  })

})
router.delete("/", (req, res, next) => {

    Orders.findOne({itemname:req.body.itemname}, (err, db) => {
        console.log("from order delete",db);
        if (err) {
            res.status(500).json({
                message: "error with server"
            })
        } else {
            Products.findOne({itemname:req.body.itemname},(err,item)=>{
                console.log("from products",item);
                if(err){
                    res.status(500).json({
                        error:"internal server error"
                    })
                }else{
                    item.quantity=Number(item.quantity) +  Number(db.quantity) ;
                    item.save().then(()=>{
                        db.remove()
                            res.status(200).json({ deleteorder: "ORDER is Deleted" })
                        }
                    )
                     
                }
            })
           
        }
    })
})

module.exports = router