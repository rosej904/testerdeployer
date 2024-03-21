const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const jwt_secret="supersecret"
const bcrypt = require("bcrypt")

const {getAllCustomers,getCustomerByUsername} = require("../db")

router.get("/", async (req, res)=>{
    try{
        const customers = await getAllCustomers()
        res.send({customers})
    }catch(error){
        console.log("oh nose! couldn't get all customers", error)
    }
})

// router.get("/", async (req, res)=>{
//     res.send("this is the root of customers")
// })

router.post("/login", async (req, res)=>{
    try{
        const {username,password} = req.body
        const customer = await getCustomerByUsername(username)
        console.log(customer)
        let customerObject = customer[0]
        let customerPassword = customerObject["password"]

        
        if(await bcrypt.compare(password, customerPassword)){
            // console.log("successfully logged in!")
            const token = jwt.sign({customerid: customerObject["id"],username: customerObject["username"]},jwt_secret,{expiresIn:"1w"})
            console.log(token)
            res.send({message:"successfully logged in!", token:token})
        }else{
            res.send({message:"oh nose! username and passwords don't match"})
        }

    }catch(error){
        console.log("oh nose! couldn't login", error)
    }
})

module.exports = router
