const analitica = require("./analitica");
const { generarVentas } = require("./generador");

const muestra = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of muestra) {
    const lote = generarVentas(n);
    const contadorTotal = { ops: 0 };
    const contadorMayor = { ops: 0 };
    const contadorCiudad = { ops: 0 };
    const contadorPrimera = { ops: 0 };

    analitica.totalVendidoInstrumentada(lote, contadorTotal);
    analitica.ventaMayorInstrumentada(lote, contadorMayor);
    analitica.totalPorCiudadInstrumentada(lote, contadorCiudad);
    analitica.primeraVenta(lote, contadorPrimera);

    resultados.push({
        tamLote: n,
        primeraVenta: contadorPrimera.ops,
        totalVendido: contadorTotal.ops,
        ventaMayor: contadorMayor.ops,
        totalPorCiudad: contadorCiudad.ops
    });
}

console.table(resultados);