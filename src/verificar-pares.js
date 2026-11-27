const catalogo = require("./catalogo");

const { parMasCercano } = require("./analitica");

const presupuestos = [100000, 140000, 40000];

for (const presupuesto of presupuestos) {

    console.log(`\nPresupuesto: $${presupuesto.toLocaleString("es-CO")}`);

    const resultado = parMasCercano(catalogo, presupuesto);

    if (resultado === null) {
        console.log("No existe una combinación posible.");
    } else {
        console.log("Productos:", resultado.productos);
        console.log("Total:", resultado.total);
    }
}