const express=require("express");
const router=express.Router();
const path=require("path");
const axios=require("axios");

router.get("/",(req,res)=> {

    res.sendFile(path.join(__dirname,"../views/customers.html"))
})

//get customers 
//create an empty array 
let customers=[];
let customersObject= {
    results:[]
}

router.get("/getcustomers",async(req,res)=> {
    const personNumber=200;
    //see if we transfered correctly
    //console.log("----------it is customers",customers.length);
    if (customersObject.results.length>0) {
        return res.status(200).json(customersObject);
    }
    const url=`https://randomuser.me/api/?results=${personNumber}`;
    try {
        const response=await axios.get(url);
        const data=await response.data;
        //transfer 500 people to my customers
        //customers=data;
        customersObject=data;     
 
        res.status(200).json(data)
    } catch(error) {
        res.status(500).json({
            statusCode:"500",
            message:"failed to fetch"
        })
    }
})




module.exports=router;