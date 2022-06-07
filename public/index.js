// apis productos y carrito
const apiProductos = {
    get: () => {
        return fetch("/api/productos").then(data => data.json())
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

const apiCarrito = {
    createCart: () =>{
        const options = {
            method: "POST"
        }
        return fetch("/api/carrito", options).then(data=>data.json())
    },
    getId: () =>{
        return fetch("/api/carrito").then(data=>data.json())
    },
    postProd: (idCart, idProd) =>{
        const data = {
            id: idProd
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carrito/${idCart}/productos`, options)
    },
    getProds: idCart =>{
        return fetch (`/api/carrito/${idCart}/productos`).then(data => data.json())
    },
    deleteProd: (idCart, idProd) => {
        const options = {
            method: "DELETE",
        }
        return fetch(`/api/carrito/${idCart}/productos/${idProd}`, options)
    }
}

//funciones productos
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
    let html
    if (prod.legth > 0){
        html = `
        <h2>Productos</h2>
        <div class="table-responsive">
            <table class="table table dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
        `
        for (const prod of productos) {
            html += `(
            <tr>
                <td><a type="button" onclick="form('${prod.title}', '${prod.price}', '${prod.thumb}')" title="Formulario">${prod.title}</a></td>
                <td>${prod.price}</td>
                <td><img width="50" src=${prod.thumb} alt="notfound"></td>
                <td><a type="button" onclick="deleteProd('${prod.id}')">Borrar</a></td>
                <td><a type="button" onclick="updateProd('${prod.id}')">actualizar</a></td>
            </tr>
            `
        }

        html+= `</table>
        </div>
        `
    } else {
        html += `<h4>no hay productos</h4>`
    }
    return Promise.resolve(html)
}

// funciones carrito


document.getElementById("btnAddCart").addEventListener("click", () =>{
    const idCart = document.getElementById("cart").value
    const idProd = document.getElementById("prod").value
    if (idCart && idProd) {
        addCart(idCart, idProd)
    } else {
        console.log("no agrego producto")
    }
})

document.getElementById("btnCreateCart").addEventListener("click", () =>{
    apiCarrito.createCart().then(({id}) =>{
        cartGroup().then(()=>{
            const group = document.getElementById("grupoCarrito")
            group.value= `${id}`
            group.dispatchEvent(new Event ("change"))
        })
    })
})

document.getElementById("grupoCarrito").addEventListener("change", () =>{
    const idCart = document.getElementById("grupoCarrito").value
    updateCartList(idCart)
})



const addToCart = (idCart, idProd) => {
    return apiCarrito.postProd(idCart, idProd).then(() => {
        updateCartList(idCart)
    })
}

const deleteFromCart = (idProd) => {
    const idCart = document.getElementById("grupoCarrito").value
    return apiCarrito.deleteProd(idCart, idProd).then(()=>{
        updateCartList(idCart)
    })
}

const updateCartList = (idCart)=>{
    return apiCarrito.getProds(idCart).then(prods=>tabla(prods)).then(html => {
        document.getElementById("carrito").innerHTML = html

    })
}

const optionFirst = (text) =>{
    const defaultItem = document.createElement("option")
    defaultItem.value =""
    defaultItem.text = text
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

const cartGroup = () => {
    return apiCarrito.getId()
    .then(ids =>{
        const group = document.getElementById("grupoCarrito")
        deleteGroup(group)
        group.appendChild(optionFirst("elegir carrito"))
        for (const id of ids) {
            const groupItem = document.createElement("option")
            groupItem.value = id
            groupItem.text = id
            group.appendChild(groupItem)
        }
    })
}

const deleteGroup = (group) => {
    while (group.childElementCount > 0){
        group.remove(0)
    }
}

const prodGroup = () => {
    return apiProductos.get().then(prod =>{
        const group = document.getElementById("groupProd")
        group.appendChild(optionFirst("elegir producto"))
        for (const prod of productos){
            const groupItem = document.createElement("option")
            groupItem.value = prod.id
            groupItem.text = prod.title
            group.appendChild(groupItem)
        }
    })
}