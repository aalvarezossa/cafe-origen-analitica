// ==========================================
// GENERADOR DE HISTORIALES DE VENTAS
// ==========================================

// Listas fijas de productos y precios
const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Molino manual", precio: 120000 }
];

// Lista fija de ciudades
const ciudades = [
    "Medellín",
    "Bogotá",
    "Cali",
    "Pereira",
    "Barranquilla"
];

// Genera un número entero aleatorio entre mínimo y máximo
function numeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

// Genera un historial de n ventas
function generarVentas(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("La cantidad de ventas debe ser un entero mayor o igual a cero.");
    }

    const ventas = [];

    // Entre 1 y n/3 clientes distintos
    const cantidadClientes = Math.max(1, Math.floor(n / 3));

    for (let i = 0; i < n; i++) {
        const producto = productos[numeroAleatorio(0, productos.length - 1)];

        const dia = numeroAleatorio(1, 30);
        const fecha = `2026-09-${String(dia).padStart(2, "0")}`;

        const venta = {
            id: i + 1,
            fecha: fecha,
            cliente: `C${String(numeroAleatorio(1, cantidadClientes)).padStart(3, "0")}`,
            producto: producto.nombre,
            ciudad: ciudades[numeroAleatorio(0, ciudades.length - 1)],
            cantidad: numeroAleatorio(1, 5),
            precio: producto.precio
        };

        ventas.push(venta);
    }

    return ventas;
}

module.exports = generarVentas;