const ventasDia1 = require("./datos");
const { generarVentas } = require("./generador");

const {
    clientesRecurrentes,
    clientesRecurrentesSet,
    clientesRecurrentesMap
} = require("./analitica");

// Compara los resultados sin importar el orden
function compararResultados(ventas, nombre) {
    const original = clientesRecurrentes(ventas);
    const resultadoSet = clientesRecurrentesSet(ventas);
    const resultadoMap = clientesRecurrentesMap(ventas);

    // Ordenamos los resultados para poder compararlos
    const originalOrdenado = [...original].sort();
    const setOrdenado = [...resultadoSet].sort();
    const mapOrdenado = [...resultadoMap].sort();

    console.log(`\n--- ${nombre} ---`);

    console.log("Original:", originalOrdenado);
    console.log("Set:", setOrdenado);
    console.log("Map:", mapOrdenado);

    console.log(
        "¿Las tres versiones coinciden?",
        JSON.stringify(originalOrdenado) === JSON.stringify(setOrdenado) &&
        JSON.stringify(originalOrdenado) === JSON.stringify(mapOrdenado)
    );
}

// Prueba con las 12 ventas del Día 1
compararResultados(ventasDia1, "Ventas del Día 1");

// Generamos 5.000 ventas
const ventasGeneradas = generarVentas(5000);

// Prueba con las ventas generadas
compararResultados(ventasGeneradas, "5.000 ventas generadas");