//Selectores//
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#portfolio');
const vaciar = document.querySelector('#vaciar-carrito');
const totalCarrito = document.getElementById('total');

let itemCarrito = [];

//Listeners//
vaciar.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto);

document.addEventListener('DOMContentLoaded', () =>{
    itemCarrito = JSON.parse(localStorage.getItem('portfolio')) || [];
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

function botonAgregar(){
    const agregarAlCarrito = document.querySelector('#btnbtn');
    agregarAlCarrito.addEventListener('click', agregarProducto);
}

function agregarProducto(e){
    e.preventDefault();

	if (e.target.classList.contains('agregar-carrito')) {
		const productoSeleccionado = e.target.parentElement.parentElement;
		datosProducto(productoSeleccionado);
    }
}

function datosProducto(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h5').textContent,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('agregar-carrito').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = itemCarrito.some((producto) => producto.id == productoAgregado.id);

	if (existe) {
		const productos = itemCarrito.map(producto => {
			if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                console.log(productoAgregado);
                return producto;
			} else{
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

function insertarHTML(){
    limpiarCarrito();
    let sumaPrecios = 0;
    
    itemCarrito.forEach(producto  =>{
        const {imagen, nombre, precio, cantidad, id} = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" class="agregado-carrito"></td>
            <td><h5>${nombre}</h5></td>
            <td><h5>${precio}</h5></td>
            <td>
            <button class="btn-cantidad default disminuir" onClick="disminuirCantidad('${id}')">-</button><input type="text" class="cantidad-carrito" value="${cantidad}"><button class="btn-cantidad default aumentar" onClick="aumentarCantidad('${id}')">+</button>
            </td>
            <td><a href="#" class="borrar-producto" data-id="${id}">x</a></td>
        `
        carritoContenido.appendChild(row);

        sumaPrecios += (precio * cantidad);
    }); 
    totalCarrito.innerHTML = `$${sumaPrecios}`;
}

function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(itemCarrito));
}

function eliminarProducto(e){
    if (e.target.classList.contains('borrar-producto')) {
        const productoID = e.target.getAttribute('data-id');

        itemCarrito = itemCarrito.filter(producto => producto.id != productoID);
        
        insertarHTML(); //renderiza el nuevo carrito
        guardarStorage(); //actualiza storage
    }
}

function aumentarCantidad(id){
    itemCarrito.map(producto => {
        if(producto.id == id) 
        producto.cantidad++;
    });
    insertarHTML();
    guardarStorage();
}

function disminuirCantidad(id){
    itemCarrito.map(producto => {
        if(producto.id == id && producto.cantidad > 1) 
        producto.cantidad--;
    });
    insertarHTML();
    guardarStorage();
}

function limpiarCarrito() {
    contenedorCarrito.innerHTML = '';
}

$("form").submit(function(event) {
    console.log( $(this).serializeArray() );
    event.preventDefault();
    alert( "Ya estás inscripta en el Newsletter! Gracias!" );        
});