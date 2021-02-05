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

    $.ajax({
		url:'js/productos.json',
        dataType: 'json',
        success: function (data, status, xhr) {
            stockProductos = data;
            cargarListaProductos(data);
            console.log(status);
        },
        error: function (xhr, status){
            console.log(xhr)
            console.log("Error")
        }
    });

    /*Cargar productos Fetch
    document.addEventListener("DOMContentLoaded", () =>{
        fetch("/js/productos.json")
        .then(ans) => ans.json()}
        .then(productos) => {
            stockProductos = productos;
            cargarListaProductos(productos);

        }
    }) */

    itemCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarritoTotal();

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
function cargarListaProductos(productos) {
    productos.forEach((producto) =>{
    
    const {imagen, nombre, precio, id} = producto;

    const divCard = document.createElement('div');
    divCard.classList.add('portfolio-box-caption');
    divCard.innerHTML = `
            <img class="img-fluid" src="${imagen}"/>
            <div class="project-category text-white-50"><h5>${nombre}</h5></div>
            <p><span class="u-pull-right ">${precio}</span></p>
            <div><button href="#" class="btn success u-full-width input agregar-carrito" data-id="${id}">Agregar al carrito</button></div>
    `
    document.querySelector('#portcard').appendChild(divCard);
    });
}

function vaciarCarrito() {
    limpiarCarrito();
	itemCarrito = [];
    guardarStorage();
}

function limpiarCarrito(){
    contenedorCarrito.innerHTML = "";
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
        nombre: producto.querySelector('h5').textContent,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = itemCarrito.some(producto => producto.id == productoAgregado.id);

	if (existe) {
		const productos = itemCarrito.map(producto => {
			if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                console.log(productoAgregado);
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
    actualizarCarritoTotal();
}

function actualizarCarritoTotal(){
    total = 0;
    const carritoTotal = document.querySelector('#total');
    carritoTotal.textContent = `$${total}`;

    if(itemCarrito != []){
        itemCarrito.forEach((producto) => {
            const {imagen, nombre, precio, cantidad, id} = producto;
            const precioParse = Number(precio.replace("$", ""));
            total = total + cantidad * precioParse;

            carritoTotal.textContent = `$${total}`;
    });
    }else{
        total = 0;
    }
}

$("form").submit(function(event) {
    console.log( $(this).serializeArray() );
    event.preventDefault();
    alert( "Ya estás inscripta en el Newsletter! Gracias!" );        
});