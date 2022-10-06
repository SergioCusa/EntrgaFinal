const express = require("express")
const{Router}=express 
const router = Router()
const multer = require("multer")
const Carrito = require("../clases/classCar")
const cont = new Carrito("./carrito.json")
const Contenedor = require("../clases/classProd")
const contenedor = new Contenedor ("./productos.json")

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

// router.post("/productos",async (req,res)=>{
//   res.send("Hola")
//   const user = true
//   if (user){
//     const {id} = req.params
//     const prodNuevo = await contenedor.getById
//     const data = await cont.agregarProdCarr(req.params.id,prodNuevo)
//     res.send(data)
//   }else{
//     return "No se pudo completar la accion"
//   }
// })
  
    
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
    

router.delete("/:id",async(req,res)=>{
  const user = true
    if (user){
      try {
      const { id } = req.params
      await cont.deleteById(parseInt(id))
      const data = await cont.getAll()
      res.send(data)
      }catch(err){
    res.status(404).send(err.msg)
            }
    }else{
      res.send("Usted no es admin")
      }
})
  
  
  module.exports = router  