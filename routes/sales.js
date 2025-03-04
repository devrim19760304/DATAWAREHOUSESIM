const express=require("express");
const router=express.Router();
const path=require("path");
const axios=require("axios")

router.get("/",(req,res)=> {

    res.sendFile(path.join(__dirname,"../views/sales.html"))
})

router.get("/getsales",async(req,res)=> {

    const customersUrl="http://localhost:3000/customers/getcustomers";
    const productsUrl="http://localhost:3000/products/getproducts";
    let datawareHouse=[] //this will be populated by transactions 

    try {
        const customersData=await axios.get(customersUrl);
        const productsData=await axios.get(productsUrl);
        const customers=await customersData.data.results;
        const products=await productsData.data;
        //to see if we could grab correct data fields
        console.log("customer data",customers[0].name.first)
        console.log("products data",products[0].title)

        const numberTransactions=500;
        const productNumber=products.length;
        const customerNumber=customers.length;
        //transactions 
        for (var i=0;i<numberTransactions;i++) {
            let purchaseNumber=Math.floor(Math.random()*10)+1

            let randomCustomer=customers[Math.floor(Math.random()*customerNumber)];
            let randomProduct=products[Math.floor(Math.random()*productNumber)]
            //console.log(`transaction no: ${i}---${randomCustomer.name.first}::::${randomProduct.title}`)
            let randomTransaction= {
                id:i,
                customerName:`${randomCustomer.name.first} ${randomCustomer.name.last}`,
                productName:randomProduct.title,
                productPrice:randomProduct.price,
                productAmount:purchaseNumber, //let us create it dynamically 
                totalPayment:randomProduct.price*purchaseNumber,
                productCategory:randomProduct.category,
                customerGender:randomCustomer.gender,
                customerCity:randomCustomer.location.city,
                customerState:randomCustomer.location.state,
                customerCountry:randomCustomer.location.country
            }
            //push to datawarehouse
            datawareHouse.push(randomTransaction)
            
        }
        const testObject=datawareHouse[5];
        console.log(testObject);

        res.status(200).json({
            statusCode:"200",
            message:"Success",
            datawareHouse
        })
    }catch(error) {
        res.status(500).json({
            statusCode:"500",
            message:`Error ${error}`

        })
    }
    

})




module.exports=router;