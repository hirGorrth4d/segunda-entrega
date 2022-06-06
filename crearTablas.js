const knex = require("knex")
const config =require("./src/config")




async function createProducts(sqlClient){
    try {
        await sqlClient.schema.dropTableIfExists('productos')
        await sqlClient.schema.createTable("productos", table => {
            table.increments("id").primary()
            table.string("nombre", 30).notNullable()
            table.float("precio").notNullable()
            table.string("thumbnail", 1024)
            table.float("stock")
            table.string("codigo")
        })
        await sqlClient.destroy()
        console.log("tabla creada")
    } catch {
        throw new Error("no se pudo crear la tabla")
    }
}

async function createCart(sqlClient){
    try {
    await sqlClient.schema.dropTableIfExists('carrito')
    await sqlClient.schema.createTable("carrito", table => {
        table.increments("id").primary()
        table.boolean("deleted").defaultTo(false)
    })
    await sqlClient.schema.dropTableIfExists("productOnCart")
    await sqlClient.schema.createTable("productos", table => {
            table.increments("id").primary()
            table.integer("idCarrito").notNullable()
            table.string("nombre", 30).notNullable()
            table.float("precio").notNullable()
            table.string("thumbnail", 1024)
        })

    await sqlClient.destroy()
    
    console.log("tabla creada")
    } catch {
        throw new Error("no se pudo crear la tabla")
    }
}