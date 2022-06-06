// productos
const apiProductos = {
    get: () => {
        return fetch("/api/productos")
    },
    post:(nuevoProd) => {
        const options = {
            method: "POST",
            headers: {
                "Contente-Type": "application/json"
            },
            body: JSON.stringify(nuevoProd)
        }
        return fetch("/api/productos", options)
    },
    put: (idProd, nuevoProd) => {
        const options = {
            method: "PUT",
            body: JSON.stringify(nuevoProd),
            headers: {
                "Content-Type": "application/json",
            }
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
    delete: (idProd) => {
        const options = {
            method: "DELETE"
        }
        return fetch(`/api/productos/${idProd}`, options)
    }
}


const addProduct = document.getElementById("addProduct")
addProduct.addEventListener("submit", e => {
    e.preventDefault()
    const product = prodForm()
    apiProductos.post(product).then(updateProd).then(()=> {
        addProduct.reset()
    }).catch((err) =>{
        console.log(err)
    })
})

const prodForm = () => {
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumb: addProduct[2].value
    }
    return producto
}
const updateProdList = () => {
    return apiProductos.get().then(x => tabla(x)).then(html => {
        document.getElementById("productos").innerHTML = html
    })
}
const deleteProd = (idProd)  => {
    apiProductos.delete(idProd).then(updateProd)
}

const updateProd = (idProd) => {
    const newProd = prodForm()
    apiProductos.put(idProd, newProd).then(updateProdList)
}

const form = (title, price, thumb) => {
    addProduct[0].value = title
    addProduct[1].value = price
    addProduct[2].value = thumb
}

function tabla(prod) {
    
}
