//Funciones:
function porCadaUno (arreglo, funcion){
    for (const elemento of arreglo){
        funcion (elemento);
    }
}

let total = 0;
function sumarTotal (precio){
    total += precio;
}

//Clases y sus metodos:
class Producto{
    constructor(id, nombre, precio, fechaVencimiento){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.fechaVencimiento = new Date(fechaVencimiento);
    }

    diasParaVencimiento(){
        const hoy = new Date();
        const milisegundoPorDia = 86400000;
        console.log("Faltan " + Math.ceil((this.fechaVencimiento - hoy) / milisegundoPorDia) + " dias para que el producto con ID=" + this.id + " se venza.")
    }
}

//Array de productos y carga de los mismos (cantidad que se quiera):
const productos = [];
let seguir = prompt ("¿Quiere agregar un producto? SI/NO ");
while (seguir.toUpperCase() == "SI"){
    productos.push (new Producto (
        prompt("ingrese el ID del producto"),
        prompt("ingrese el NOMBRE del producto"),
        prompt("ingrese el PRECIO del producto"),
        prompt("ingrese la FECHA DE VENCIMIENTO del producto"),
    ));
    seguir = prompt ("¿Quiere seguir agrendo productos? SI/NO ");
}

//Salidas y resultados:
console.log ("");
console.log (" - Todos los prodcutos han sido cargados:");
porCadaUno(productos, console.log);
console.log ("");
console.log (" - ¿Cuánto falta para que cada producto cargado se venza?");
for (const producto of productos){
    producto.diasParaVencimiento();
}
console.log ("");
console.log (" - Calculamos el total de nuestra empresa (suma de todos nustros productos):");
const precios = productos.map((elemento) => elemento.precio);
porCadaUno (precios, sumarTotal);
console.log("Nuestra empresa posee un total de: $" + total);