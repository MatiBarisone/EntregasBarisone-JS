// ================= CLASES =================
class Producto{
    constructor(img, id, nombre, precio){
        this.img = img;
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class ProductoCarrito {
    constructor(nombre, precio, cantidad = 1) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    sumarCantidad (){
        this.cantidad++;
    }
}

// ================= FUNCIONES =================

/* Se encarga de renderizar todos los poductos en la página. */
function renderizarProductos(productos){
    bodyProductos.innerHTML = "";
    productos.forEach(producto => {
        const columna = document.createElement("div");
        columna.className = "col";
        
        const card = document.createElement("div");
        card.className = "card shadow-sm";
        
        const imagen = document.createElement("img");
        imagen.src = producto.img;

        const cardBody = document.createElement("div");
        cardBody.className="card-body text-center";

        const nombre = document.createElement("h5");
        nombre.className = "card-title text-wrap";
        nombre.innerHTML = `${producto.nombre}`;

        const precio = document.createElement("p");
        precio.className = "card-text text-wrap";
        precio.innerHTML = `AR$ ${new Intl.NumberFormat('es-MX').format(producto.precio)}`;

        const boton = document.createElement("a");
        boton.className= "btn btn-sm btn-outline-secondary";
        boton.innerText= "Agregar al carrito"

        boton.addEventListener ("click", () => {
            agregarProductosAlCarro(producto);
            Toastify({
                text: "El objeto se ha agregado al Carrito",
                position: "left",
                duration: 1500,
                backgroundColor: "green",
                }).showToast();
        });

        cardBody.append (nombre);
        cardBody.append (precio);
        cardBody.append (boton);

        card.append(imagen);
        card.append(cardBody);

        columna.append(card);

        bodyProductos.append(columna);

    });
}

/* Se encarga de obtener nuestros respectivos productos desde el Archivo .JSON (esto podría ser una futura API). */
function obtenerProductosJSON(){
    fetch('json/productos.json')
    .then ((Response) => {
        return Response.json();
    })
    .then ((productosJSON) => {
        
        for (const productoJSON of productosJSON){
            listaDeProductos.push (new Producto (
                productoJSON.img, 
                productoJSON.id, 
                productoJSON.nombre, 
                productoJSON.precio))
        }
        
        renderizarProductos(listaDeProductos);
    })
}

/* Se encarga de Agregar un producto a nuestro carrito (esto se accionará cuando se toque el botón "Agregar al carrito"), 
si se quiere agregar un producto que ya existe en el carrito la cantidad de ese producto aumentará. */
function agregarProductosAlCarro(productoAgregado){
    const indiceProductoExistente = carrito.findIndex( (productoExistente) => productoExistente.nombre.toLowerCase() === productoAgregado.nombre.toLowerCase());
    if (indiceProductoExistente === -1){
        carrito.push(new ProductoCarrito(productoAgregado.nombre, productoAgregado.precio));
    } 
    else{
        carrito[indiceProductoExistente].sumarCantidad()
    }

    actualizarLS();
    renderizarCarrito(carrito);
    renderizarTotal(carrito);
}

/* Se encarga de renderizar todos los poductos que nosotros hayamos agregado a nuestro carrito. */
function renderizarCarrito(productos){
    bodyTabla.innerHTML = "";
    productos.forEach(producto => {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.innerHTML = `${producto.nombre}`;

        const tdPrecio = document.createElement("td");
        tdPrecio.innerHTML = `AR$ ${new Intl.NumberFormat('es-MX').format(producto.precio)}`;

        const tdCantidad = document.createElement("td");
        tdCantidad.innerHTML = `${producto.cantidad}`;

        const tdAcciones = document.createElement("td");
        const botonEliminarProducto = document.createElement("button");
        botonEliminarProducto.className = "btn btn-sm btn-outline-danger";
        botonEliminarProducto.innerText="Eliminar";
        botonEliminarProducto.addEventListener ("click", () => {
            eliminarProducto(producto);
            Toastify({
                text: "Los objetos se han eliminado del carrito",
                position: "left",
                duration: 1500,
                backgroundColor: "red",
                }).showToast();
        });

        tdAcciones.append(botonEliminarProducto);

        fila.append(tdNombre);
        fila.append(tdPrecio);
        fila.append(tdCantidad);
        fila.append(tdAcciones);

        bodyTabla.append(fila);

    })
}

/* Se encarga de renderizar y calcular el Total de los productos que se encuentran en el carrito. */
function renderizarTotal(productos){
    bodyTotal.innerHTML = "";
    let total = 0;
    const tdTotal = document.createElement("td");
    productos.forEach( producto => {
        total += (producto.precio * producto.cantidad);
    })
    tdTotal.innerHTML = `AR$ ${new Intl.NumberFormat('es-MX').format(total)}`;
    tdTotal.className = "fs-2"
    bodyTotal.append(tdTotal);
}

/* Se encarga de Eliminar un producto de nuestro carrito (esto se accionará cuando se toque el botón "Eliminar"
dentro de el carrito). Esto eliminará todas las instancias del producto en cuestión. */
function eliminarProducto(productoAEliminar){
    const indiceElementoAEliminar = carrito.findIndex ( (ProductoCarrito) => {
        return ProductoCarrito.nombre.toLowerCase() == productoAEliminar.nombre.toLowerCase();
    });

    if (indiceElementoAEliminar !== -1){
        carrito.splice(indiceElementoAEliminar, 1);
    }
    
    actualizarLS();
    renderizarCarrito(carrito);
    renderizarTotal(carrito);
}

/* Se encarga de buscar si existe una instancia del Carrito en el Local Storage, y si es así lo cargará
para mostrarlo en pantalla */
function obtenerCarrito(){
    let carro = [];
    let carritoLS = localStorage.getItem("productos");
    if (carritoLS !== null){
        const productosJSON = JSON.parse(carritoLS);
        for (const productoJSON of productosJSON){
            carro.push (new ProductoCarrito (productoJSON.nombre, productoJSON.precio, productoJSON.cantidad));
        }
    }
    return carro;
}

/* Se encarga de actualizar el Local Storage, cada vez que el carrito es modificado */
function actualizarLS(){
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("productos", carritoJSON); 
}

// ================= INICIO PROGRAMA =================
const listaDeProductos = [];
const carrito = obtenerCarrito();
const bodyProductos = document.getElementById("bodyProductos");
const bodyTabla = document.getElementById("bodyTabla");
const bodyTotal = document.getElementById("bodyTotal");
const formularioBuscarProductos = document.getElementById("buscarProductos");
const inputNombreBuscado = document.getElementById("nombreBuscado");
const botonDeCompra = document.getElementById("botonCompra");


botonDeCompra.addEventListener("click", (event) => {
    carrito.length === 0 ? 
    (Swal.fire({
        title: 'Error 404!',
        text: 'No se han encontrado productos en tu Carrito, debes agregar alguno para poder seguir con la compra!',
        icon: 'error',
        confirmButtonText: 'Ok'
    })) 
    :(Swal.fire({
        title: 'Compra Exitosa!',
        text: 'Su compra se ha realizado con exito!',
        icon: 'success',
        confirmButtonText: 'Ok'
    }).then((result) =>{
        if (result.isConfirmed){
            carrito.splice(0,carrito.length);
            actualizarLS();
            renderizarCarrito(carrito);
            renderizarTotal(carrito);
        }
    }))
})

formularioBuscarProductos.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const palabraABuscar = inputNombreBuscado.value;
    inputNombreBuscado.value = "";

    const productosFiltrados = listaDeProductos.filter( (producto) => {
        return producto.nombre.toLowerCase().includes(palabraABuscar.toLowerCase());
    });

    renderizarProductos(productosFiltrados);
})

obtenerProductosJSON();
renderizarProductos(listaDeProductos);
renderizarCarrito(carrito);
renderizarTotal(carrito);