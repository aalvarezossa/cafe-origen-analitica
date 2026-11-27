const catalogo = require("./catalogo");

const {
    comboRegalo,
    comboRegaloMap
} = require("./analitica");

// Valores de las tarjetas que vamos a probar
const valores = [87000, 61000, 50000];

for (const valor of valores) {

    console.log(`\nBuscando combinación para $${valor.toLocaleString("es-CO")}`);

    const resultadoOriginal = comboRegalo(catalogo, valor);
    const resultadoOptimizado = comboRegaloMap(catalogo, valor);

    console.log("Fuerza bruta:", resultadoOriginal);
    console.log("Map:", resultadoOptimizado);
}