// ==========================================
// IMPORTACIONES
// ==========================================

const ventas = require("./datos");

const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
} = require("./analitica");


// ==========================================
// MINI RETO 1: EXPLORACION DE DATOS
// ==========================================

console.log("\n===== EXPLORACION DE DATOS =====");

console.log("Cantidad de registros:", ventas.length);

console.log("\nPrimer registro:");
console.log(ventas[0]);

console.log("\nUltimo registro:");
console.log(ventas[ventas.length - 1]);

console.log("\nProducto en la posicion 4:");
console.log(ventas[3].producto);

console.log("\nTabla completa:");
console.table(ventas);


// ==========================================
// MINI RETO 2: PRUEBAS DE INDICADORES
// ==========================================

// Preparar los tres escenarios

const ventaUnica = [ventas[0]];

const ventasVacias = [];


// 1. VALOR DE UNA VENTA

console.log("\n===== VALOR DE UNA VENTA =====");

console.log("Venta individual:", valorVenta(ventas[0]));


// 2. TOTAL VENDIDO

console.log("\n===== TOTAL VENDIDO =====");

console.log("Arreglo completo:", totalVendido(ventas));

console.log("Una venta:", totalVendido(ventaUnica));

console.log("Arreglo vacio:", totalVendido(ventasVacias));


// 3. UNIDADES VENDIDAS

console.log("\n===== UNIDADES VENDIDAS =====");

console.log("Arreglo completo:", unidadesVendidas(ventas));

console.log("Una venta:", unidadesVendidas(ventaUnica));

console.log("Arreglo vacio:", unidadesVendidas(ventasVacias));


// 4. VENTA MAYOR

console.log("\n===== VENTA MAYOR =====");

console.log("Arreglo completo:", ventaMayor(ventas));

console.log("Una venta:", ventaMayor(ventaUnica));

console.log("Arreglo vacio:", ventaMayor(ventasVacias));


// 5. TICKET PROMEDIO

console.log("\n===== TICKET PROMEDIO =====");

console.log("Arreglo completo:", ticketPromedio(ventas));

console.log("Una venta:", ticketPromedio(ventaUnica));

console.log("Arreglo vacio:", ticketPromedio(ventasVacias));


// 6. VENTAS POR CIUDAD

console.log("\n===== VENTAS POR CIUDAD =====");

console.log("Medellin:", ventasPorCiudad(ventas, "Medellín"));

console.log("medellin:", ventasPorCiudad(ventas, "medellín"));

console.log("Una venta:", ventasPorCiudad(ventaUnica, "Medellín"));

console.log("Arreglo vacio:", ventasPorCiudad(ventasVacias, "Medellín"));