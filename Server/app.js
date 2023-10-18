const express = require("express");
const cors = require('cors');
const {v4:uuidv4} = require('uuid');
const stripe = require('stripe') ("sk_test_51Ns3JgSIi3K60iBfMRRGfY2990CSckLD3wvvmPiVupxHMU9pH9qktIEGhOIj4TgZYZfftNGr9VMXUBVnPbXYJt1m00fRIu7IdC")

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("It is Working")
});

app.post("/payment",(req,res)=>{
   const {product,token} = req.body;
   const transactionKey = uuidv4();
   return stripe.customers.create({
    email:token.email,
    source:token.id
   }).then((customer)=>{
    stripe.charges.create({
        amount:product.price,
        currency:"inr",
        customer:customer.id,
        receipt_email:token.email,
        description:product.name
    }).then((result)=>{
        res.json(result)
    }).catch((err) =>{
        console.log(err);
    })
   })

})

app.listen(5000,()=>{
    console.log("Server has been in start 5000")
})