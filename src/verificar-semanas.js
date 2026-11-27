const ventasDiarias = require("./ventas-septiembre");

const {
    mejorSemanaBruta,
    mejorSemana
} = require("./analitica");

// Compara los resultados de ambas funciones
function compararSemanas(dias, k, nombre) {

    console.log(`\n--- ${nombre} ---`);

    const resultadoBruto = mejorSemanaBruta(dias, k);
    const resultadoOptimizado = mejorSemana(dias, k);

    console.log("Fuerza bruta:", resultadoBruto);
    console.log("Ventana deslizante:", resultadoOptimizado);

    console.log(
        "¿Los resultados coinciden?",
        JSON.stringify(resultadoBruto) === JSON.stringify(resultadoOptimizado)
    );
}

// Primera prueba: datos de septiembre
compararSemanas(ventasDiarias, 7, "Septiembre");

// Segunda prueba: 100.000 días generados aleatoriamente
const ventasGeneradas = Array.from(
    { length: 100000 },
    () => Math.floor(Math.random() * 1000) + 1
);

compararSemanas(ventasGeneradas, 7, "100.000 días generados");

// Medición de tiempos con los datos generados
console.log("\n--- MEDICIÓN DE TIEMPOS ---");

console.time("Fuerza bruta");
mejorSemanaBruta(ventasGeneradas, 7);
console.timeEnd("Fuerza bruta");

console.time("Ventana deslizante");
mejorSemana(ventasGeneradas, 7);
console.timeEnd("Ventana deslizante");