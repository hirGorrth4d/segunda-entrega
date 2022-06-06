const admin = require("firebase-admin")
const config = require("../config")

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore()

class ContenedorFirebase {
    constructor (colectionName) {
        this.colection = db.collection(colectionName)
    }

    async listId(id){
        try {
            const col= await this.colection.doc(id).get()
            if (!col.exists){
                throw new Error ("Error al encontrar el id")
            } else {
                const data = col.data()
                return {...data, id}
            }
        } catch {
            throw new Error("error al listar")
        }
    }

    async listAll() {
        try {
            const result = []
            const snapshot = await this.colection.get()
            snapshot.forEach(x => {
                result.push({id: x.id, ...x.data()})
            })
            return result
        } catch {
            throw new Error ("error al listar todo")
        }
    }

    async save(elem) {
        try {
            const saved = await this.colection.add(elem)
            return {...elem, id: saved.id}
        } catch {
            throw new Error("error al guardar")
        }
    }

    async update(elem) {
        try {
            const updated = await this.colection.doc(elem.id).set(elem)
            return updated
        } catch {
            throw new Error("Error al acutalizar")
        }
    }

    async deleteId(id) {
        try {
            const item = await this.colection.doc(id).delete()
            return item
        } catch {
            throw new Error ("error al borrar id")
        }
    }

    async deleteAll(col, doc) {
        try {
            await db.collection(col).doc(doc).delete()
        }catch {
            throw new Error("error al borrar todo")
        }
    }
}