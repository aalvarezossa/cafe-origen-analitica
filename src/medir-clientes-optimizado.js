const { generarVentas } = require("./generador");

const {
    clientesRecurrentes,
    clientesRecurrentesSet,
    clientesRecurrentesMap
} = require("./analitica");

const tamaños = [1000, 10000, 100000];
const tabla = [];

// Mide cuánto tarda una función en ejecutarse
function medirTiempo(funcion, ventas) {
    const inicio = process.hrtime.bigint();

    funcion(ventas);

    const fin = process.hrtime.bigint();

    return Number(fin - inicio) / 1e6;
}

for (const n of tamaños) {
    console.log(`\nMidiendo ${n} ventas...`);

    const ventas = generarVentas(n);

    // Medimos la versión con Set
    const tiempoSet = medirTiempo(clientesRecurrentesSet, ventas);

    // Medimos la versión con Map
    const tiempoMap = medirTiempo(clientesRecurrentesMap, ventas);

    // Medimos la versión original solo con 1.000 ventas
    let tiempoOriginal = "No ejecutada";

    if (n === 1000) {
        tiempoOriginal = medirTiempo(clientesRecurrentes, ventas).toFixed(3);
    }

    tabla.push({
        ventas: n,
        original_ms: tiempoOriginal,
        set_ms: tiempoSet.toFixed(3),
        map_ms: tiempoMap.toFixed(3)
    });
}

console.table(tabla);