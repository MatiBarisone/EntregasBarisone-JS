//Clases
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

//Funciones
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
        precio.innerHTML = `AR$ $${new Intl.NumberFormat('es-MX').format(producto.precio)}`;

        const boton = document.createElement("a");
        boton.className= "btn btn-sm btn-outline-secondary";
        boton.innerText= "Agregar al carrito"

        boton.addEventListener ("click", () => {
            agregarProductos(producto);
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

function renderizarCarrito(productos){
    bodyTabla.innerHTML = "";
    productos.forEach(producto => {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.innerHTML = `${producto.nombre}`;

        const tdPrecio = document.createElement("td");
        tdPrecio.innerHTML = `AR$ $${new Intl.NumberFormat('es-MX').format(producto.precio)}`;

        const tdAcciones = document.createElement("td");
        const botonEliminarProducto = document.createElement("button");
        botonEliminarProducto.className = "btn btn-sm btn-outline-danger";
        botonEliminarProducto.innerText="Eliminar";
        botonEliminarProducto.addEventListener ("click", () => {
            eliminarProducto(producto);
        });

        tdAcciones.append(botonEliminarProducto);

        fila.append(tdNombre);
        fila.append(tdPrecio);
        fila.append(tdAcciones);

        bodyTabla.append(fila);

    })
}

function renderizarTotal(productos){
    bodyTotal.innerHTML = "";
    let total = 0;
    const tdTotal = document.createElement("td");
    productos.forEach( producto => {
        total += producto.precio;
    })
    tdTotal.innerHTML = `AR$ $${new Intl.NumberFormat('es-MX').format(total)}`;
    tdTotal.className = "fs-2"
    bodyTotal.append(tdTotal);
}

function agregarProductos(producto){
    const nombre = producto.nombre;
    const precio = producto.precio;

    console.log (nombre);
    console.log (precio);
    
    carrito.push(new Producto(nombre, precio));

    actualizarLS();
    renderizarCarrito(carrito);
    renderizarTotal(carrito);
}

function eliminarProducto(producto){
    const indiceElementoAEliminar = carrito.findIndex ( (productoAEliminar) => {
        return productoAEliminar.nombre.toLowerCase() == producto.nombre.toLowerCase();
    });

    carrito.splice(indiceElementoAEliminar, 1);
    
    actualizarLS();
    renderizarCarrito(carrito);
    renderizarTotal(carrito);
}

function obtenerCarrito(){
    let productos = [];
    let prodcutosLS = localStorage.getItem("productos");
    if (prodcutosLS !== null){
        const productosJSON = JSON.parse(prodcutosLS);
        for (const productoJSON of productosJSON){
            productos.push (new Producto (productoJSON.nombre, productoJSON.precio));
        }
    }
    return productos;
}

function actualizarLS(){
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("productos", carritoJSON); 
}

//inicio Programa
const listaDeProductos = [
    {
        img: "img/zapatilla7.svg",
        id:1, 
        nombre:"Converse Run Star Hike", 
        precio:36890
    },
    {
        img: "img/zapatilla1.svg",
        id:4, 
        nombre:"VERSACE TRIGRECA SNEAKERS", 
        precio:105999
    },
    {
        img: "img/zapatilla9.svg",
        id:2, 
        nombre:"Adidas Sply-350", 
        precio:56580
    },
    {
        img: "img/zapatilla8.svg",
        id:3, 
        nombre:"Halo Leather Sneaker", 
        precio:100000
    },
    {
        img: "img/zapatilla2.svg",
        id:6, 
        nombre:"Adidas x Dragon Ball Freezer Editio", 
        precio:75500
    },
    {
        img: "img/zapatilla6.svg",
        id:9, 
        nombre:'Air Jordan 1 "Origin Story"', 
        precio:63699
    },
    {
        img: "img/zapatilla3.svg",
        id:7, 
        nombre:"Adidas x Dragon Ball Son Gohan Edition", 
        precio:80999
    },
    {
        img: "img/zapatilla5.svg",
        id:5, 
        nombre:"Adidas x Dragon Ball Son Goku Edition", 
        precio:75500
    },
    {
        img: "img/zapatilla4.svg",
        id:8, 
        nombre:"Adidas x Dragon Ball Shenron Edition", 
        precio:76600
    },

];

const carrito = obtenerCarrito();
const bodyProductos = document.getElementById("bodyProductos");
const bodyTabla = document.getElementById("bodyTabla");
const bodyTotal = document.getElementById("bodyTotal");
const formularioBuscarProductos = document.getElementById("buscarProductos");
const inputNombreBuscado = document.getElementById("nombreBuscado");



formularioBuscarProductos.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const palabraABuscar = inputNombreBuscado.value;
    inputNombreBuscado.value = "";

    console.log(palabraABuscar);

    const productosFiltrados = listaDeProductos.filter( (producto) => {
        return producto.nombre.toLowerCase().includes(palabraABuscar.toLowerCase());
    });

    renderizarProductos(productosFiltrados);
})


renderizarProductos(listaDeProductos);
renderizarCarrito(carrito);
renderizarTotal(carrito);