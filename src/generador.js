const catalogo = [
{producto: "Origen Huila 500g", precio: 42000},
{producto: "Origen Nariño 250g", precio: 26000},
{producto: "Origen Sierra 500g", precio: 45000},
{producto: "Prensa francesa", precio: 95000},
{producto: "Molino manual", precio: 120000},
]

const ciudades = ["Medellín", "Cali", "Pereira", "Bogotá"]

function azarEntre(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min; //Math.random toma valores >= 0 y < 1. Math.floor aproxima los decimales al entero hacia abajo
}

function generarVentas(n) {
    const ventas =[];
    const maxCliente = Math.max(1, Math.floor(n/3)); // floor(n/3) redondea la divisón hacia abajo
    for (i=1; i<=n; i++) {
        const item = catalogo[azarEntre(0, catalogo.length-1)];
        const ciudad = ciudades[azarEntre(0, ciudades.length-1)];
        const numClientes = azarEntre(1, maxCliente);
        const dia = String(azarEntre(1, 30)).padStart(2, "0"); //padStart 2 parámetros: tamaño del texto y si no tiene este parámetro, con qué lo llena (0)
        const mes = String(azarEntre(9, 12)).padStart(2, "0");

        ventas.push({
            id: i,
            fecha: `2026-${mes}-${dia}`,
            cliente: `C${String(numClientes).padStart(2, "0")}`,
            producto: item.producto,
            ciudad: ciudad,
            cantidad: azarEntre(1, 5),
            precio: item.precio
        });
    }
    return ventas;
}

GPUShaderModule.exports = {generarVentas};