// ==========================================
// MINI RETO 3 - VERIFICACION
// ==========================================


// Importar los datos
const ventas = require("./datos");


// Importar funciones
const {
    totalVendido,
    totalVendidoM,

    unidadesVendidas,
    unidadesVendidasM,

    ventasPorCiudad,
    ventasPorCiudadM,

    clientesRecurrentes

} = require("./analitica");


// ==========================================
// FUNCION PARA COMPARAR RESULTADOS
// ==========================================

function verificar(nombre, resultadoCiclo, resultadoMetodo) {

    if (resultadoCiclo === resultadoMetodo) {

        console.log(nombre + ": OK");

    } else {

        console.log(nombre + ": DIFERENTE");

        console.log("Resultado ciclo:", resultadoCiclo);

        console.log("Resultado metodo:", resultadoMetodo);

    }

}


// ==========================================
// COMPARAR TOTAL VENDIDO
// ==========================================

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);


// ==========================================
// COMPARAR UNIDADES VENDIDAS
// ==========================================

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);


// ==========================================
// COMPARAR VENTAS POR CIUDAD
// ==========================================

verificar(
    "Ventas Medellin",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);


verificar(
    "Ventas Bogota",
    ventasPorCiudad(ventas, "Bogotá"),
    ventasPorCiudadM(ventas, "Bogotá")
);


verificar(
    "Ventas Cali",
    ventasPorCiudad(ventas, "Cali"),
    ventasPorCiudadM(ventas, "Cali")
);


verificar(
    "Ventas Pereira",
    ventasPorCiudad(ventas, "Pereira"),
    ventasPorCiudadM(ventas, "Pereira")
);

// ==========================================
// NUEVAS AGRUPACIONES Y RANKINGS
// ==========================================

const {
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");


// 1. TOTAL VENDIDO POR CIUDAD

console.log("\n===== TOTAL POR CIUDAD =====");

console.table(totalPorCiudad(ventas));


// 2. UNIDADES POR PRODUCTO

console.log("\n===== RANKING POR UNIDADES =====");

const rankingUnidades = Object.entries(unidadesPorProducto(ventas))
    .map(([producto, unidades]) => ({
        producto,
        unidades
    }))
    .sort((a, b) => b.unidades - a.unidades);

console.table(rankingUnidades);


// 3. TOP 3 PRODUCTOS POR VALOR

console.log("\n===== TOP 3 PRODUCTOS POR VALOR =====");

console.table(topProductosPorValor(ventas, 3));

//Día 2 - MiniReto6

console.log("Clientes recurrentes:", clientesRecurrentes(ventas));