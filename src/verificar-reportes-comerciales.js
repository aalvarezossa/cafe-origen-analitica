const ventas = require("./datos");

const {
    productoEstrellaPorCiudad,
    primerClienteUnico
} = require("./analitica");

// Producto estrella por ciudad
console.log("PRODUCTO ESTRELLA POR CIUDAD");

const estrellas = productoEstrellaPorCiudad(ventas);

console.table(estrellas);

// Primer cliente que compró una sola vez
console.log("\nPRIMER CLIENTE CON UNA SOLA COMPRA");

const cliente = primerClienteUnico(ventas);

console.log(cliente);