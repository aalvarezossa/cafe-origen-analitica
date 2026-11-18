// ==========================================
// MINI RETO 2 - CAFE ORIGEN
// Indicadores basicos de negocio
// ==========================================


// 1. Calcular el valor de una venta
function valorVenta(venta) {

    return venta.cantidad * venta.precio;
}


// 2. Calcular el dinero total vendido
function totalVendido(ventas) {

    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }
    return total;
}


// 3. Calcular las unidades vendidas
function unidadesVendidas(ventas) {

    let totalUnidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            totalUnidades += venta.cantidad;
        }
    }

    return totalUnidades;

}


// 4. Encontrar la venta de mayor valor
function ventaMayor(ventas) {

    let ventaMaxima = null;
    let valorMaximo = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            const valorActual = valorVenta(venta);
            if (valorActual > valorMaximo) {
                valorMaximo = valorActual;
                ventaMaxima = venta;
            }
        }
    }

    return ventaMaxima;

}


// 5. Calcular el ticket promedio
function ticketPromedio(ventas) {

    let total = 0;
    let contador = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }
    return total / contador;
}


// 6. Calcular las ventas de una ciudad
function ventasPorCiudad(ventas, ciudad) {

    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {

        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (
            ciudadVenta === ciudadBuscada &&
            venta.cantidad > 0
        ) {

            total += valorVenta(venta);
        }
    }
    return total;
}


// Exportar las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};