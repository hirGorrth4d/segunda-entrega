const express = require("express")
const ContenedorArchivo = require("../src/contenedores/contenedorArchivo")
const contenedorFirebase = require("../src/contenedores/contenedorFirebase")
const contenedorSql = require("../src/contenedores/contenedorSql")
const ContenedorMemoria = require("../src/contenedores/contenedorMemoria")
const contenedorMongo = require("../src/contenedores/contenedorMongo")
const {Router} = express

const app = express()
const port = process.env.PORT || 8080


const prodRouter = new Router()
const cartRouter = new Router()

const productApi = new ContenedorArchivo()
const cartApi = new ContenedorMemoria()

prodRouter.get("/", async(req, res) => {
    const productos = await productApi.listAll()
    res.send(productos)
})
prodRouter.get("/:id", async (req,res)=>{
    res.send(await productApi.listID(req.params.id))
})

prodRouter.post("/", async (req, res) => {
    res.json(await productApi.saveObject(req.body))
})
prodRouter.put("/:id", async (req,res)=>{
    res.json(await productApi.update(req.body))
})
prodRouter.delete("/:id", async (req,res)=>{
    res.json(await productApi.delete(req.params.id))
})

cartRouter.get("/", async (req,res)=> {
    res.send(await cartApi.listAll())
})
cartRouter.post("/", async (req,res)=>{
    res.send(await cartApi.save(req.body))
})
cartRouter.delete("/:id", async (req,res)=>{
    res.send( await cartApi.delete(req.params.id))
})

cartRouter.get("/:id/productos", async (req,res) => {
    const carrito = await cartApi.listId(req.params.id)
    res.send(carrito)
})

cartRouter.post("/:id/productos", async (req,res)=>{
    const carrito = await cartApi.listId(req.params.id)
    const productos = await productApi.listID(req.body.id)
    carrito.push(productos)
    await cartApi.update(carrito)
})

cartRouter.delete("/:id/productos/:idProd", async (req,res)=>{
    const carrito = await cartApi.listId(req.params.id)
    const index = carrito.findIndex(x => x.id === req.params.idProd)
    if (index != -1){
        carrito.splice(index, 1)
        await cartApi.update(carrito)
    }
    res.send()
})








app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/api/productos", prodRouter)
app.use("/api/carrito", cartRouter)
app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`)
})