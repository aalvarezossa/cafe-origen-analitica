const { generarVentas } = require("./generador");

const {
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./analitica");

// Generamos 10.000 ventas
const ventas = generarVentas(10000);

// Elegimos una ciudad para hacer la comparación
const ciudad = "Medellín";

// Ejecutamos ambas funciones
const resultadoCadena = totalCiudadCadena(ventas, ciudad);
const resultadoUnaPasada = totalCiudadUnaPasada(ventas, ciudad);

// Mostramos los resultados
console.log("Resultado con métodos encadenados:", resultadoCadena);
console.log("Resultado con una pasada:", resultadoUnaPasada);

// Comprobamos si los resultados son iguales
console.log(
    "¿Los resultados coinciden?",
    resultadoCadena === resultadoUnaPasada
);