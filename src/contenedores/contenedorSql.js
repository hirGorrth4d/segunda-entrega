const knex = require("knex")
const { asPOJO } = require ("../utils/objUtils")

class ContenedorSql{
    constructor (config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla

    }
    async listId(id) {
        try{
            const [datos ] = await this.knex.select("*").from(this.tabla).where("id", id)
            if (!datos) throw "elemento no encontrado"
            return asPOJO(datos)
        }catch {
            throw new Error ("error al listar")
        }
    }

    async listAll(criterio = {}) {
        try {
            const elem = await this.knex.select("*").from(this.tabla).where(criterio)
            const pojos = elem.map(x => asPOJO(x))
            return pojos
        } catch {
            throw new Error ("error al listar todo")
        }
    }
    async save(elem){
        try {
            const [newId] = await this.knex.insert(elem).into(this.tabla)
            elem.id = newId
            return asPOJO(elem)
        } catch {
            throw new Error ( "error al guardar")
        }
    }
    async update (elem) {
        elem.id = Number(elem.id)
        try {
            await this.knex.update(elem).from(this.tabla).where("id", elem.id)
            return asPOJO(elem)
        } catch {
            throw new Error ("error al actualizar")
        }
    }
    async deleteId(id) {
        try {
            return this.knex.delete().from(this.tabla).where("id", id)
        } catch {
            throw new Error ("error al borrar")
        }
    }
    async deleteAll(criterio = {}){
        try{
            return this.knex.delete().from(this.tabla).where(criterio)
        } catch {
            throw new Error("error al borrar todo")
        }
    }
}
export default ContenedorSql