// Importamos el generador de ventas
const { generarVentas } = require("./generador");

// Importamos la función clientesRecurrentes desde analitica.js
const { clientesRecurrentes } = require("./analitica");

// Definimos los tamaños duplicados a probar
const muestra = [1000, 2000, 4000, 8000, 16000];

// Creamos el arreglo vacío donde se guardará cada fila de la tabla
const tabla = [];

// Recorremos cada tamaño de entrada n
for (const n of muestra) {

    // Generamos un arreglo nuevo con n ventas aleatorias
    const ventas = generarVentas(n);

    // Definimos una etiqueta única para identificar cada medición
    const etiqueta = `clientesRecurrentes n=${n}`;

    // Iniciamos el cronómetro de consola
    console.time(etiqueta);

    // Marcamos el inicio de la medición en nanosegundos
    const inicio = process.hrtime.bigint();

    // Ejecutamos la función que queremos medir
    clientesRecurrentes(ventas);

    // Marcamos el final de la medición
    const fin = process.hrtime.bigint();

    // Detenemos el cronómetro de consola
    console.timeEnd(etiqueta);

    // Convertimos la duración de nanosegundos a milisegundos
    const ms = Number(fin - inicio) / 1e6;

    // Agregamos el resultado del tamaño actual a la tabla
    tabla.push({
        n,
        tiempo_ms: Number(ms.toFixed(3))
    });
}

// Imprimimos la tabla comparativa en consola
console.table(tabla);