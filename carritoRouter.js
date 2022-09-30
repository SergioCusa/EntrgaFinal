const express = require("express")
const{Router}=express 
const router = Router()
const multer = require("multer")
const Carrito = require("./classCar")
const cont = new Carrito("./carrito.json")

// *Multer configurado
const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
      cb(null,file.fieldname)
    },
    destination:(req,file,cb)=>{
      cb(null,"uploads")
    },
})

  
  // *Multer ejecutado
const upload = multer({storage})
  
  //*Declaracion de rutas
router.get("/", async (req,res)=>{
  const data = await cont.getAll()
    res.send(data)
})
  

router.get("/:id",async (req,res)=>{
    const {id} = req.params
    try {
      const data = await cont.getById(id)
        res.send(data)
    }catch(e){
        res.status(404).send({error:true, msj: e.message})
      }    
})



router.post("/", async (req,res)=>{
  const user = true
  if (user){
    await cont.crearCar()
    const data = await cont.getAll()
    res.send(data)
    }else{
      res.send("usted no es admin")
    }
})
  
    
router.put("/:id", (req, res) => {
  const user = true
    if (user){
      try {
        const { id } = req.params
        const prodNuevo = req.body
        const idInt = parseInt(id)
        res.send(cont.updateById(idInt, prodNuevo))
        } catch (err) {
        res.status(404).send(err.msg)
          }
    }else{
      res.send("Usted no es admin")
    }
})
    

router.delete("/:id",(req,res)=>{
  const user = true
    if (user){
      try {
      const { id } = req.params
      res.send(cont.deleteById(parseInt(id)))
      }catch(err){
    res.status(404).send(err.msg)
            }
    }else{
      res.send("Usted no es admin")
      }
})
  
  
  module.exports = router  