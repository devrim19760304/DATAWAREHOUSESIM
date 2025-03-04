const express=require("express");
const PORT=3000;
const path=require("path");

//import index router 
const indexRouter=require("./routes/index")
//import products router 
const productsRouter=require("./routes/products")
//import customers router 
const customersRouter=require("./routes/customers")
//import sales router 
const salesRouter=require("./routes/sales")


const app=express();

//add views folder
app.use(express.static(path.join(__dirname,"views")))
//add public folder 
app.use(express.static(path.join(__dirname,"public")));

//use index router
app.use("/",indexRouter)
//use products router
app.use("/products",productsRouter)
//use customers router
app.use("/customers",customersRouter)
//use sales router 
app.use("/sales",salesRouter)



app.listen(PORT,()=> {
    console.log(`listening at port ${PORT}`)
})

module.exports=app;