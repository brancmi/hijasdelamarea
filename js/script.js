//Selectores//
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#portfolio');
const vaciar = document.querySelector('#vaciar-carrito');

let itemCarrito  = [];
let stockProductos;

//Listeners//
listaProductos.addEventListener('click', agregarProducto);
vaciar.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto);

document.addEventListener('DOMContentLoaded', () =>{
    itemCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    insertarHTML();

    $(".submenu, text").on({
		'mouseover': function () {
			$(".submenu #carrito").slideDown('slow');
		},
		'mouseleave': function () {
			$(".submenu #carrito").slideUp('slow');
		}
	})
})

//Funciones//
function vaciarCarrito() {
    limpiarCarrito();
	itemCarrito = [];
	guardarStorage();
}

function limpiarCarrito(){
    while (contenedorCarrito.firstChild) { 
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    return false;
}

function eliminarProducto(e){
    if (e.target.classList.contains('borrar-producto')) {
        const productoID = e.target.getAttribute('data-id');

        itemCarrito = itemCarrito.filter(producto => producto.id != productoID);
        
        insertarHTML(); //renderiza el nuevo carrito//
        guardarStorage();
    }
} 
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

    const existe = itemCarrito.some(producto => producto.id == productoAgregado.id);

	if (existe) {
		const productos = itemCarrito.map(producto => {
			if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                console.log(productoAgregado)
                return producto;
			} else {
				return producto;
			}
		});
		itemCarrito = [...productos];
	} else {
		/* Agrego el producto al carrito */
        itemCarrito.push(productoAgregado);
    }
    
    insertarHTML();
    guardarStorage();
}

//function sumaProductos(){
    //const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    //const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad + precio ,0)
    
    //total.innerHTML = `$ ${sumaPrecios}`;
//}

function guardarStorage() {
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
    });

$("form").submit(function(event) {
    console.log( $(this).serializeArray() );
    event.preventDefault();
    alert( "Ya estás inscripta en el Newsletter! Gracias!" );        
});
}