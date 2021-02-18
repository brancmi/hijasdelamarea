let stockProductos;

document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        type: "GET",
		url:'js/productos.json',
        dataType: 'json',
        success: function (data) {
            stockProductos = data;
            cargarListaProductos(stockProductos);
            botonAgregar();
        },
        error: function (){
            console.log("Error");
        }
    });
});

function cargarListaProductos(productos) {
    productos.forEach((producto) =>{
    
    const {imagen, nombre, precio, id} = producto;
		
    const divCard = document.createElement('div');
    divCard.classList.add('portfolio-box-caption');
    divCard.innerHTML = `
        <img class="img-fluid" src="${imagen}">
        <div class="project-category text-white-50"><h5>${nombre}</h5></div>
        <p><span class="u-pull-right ">${precio}</span></p>
        <div><button class="btn success u-full-width input agregar-carrito boton__agregar" data-id="${id}">Agregar al carrito</button></div>
    `
    document.querySelector('#portcard').appendChild(divCard);
    });
}

/*Cargar productos Fetch
    document.addEventListener("DOMContentLoaded", () =>{
        fetch("/js/productos.json")
        .then(ans) => ans.json()}
        .then(productos) => {
            stockProductos = productos;
            cargarListaProductos(productos);

        }
    }) */