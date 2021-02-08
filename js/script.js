//Selectores//
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#portfolio');
const vaciar = document.querySelector('#vaciar-carrito');
const totalCarrito = document.getElementById('total');

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
        },
        error: function (xhr, status){
            console.log(xhr)
            console.log("Error")
        }
    });

    itemCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    insertarHTML();

    /*Cargar productos Fetch
    document.addEventListener("DOMContentLoaded", () =>{
        fetch("/js/productos.json")
        .then(ans) => ans.json()}
        .then(productos) => {
            stockProductos = productos;
            cargarListaProductos(productos);

        }
    }) */

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

function cargarListaProductos(productos) {
    $('#portfolio');
    productos.forEach((producto) =>{
    
    const {imagen, descripcion, nombre, precio, id} = producto;

    const divCard = document.createElement('div');
    divCard.classList.add('portfolio-box-caption');
    divCard.innerHTML = `
        <img class="img-fluid" src="${imagen}">
        <div class="project-category text-white-50"><h5>${nombre}</h5></div>
        <p><span class="u-pull-right ">${precio}</span></p>
        <div><button href="#" class="btn success u-full-width input agregar-carrito" data-id="${id}">Agregar al carrito</button></div>
    `
    document.querySelector('#portcard').appendChild(divCard);
    });
}

function eliminarProducto(e){
    if (e.target.classList.contains('borrar-producto')) {
        const productoID = e.target.getAttribute('data-id');

        itemCarrito = itemCarrito.filter(producto => producto.id != productoID);
        
        insertarHTML(); //renderiza el nuevo carrito
        guardarStorage(); //actualiza storage
    }
}

function agregarProducto(event, id) {
    if(!itemCarrito.some(producto => producto.id == id)){
        const producto = stockProductos.find(producto => producto.id == id);
        itemCarrito.push(producto);
        insertarHTML();
        guardarStorage();
    }
}

function datosProducto(producto){
    //extraer info del producto
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h5').textContent,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('agregar-carrito').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = itemCarrito.some(producto => producto.id == productoAgregado.id);

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

function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(itemCarrito));
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
        contenedorCarrito.appendChild(row);
        sumaPrecios += (precio * cantidad);
    }); 
    totalCarrito.innerHTML = `$${sumaPrecios}`;
}

function limpiarCarrito() {
    contenedorCarrito.innerHTML = '';
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


$("form").submit(function(event) {
    console.log( $(this).serializeArray() );
    event.preventDefault();
    alert( "Ya estás inscripta en el Newsletter! Gracias!" );        
});