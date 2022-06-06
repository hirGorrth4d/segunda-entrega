const mongoose = require("mongoose")
const config = require("../config")
const {asPOJO, renameField, removeField} = require("../utils/objUtils")

await mongoose.connect(config.mongodb.connection, config.mongodb.options)

class ContenedorMongo {
    constructor(nombreColeccion, scheme){
        this.colection = mongoose.model(nombreColeccion,scheme)
    }
    async listId(id) {
        try {
            const docs = await this.colection.find({'_id': id}, {__v:0})
            if (docs.length == 0){
                throw new Error ("error al listar")
            } else {
                const result = renameField(asPOJO(docs[0]), "_id", "id")
                return result
            }
        }catch (error){
            throw new Error ("error al listar")
        }
    }
    async listAll(){
        try {
            let docs = await this.colection.find({}, {__v: 0}).lean()
            docs= docs.map(asPOJO)
            docs = docs.map(x => renameField(x, "_id", "id"))
            return docs
        } catch (error) {
            throw new Error("error al listar todo")
        }
    }
    async save(elem){
        try {
            let doc = await this.colection.create(elem)
            doc= asPOJO(doc)
            renameField(doc, "_id", "id")
            removeField(doc, "__v")
            return doc
        } catch (error){
            throw new Error ("error al guardar" + error)
        }
    }

    async update (elem) {
        try {
            renameField(elem, "id", "_id")
            const {n, nModified} = await this.colection.replaceOne({"_id": elem._id}, elem)
            if( n== 0 || nModified == 0){
                throw new Error ("error al actualizar")
            } else {
                renameField(elem, "_id", "id")
                removeField(elem, "__v")
                return asPOJO(elem)
            }
        } catch(error) {
            throw new Error ("error al actualizar " + error)
        }
    }
    async deleteId(id){
        try {
            const {n, nDeleted} = await this.colection.deleteOne({"_id": id})
            if (n == 0 || nDeleted ==0 ){
                throw new Error ("error al borrar")
            } 
        } catch {
            throw new Error ("error al borrar")
        }
    }
    async deleteAll() {
        try {
            await this.colection.deleteMany({})
        }catch {
            throw new Error ("error al borrar todo")
        }
    }
}

export default ContenedorMongo