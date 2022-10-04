const fs = require ("fs")


class Carrito {
    constructor (archivo){
        this.archivo = archivo
    }
      
 
async crearCar(carrito){
    
        const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
        const carritos = JSON.parse(data)
        const crearCar = {
            id : carritos.length + 1,
            productos:[],
            total:0
        }  
        carritos.push(crearCar)
        const productosString = JSON.stringify(carritos)
        await fs.promises.writeFile(`${this.archivo}`,productosString)
        console.log("Creo un nuevo carrito")
        console.log(carritos)
        return carritos
        }
    





// async getById(id){
//     const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
//     carritos = JSON.parse(data)
//     const objeto= objetos.find((objeto) => objeto.id== id )
//         if (objeto){
//             return (objeto)
//             }
//         else{
//             throw new Error ("Producto no encontrado!!")
//             }
// }


async getAll(){
    try{
        const data= await fs.promises.readFile(`${this.archivo}`, "utf-8")
        const carritos = JSON.parse(data)
        return carritos
        }
    catch(err){
        console.log(err)
    }
}




async deleteById(id){
    try{
        const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
        const parse = JSON.parse(data)
        const filtro= parse.filter((objeto) => objeto.id !== id )
        const string = JSON.stringify(filtro)
        fs.promises.writeFile(`${this.archivo}`,string)
        console.log(filtro)
        }
    catch(err){
        console.log("No se encontro ID")
    }
}
}


// updateById(id, objetoNuevo) {
//     const data = fs.readFileSync(this.archivo, "utf-8");
//     let dataParseada = JSON.parse(data);
//     let productoViejo = dataParseada.find((objeto) => objeto.id === id);
//     let mensaje = "Se reemplazo el producto";
//     if (productoViejo === undefined) {
//       throw { msg: "404 Not found" };
//     }
//     let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
//     productoViejo = { id, ...objetoNuevo };
//     productosFiltrados.push(productoViejo);
//     fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
//     return mensaje;
//   }
// }




module.exports = Carrito

