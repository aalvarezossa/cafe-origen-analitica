// ==========================================
// MINIRETO 4: REPORTE DE NEGOCIO
// ==========================================

const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    ventaMayor,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");


// ==========================================
// FORMATO DE VALORES
// ==========================================

function formatoPesos(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function mostrarTitulo(titulo) {
    console.log("\n" + "=".repeat(55));
    console.log(titulo);
    console.log("=".repeat(55));
}

function mostrarDato(nombre, valor) {
    console.log(nombre.padEnd(30) + valor);
}


// ==========================================
// 1. RESUMEN GENERAL
// ==========================================

mostrarTitulo("1. RESUMEN GENERAL");

mostrarDato("Total vendido:", formatoPesos(totalVendido(ventas)));
mostrarDato("Unidades vendidas:", unidadesVendidas(ventas).toString());
mostrarDato("Ticket promedio:", formatoPesos(ticketPromedio(ventas)));

const mayorVenta = ventaMayor(ventas);

mostrarDato(
    "Venta de mayor valor:",
    mayorVenta ? formatoPesos(mayorVenta.cantidad * mayorVenta.precio) : "$0"
);


// ==========================================
// 2. VENTAS POR CIUDAD
// ==========================================

mostrarTitulo("2. VENTAS POR CIUDAD");

const ciudades = Object.entries(totalPorCiudad(ventas))
    .sort((a, b) => b[1] - a[1]);

for (const [ciudad, total] of ciudades) {
    mostrarDato(ciudad + ":", formatoPesos(total));
}


// ==========================================
// 3. UNIDADES POR PRODUCTO
// ==========================================

mostrarTitulo("3. UNIDADES POR PRODUCTO");

const productos = Object.entries(unidadesPorProducto(ventas))
    .sort((a, b) => b[1] - a[1]);

for (const [producto, unidades] of productos) {
    mostrarDato(producto + ":", unidades.toString());
}


// ==========================================
// 4. TOP 3 PRODUCTOS POR VALOR
// ==========================================

mostrarTitulo("4. TOP 3 PRODUCTOS POR VALOR");

const topProductos = topProductosPorValor(ventas, 3);

topProductos.forEach((producto, indice) => {
    console.log(
        `${indice + 1}. ${producto.producto.padEnd(30)}${formatoPesos(producto.totalVendido)}`
    );
});


// ==========================================
// 5. RESUMEN POR DÍA
// ==========================================

mostrarTitulo("5. RESUMEN DE UN DÍA CON VENTAS");

const resumenDiaConVentas = ventasDelDia(ventas, "2026-09-01");

mostrarDato("Fecha:", resumenDiaConVentas.fecha);
mostrarDato("Cantidad de ventas:", resumenDiaConVentas.cantidadVentas.toString());
mostrarDato("Unidades vendidas:", resumenDiaConVentas.unidades.toString());
mostrarDato("Total vendido:", formatoPesos(resumenDiaConVentas.totalVendido));
mostrarDato("Ticket promedio:", formatoPesos(resumenDiaConVentas.ticketPromedio));


mostrarTitulo("6. RESUMEN DE UN DÍA SIN VENTAS");

const resumenDiaSinVentas = ventasDelDia(ventas, "2026-09-07");

mostrarDato("Fecha:", resumenDiaSinVentas.fecha);
mostrarDato("Cantidad de ventas:", resumenDiaSinVentas.cantidadVentas.toString());
mostrarDato("Unidades vendidas:", resumenDiaSinVentas.unidades.toString());
mostrarDato("Total vendido:", formatoPesos(resumenDiaSinVentas.totalVendido));
mostrarDato("Ticket promedio:", formatoPesos(resumenDiaSinVentas.ticketPromedio));


console.log("\n" + "=".repeat(55));
console.log("FIN DEL REPORTE - CAFÉ ORIGEN v0.1");
console.log("=".repeat(55));

// PRUEBA DE NORMALIZACIÓN DE CIUDADES

const ventasPruebaCiudades = [
    {
        ciudad: "Bogotá",
        cantidad: 1,
        precio: 10000
    },
    {
        ciudad: " bogotá ",
        cantidad: 2,
        precio: 10000
    },
    {
        ciudad: "BOGOTÁ",
        cantidad: 1,
        precio: 10000
    }
];

console.log("\n===== PRUEBA DE CIUDADES =====");
console.table(totalPorCiudad(ventasPruebaCiudades));

// PRUEBA DE DÍA SIN VENTAS

console.log("\n===== PRUEBA DE DÍA SIN VENTAS =====");
console.log(ventasDelDia(ventas, "2026-09-07"));