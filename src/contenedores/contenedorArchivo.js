const config = require('../config')
const fs = require('fs')

class ContenedorArchivo {
    constructor(root) {
        this.root = `${config.fileSystem.path}/${root}`
    }
    async listID(id) {
        const objeto = await this.listAll()
        const objFind =  objeto.find(x => x.id == id)
        return objFind
    }
    async listAll() {
        try {
            const objeto = await fs.readFile(this.root, 'utf-8')
            return JSON.parse(objeto)

        } catch (error) {
            return []
        }
    }
    async saveObjetct (elem) {
        const objeto = await this.listAll()
        let newId
        if (objeto.length == 0){
            newId = 1
        } else {
            newId = objeto[objeto.length- 1].id +1
        }
        const newObj = { ...elem, id: newId}
        objeto.push(newObj)
        try {
            await fs.writeFile(this.root, JSON.stringify(objeto, null, 2))
            return newObj
        } catch (error) {
            throw new Error ("Error al guardar")
        }
    }

    async update(elem) {
        const objeto = await this.listAll()
        const index = objeto.findIndex(x => x.id == elem.id)
        if (index == -1) {
            throw new Error ("Error al actualizar")
        } else {
            objeto[index] = elem
            try {
                await fs.writeFile(this.root, JSON.stringify(objeto, null, 2))
            } catch (error) {
                throw new Error ('Error al actualizar')
            }
        }
    }

    async delete(id) {
        const objeto = await this.listAll()
        const index = objeto.findIndex(x => x.id == id)
        if (index == -1) {
            throw new Error ('error al borrar')
        } 
        objeto.splice(index, 1)
        try {
            await fs.writeFile(this.root, JSON.stringify(objeto, null, 2))
        } catch (error) {
            throw new Error (' error al borrar' + error)
        }

    }

    async deleteAll() {
        try {
            await fs.writeFile(this.root, JSON.stringify([], null,2))
        } catch (error) {
            throw new Error ('error al borrar ' + error)
        }
    }
}

export default ContenedorArchivo