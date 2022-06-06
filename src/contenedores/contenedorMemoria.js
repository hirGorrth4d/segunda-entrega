class ContenedorMemoria {
    constructor () {
        this.elementos = []
    }
    listId(id){
        const elem = this.elementos.find(x => x.id == id)
        if (!elem) {
            throw new Error ("error al listar")

        } else {
            return elem
        }
    }
    listAll() {
        return [...this.elementos]
    }
    save(elem){
        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id+1
        }

        const newElem = {...elem, id: newId}
        this.elementos.push(newElem)
        return newElem
    }
    update(elem) {
        const index = this.elementos.findIndex(x => x.id == id)
        if (index == -1){
            throw new Error ("error al actualizar")
        } else {
            this.elementos[index] = elem
            return elem
        }
    }
    delete(id) {
        const index = this.elementos.findIndex(x => x.id == id) 
        if (index == -1){
            throw new Error ("error al borrar: elemento no encontrado")
        } else {
            return this.elementos.splice(index, 1)
        }
    }
    deleteAll() {
        this.elementos = []
    }

}