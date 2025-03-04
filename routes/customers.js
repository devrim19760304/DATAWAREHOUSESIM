const express=require("express");
const router=express.Router();
const path=require("path");
const axios=require("axios");

router.get("/",(req,res)=> {

    res.sendFile(path.join(__dirname,"../views/customers.html"))
})

router.get("/getcustomers",async(req,res)=> {
    const personNumber=400;

    const url=`https://randomuser.me/api/?results=${personNumber}`;
    try {
        const response=await axios.get(url);
        const data=response.data;
        //console.log(data);
        res.status(200).json(data)
    } catch(error) {
        res.status(500).json({
            statusCode:"500",
            message:"failed to fetch"
        })
    }
})




module.exports=router;