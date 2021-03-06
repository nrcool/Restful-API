const express = require("express")
const router = express.Router();
const Users = require("../mongooScheme/usersSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
router.get("/", (req, res, next) => {
    Users.find({}).then(users=>{
        res.send(users)
    })
})
router.delete("/",(req,res,next)=>{
    Users.deleteOne({username:req.body.username}).then((doc)=>{
        res.json({deleteuser:"DELETED"})
    })
})
router.post("/", (req, res, next) => {
    console.log(req.body)
    Users.findOne({ username: req.body.username }).then(user => {
        if (user === null) {
            Users.findOne({ email: req.body.email }).then(newuser => {
                if (newuser === null) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            const user = new Users({
                                username: req.body.username,
                                password: hash,
                                email: req.body.email
                            })
                            user.save().then((doc) => {
                                console.log(doc, "SAVEDDDDDD::::::::::::::")
                                res.json({
                                    success: true
                                })
                            });
                        }
                    })
                } else {
                    res.status(404).json({
                        error: "Email already exist"
                    })
                }
            })

        } else {
            res.status(404).json({
                error: "username already exist"
            })
        }
    })

})
router.post("/userlogin",(req,res)=>{
    console.log(req.body)
    Users.findOne({ username: req.body.username }).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                jwt.sign({ username: user.username, userid: user._id }, process.env.MY_BCRYPT, { expiresIn: "1h" }, (err, token) => {

                    if (err) {
                        res.status(500).json({ error: err.message })
                    } else if (user.username === "admin") {
                        res.json({ userlogin: true, unorpw: "", token: { token: token, username: req.body.username }, admin: true, loggedin: user.username })
                    }
                    else { res.json({ userlogin: true, unorpw: "", token: { token: token, username: req.body.username }, admin: false, loggedin: user.username }) }



                })

            } else {
                res.json({ userlogin: false, unorpw: "username or password incorrect", token: "", admin: false })
            }
        })


    });
})
router.post("/userlogins", (req, res) => {
    console.log(req.body)
    let token = JSON.parse(req.headers.token)
    console.log(token)
    if (token.token) {
        jwt.verify(token.token, process.env.MY_BCRYPT, (err, result) => {
            console.log("result... ", result)
            if (err) {
                console.log("server ........", err)
            } else if (result.username === "admin") {
                res.json({ userlogin: true, unorpw: "", auth: { token: token, username: result.username }, admin: true, loggedin: result.usernam })
            }
            else { res.json({ userlogin: true, unorpw: "", auth: { token: token, username: result.username }, admin: false, loggedin: result.username }) }
        })
    }
    /*   router.get("/userlogin", (req, res) => {
          res.json({ userlogin: true })
      }) */

})
router.patch("/:userID", (req, res, next) => {
    const userid = req.body.userID;
    res.status(200).json({
        message: "update request for users",
        id: userid
    })
})
router.delete("/:userID", (req, res, next) => {
    const id = req.body.userID;
    res.status(200).json({
        message: "delete request for users",
        id: id
    })
})

module.exports = router