const ventasBase = require("./datos");
const generarVentas = require("./generador");
const catalogo = require("./catalogo");
const {
    totalVendidoM,
    unidadesVendidasM,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    clientesRecurrentesSet,
    productoEstrellaPorCiudad,
    comboRegaloMap,
    primerClienteUnico,
    mejorSemana
} = require("./analitica");

function serieDiariaDesdeVentas(ventas) {
    const porFecha = new Map();
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            const actual = porFecha.get(venta.fecha) || 0;
            porFecha.set(venta.fecha, actual + venta.cantidad * venta.precio);
        }
    }
    return [...porFecha.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, total]) => total);
}

const argCantidad = process.argv[2];
const cantidad = argCantidad ? Number(argCantidad) : null;

if (argCantidad && (!Number.isInteger(cantidad) || cantidad <= 0)) {
    console.error("Uso: node src/reporte.js [cantidad_ventas_positiva]");
    process.exit(1);
}

const ventas = cantidad ? generarVentas(cantidad) : ventasBase;
const origen = cantidad
    ? `${cantidad.toLocaleString("es-CO")} ventas generadas`
    : `datos base (${ventas.length} ventas)`;

console.time("Tiempo total reporte v1.0");

console.log(`cafe origen - reporte gerencial v1.0 (${origen})`);
console.log("--------------------------------------------------");

// Seccion 1: Resumen General
console.log("resumen general");
console.log(`total vendido: $${totalVendidoM(ventas).toLocaleString("es-CO")}`);
console.log(`unidades totales: ${unidadesVendidasM(ventas).toLocaleString("es-CO")}`);
console.log(`ticket promedio: $${Math.round(ticketPromedio(ventas)).toLocaleString("es-CO")}`);

// Seccion 2: Ventas agrupadas por ciudad
console.log("\nventas por ciudad");
const porCiudad = totalPorCiudad(ventas);
for (const [ciudad, total] of Object.entries(porCiudad)) {
    console.log(`${ciudad}: $${total.toLocaleString("es-CO")}`);
}

// Seccion 3: Unidades por producto
console.log("\nunidades por producto");
const porUnidades = unidadesPorProducto(ventas);
for (const [prod, unidades] of Object.entries(porUnidades)) {
    console.log(`${prod}: ${unidades} unidades`);
}

// Seccion 4: Top 3 productos por valor generado
console.log("\ntop 3 productos por valor generado");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((item, index) => {
    console.log(`${index + 1}. ${item.producto} -> $${item.total.toLocaleString("es-CO")}`);
});

// Seccion 5: Reporte diario especifico
console.log("\nreporte diario especifico");
const diaConVentas = ventasDelDia(ventas, "2026-09-01");
console.log(`dia con ventas (${diaConVentas.fecha}): transacciones ${diaConVentas.transacciones}, total $${diaConVentas.totalDinero.toLocaleString("es-CO")}`);
const diaSinVentas = ventasDelDia(ventas, "2026-09-10");
console.log(`dia sin ventas (${diaSinVentas.fecha}): transacciones ${diaSinVentas.transacciones}, total $${diaSinVentas.totalDinero.toLocaleString("es-CO")}`);

// Seccion 6: Clientes recurrentes (optimizado con Set)
console.log("\nclientes recurrentes");
const recurrentes = clientesRecurrentesSet(ventas);
console.log(recurrentes.length > 0 ? recurrentes.join(", ") : "ninguno");

// Seccion 7: Producto estrella por ciudad
console.log("\nproducto estrella por ciudad");
const estrellas = productoEstrellaPorCiudad(ventas);
for (const item of estrellas) {
    console.log(`${item.ciudad}: ${item.producto} (${item.apariciones} ventas)`);
}

// Seccion 8: Combo de regalo sugerido
console.log("\ncombo de regalo sugerido");
const valorCombo = 87000;
const combo = comboRegaloMap(catalogo, valorCombo);
console.log(
    combo
        ? `${combo[0].producto} ($${combo[0].precio.toLocaleString("es-CO")}) + ${combo[1].producto} ($${combo[1].precio.toLocaleString("es-CO")}) = $${valorCombo.toLocaleString("es-CO")}`
        : `sin combinacion exacta para $${valorCombo.toLocaleString("es-CO")}`
);

// Seccion 9: Cliente para cupon
console.log("\ncliente para cupon");
const clienteCupon = primerClienteUnico(ventas);
console.log(clienteCupon || "no hay cliente con compra unica");

// Seccion 10: Mejor semana
console.log("\nmejor semana");
const serieDiaria = serieDiariaDesdeVentas(ventas);
const tamanoVentana = Math.min(7, serieDiaria.length);
const mejor = tamanoVentana > 0 ? mejorSemana(serieDiaria, tamanoVentana) : null;
console.log(
    mejor
        ? `inicio dia ${mejor.diaInicio} (ventana ${tamanoVentana} dias): $${mejor.total.toLocaleString("es-CO")}`
        : "sin datos suficientes"
);

console.timeEnd("Tiempo total reporte v1.0");