const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#portfolio');
const vaciar = document.querySelector('#vaciar-carrito');

let itemCarrito  = [];

listaProductos.addEventListener('click', agregarProducto);
vaciar.addEventListener('click', vaciarCarrito);
contenedorCarrito.addEventListener('click', limpiarCarrito);

document.addEventListener('DOMContentLoaded', () =>{
    itemCarrito = JSON.parse(localStorage.getItem('carrito'));
    insertarHTML();
})

function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        datosProducto(productoSeleccionado);
    }
}

function datosProducto(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    itemCarrito.push(productoAgregado);

    insertarHTML();
    guardarStorage();
}

function guardarStorage (){
    localStorage.setItem('carrito', JSON.stringify(itemCarrito));
}

function insertarHTML(){

    limpiarCarrito();
    
    itemCarrito.forEach(producto  =>{
        const {imagen, nombre, precio, cantidad, id} = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" class="agregado-carrito">
            </td>
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })
}

function limpiarCarrito(){
    while (contenedorCarrito.firstChild) { 
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}  

function vaciarCarrito(){
    while (contenedorCarrito.firstChild) { 
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    return false;
}