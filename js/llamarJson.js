    $.ajax({
		url:'js/productos.json',
        dataType: 'json',
        success: function (data, status) {
			stockProductos = data;
			insertarHTML(data);
            console.log(data);
            console.log(status);
        },
        error: function (xhr, status){
            console.log(xhr)
            console.log(status)
        }
    })
