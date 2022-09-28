const express = require("express")
const app = express()
const productosRouter= require ("./productosRouter")

//*Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/productos",productosRouter)
app.use(express.static("views"))



app.get("/",(req,res)=>{
 res.send("Hola")

})



const server = app.listen(8080,()=>{

})