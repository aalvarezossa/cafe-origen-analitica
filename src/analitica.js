// ==========================================
// MINIRETO 2: INDICADORES CON CICLOS
// ==========================================

// Calcula el valor total de una venta
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// Calcula el dinero total vendido
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

// Calcula las unidades totales vendidas
function unidadesVendidas(ventas) {
    let totalUnidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            totalUnidades += venta.cantidad;
        }
    }

    return totalUnidades;
}

// Encuentra la venta de mayor valor
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

// Calcula el promedio de las ventas válidas
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

// Calcula las ventas de una ciudad específica
function ventasPorCiudad(ventas, ciudad) {
    let total = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada && venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}


// ==========================================
// MINIRETO 3: MÉTODOS DE ARREGLOS
// ==========================================

// Calcula el dinero total vendido usando métodos
function totalVendidoM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

// Calcula las unidades vendidas usando métodos
function unidadesVendidasM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => total + cantidad, 0);
}

// Calcula las ventas de una ciudad usando métodos
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta =>
            venta.cantidad > 0 &&
            venta.ciudad.trim().toLowerCase() === ciudadBuscada
        )
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

// Agrupa el dinero vendido por ciudad
function totalPorCiudad(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((acumulador, venta) => {
            const ciudad = venta.ciudad.trim();

            const ciudadNormalizada =
                ciudad.charAt(0).toUpperCase() +
                ciudad.slice(1).toLowerCase();

            if (!acumulador[ciudadNormalizada]) {
                acumulador[ciudadNormalizada] = 0;
            }

            acumulador[ciudadNormalizada] += valorVenta(venta);

            return acumulador;
        }, {});
}

// Agrupa las unidades vendidas por producto
function unidadesPorProducto(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((acumulador, venta) => {
            const producto = venta.producto;

            if (!acumulador[producto]) {
                acumulador[producto] = 0;
            }

            acumulador[producto] += venta.cantidad;

            return acumulador;
        }, {});
}

// Obtiene los productos que más dinero generan
function topProductosPorValor(ventas, k) {
    const productosAgrupados = ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((acumulador, venta) => {
            const producto = venta.producto;

            if (!acumulador[producto]) {
                acumulador[producto] = 0;
            }

            acumulador[producto] += valorVenta(venta);

            return acumulador;
        }, {});

    return Object.entries(productosAgrupados)
        .map(([producto, total]) => ({
            producto: producto,
            totalVendido: total
        }))
        .sort((a, b) => b.totalVendido - a.totalVendido)
        .slice(0, Math.max(0, k));
}


// ==========================================
// EXPORTACIÓN DE FUNCIONES
// ==========================================

module.exports = {
    // MiniReto 2
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,

    // MiniReto 3
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};