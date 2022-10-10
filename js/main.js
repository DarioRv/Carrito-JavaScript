/*
Esta parte del código es para alternar la visibilidad de la lista del carrito
cada vez que se hace click en el icono.
*/
const CONTENEDOR_CARRITO = document.querySelector(".detalles-carrito")
const ICONO_CARRITO = document.querySelector(".icono")
ICONO_CARRITO.addEventListener("click", function(){
    if (CONTENEDOR_CARRITO.style.display == "none"){
        CONTENEDOR_CARRITO.style.display = "block"
    }
    else
    CONTENEDOR_CARRITO.style.display = "none"
})



// Defino mi clase producto el cual tendra cuatro propiedades, nombre, precio, imagen y cantidad
class Producto{
    constructor(nombre, precio, imagen, cantidad){
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.cantidad = cantidad
    }
    // En cada objeto se podra calcular el subtotal dependiendo del precio y la cantidad
    subtotal(){
        let cantidad = parseInt(this.cantidad)
        let precio = this.precio
        // Necesito quitar el '$' de mi precio para tratarlo como int, por eso uso la funcion subtring
        precio = Number(precio.substring(1, precio.length))
        return cantidad * precio
    }
}
function determinarExistencia(producto, listaCarrito){
    /*
    Recibe un elemento de tipo objeto y un array
    - Retorna true si el elemento SI pertenece al array
    - Retorna false si el elemento NO pertenece al array 
    */
   let existe;
   for (let item of listaCarrito){
       if (item.nombre == producto.nombre)
       existe = true
    }
    existe = false
    return existe
}
function imprimir(listaCarrito){
    const LISTA_CARRITO = document.querySelector(".lista-carrito")
    // Limpio el contenedor en su estado antiguo
    LISTA_CARRITO.innerHTML = ""
    // Imprimo el nuevo contenido (el array) del contenedor en su estado actual
    for (let item of listaCarrito){
        LISTA_CARRITO.innerHTML += `
        <li class='${item.nombre}'>
            <div class="producto-carrito">
                <div class="img-producto">
                    <img src="${item.imagen}" alt="Donas">
                </div>
                <div class="detalles-producto">
                    <h5>${item.nombre}</h5>
                    <p class="precio">${item.precio}</p>
                </div>
                    <div class="elegir-cantidad">
                        <button class="flecha-menos">-</button>
                        <input type="text" class="cantidad" value="${item.cantidad}">
                        <button class="flecha-mas">+</button>
                    </div>
                    <div class="subtotal-producto">${item.subtotal()}</div>
            </div>
        </li>
        <hr>`
    }
    LISTA_CARRITO.innerHTML += `<button class="btn-vaciar-carrito">Vaciar Carrito</button>`

    /*
    Boton vaciar carrito -> quito todos mis objetos del array y cambio la estructura
    html por un mensaje de contenido vacío
    */
    const MENSAJE_CONTENIDO_VACIO = "Tu carrito está vacío"
    const BTN_VACIAR_CARRITO = document.querySelector(".btn-vaciar-carrito")
    BTN_VACIAR_CARRITO.addEventListener("click", function(){
        while(listaCarrito.pop() != undefined){
            listaCarrito.pop()
        }
        listaCarrito.pop()
        LISTA_CARRITO.innerHTML = `<p>${MENSAJE_CONTENIDO_VACIO}</p>`
        // Borro el contenido del total del carrito
        document.querySelector(".total").innerHTML = ""
    })

}
function calcularTotal(){
    let total = Number()
    for (let item2 of listaCarrito){
        //Number(precio.substring(1, precio.length))
        console.log(item2.subtotal())
        total += Number(item2.subtotal())
        console.log(total)
    }
    document.querySelector(".total").innerHTML = `<p>Total a pagar: ${total}</p>`
}

// Armo un array que contendrá cada uno de mis productos de la cartelera
const TARJETAS_PRODUCTOS = document.querySelectorAll(".producto")

/* 
Declaro 4 varibales para poder guardar la información del producto
y asi poder crear un objeto.
*/
let nombreProducto, precioProducto, imagenProducto, cantidadProducto
// Declaro un array para poder guardar cada objeto creado
let listaCarrito = []

// Asigno a cada producto de la cartelera un evento que ejecuta una función para poder agregarla al carrito
for (let item of  TARJETAS_PRODUCTOS){
    item.addEventListener('click', function(){
        // Obtengo los datos del producto (nombre, precio e imagen)
        nombreProducto = (item.childNodes[3].childNodes[1].innerText)
        precioProducto = (item.childNodes[3].childNodes[3].innerText)
        imagenProducto = item.childNodes[1].childNodes[1].getAttribute("src")
        cantidadProducto = 1

        // Creo un nuevo objeto producto apartir de mis datos
        nuevoProducto = new Producto(nombreProducto, precioProducto, imagenProducto, cantidadProducto)
        if (determinarExistencia(nuevoProducto, listaCarrito) == false){
            // Hago un push del producto en mi array
            listaCarrito.push(nuevoProducto)
            // Imprimo todos mis datos del array
            imprimir(listaCarrito)
            calcularTotal()
            // Muestro un mensaje de que el producto fue agregado
            const ALERT_INFO = document.querySelector(".alert")
            ALERT_INFO.style.display = "flex"
            setTimeout(() => { ALERT_INFO.style.display = "none" }, 1000)
        }

        /*
        Para cada uno de mis productos le asigno su evento para poder
        agregar más unidades o quitar unidades, además de calcular su subtotal.
        */
        const LISTA_DE_PRODUCTOS = document.querySelectorAll(".producto-carrito")
        for (let i of LISTA_DE_PRODUCTOS){
            let nombre = i.querySelector("h5").innerText
            i.querySelector(".flecha-mas").addEventListener("click", function(){
                i.querySelector(".cantidad").value = Number(i.querySelector(".cantidad").value) + 1
                for (let j of listaCarrito){
                    if (nombre == j.nombre){
                        j.cantidad += 1
                        console.log(j)
                        i.querySelector(".subtotal-producto").textContent = j.subtotal()
                    }
                }
                calcularTotal()
            })
            i.querySelector(".flecha-menos").addEventListener("click", function(){
                if(Number(i.querySelector(".cantidad").value) > 0){
                    i.querySelector(".cantidad").value = Number(i.querySelector(".cantidad").value) - 1
                    for (let j of listaCarrito){
                        if (nombre == j.nombre){
                            j.cantidad -= 1
                            console.log(j)
                            i.querySelector(".subtotal-producto").textContent = j.subtotal()
                        }
                    }
                }
                calcularTotal()
            })

        }
    })
    
}





