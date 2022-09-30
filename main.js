const express = require("express")
const app = express()
const productosRouter= require ("./routers/productosRouter")
const carritoRouter= require ("./routers/carritoRouter")

//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",productosRouter)
app.use("/api/carrito",carritoRouter)
app.use(express.static("views"))



app.get("/",(req,res)=>{
 res.send("Hola")

})



const server = app.listen(8080,()=>{

})