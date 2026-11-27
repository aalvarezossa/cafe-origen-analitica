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
} ////////AQUÍ VAMOSSSSSS

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
// MINIRETO 4: ANÁLISIS POR FECHA
// ==========================================

// Genera un resumen de las ventas de un día específico
function ventasDelDia(ventas, fecha) {
    const ventasDelDia = ventas.filter(venta =>
        venta.fecha === fecha && venta.cantidad > 0
    );

    const total = ventasDelDia.reduce(
        (acumulador, venta) => acumulador + valorVenta(venta),
        0
    );

    const unidades = ventasDelDia.reduce(
        (acumulador, venta) => acumulador + venta.cantidad,
        0
    );

    const cantidadVentas = ventasDelDia.length;

    const ticketPromedio = cantidadVentas === 0
        ? 0
        : total / cantidadVentas;

    return {
        fecha,
        cantidadVentas,
        unidades,
        totalVendido: total,
        ticketPromedio
    };
}

// FUNCIONES INSTRUMENTADAS DÍA 2

function totalVendidoInstrumentada(ventas, contador) {
    let total = 0;

    for (const v of ventas) {
        contador.ops++; // Visitar un elemento
        contador.ops++; // Comparar cantidad

        if (v.cantidad > 0) {
            total += valorVenta(v);
        }
    }

    return total;
}

function ventaMayorInstrumentada(ventas, contador) {
    let ventaMaxima = null;
    let valorMaximo = 0;

    for (const venta of ventas) {
        contador.ops++; // se visita un elemento de ventas

        contador.ops++; // se evalúa si la venta tiene cantidad válida
        if (venta.cantidad > 0) {
            const valorActual = valorVenta(venta);

            contador.ops++; // se compara con el máximo actual
            if (valorActual > valorMaximo) {
                valorMaximo = valorActual;
                ventaMaxima = venta;
            }
        }
    }

    return ventaMaxima;
}

function totalPorCiudadInstrumentada(ventas, contador) {
    return ventas
        .filter(venta => {
            contador.ops++; // Visitar elemento
            contador.ops++; // Comparar cantidad

            return venta.cantidad > 0;
        })
        .reduce((acumulador, venta) => {
            contador.ops++; // Visitar elemento en reduce
            contador.ops++; // Comprobar si la ciudad existe

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

function primeraVenta(ventas, contador) {
    contador.ops++; // Comparar si existen ventas

    if (ventas.length === 0) {
        return null;
    }

    contador.ops++; // Acceder a la primera venta

    return ventas[0];
}

// MINIRETO 6: CLIENTES RECURRENTES

function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {

            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}

// Identifica clientes recurrentes utilizando Set
function clientesRecurrentesSet(ventas) {
    // Guarda los clientes que ya hemos encontrado
    const vistos = new Set();

    // Guarda los clientes que aparecen más de una vez
    const recurrentes = new Set();

    // Recorremos las ventas una sola vez
    for (const venta of ventas) {
        const cliente = venta.cliente;

        // Si el cliente ya estaba en vistos, es recurrente
        if (vistos.has(cliente)) {
            recurrentes.add(cliente);
        } else {
            // Si es la primera vez, lo guardamos
            vistos.add(cliente);
        }
    }

    // Convertimos el Set en un arreglo para devolver el resultado
    return [...recurrentes];
}

// Cuenta cuántas compras realizó cada cliente
function comprasPorCliente(ventas) {
    const compras = new Map();

    for (const venta of ventas) {
        const cliente = venta.cliente;

        // Obtenemos la cantidad de compras que tiene el cliente
        const cantidadActual = compras.get(cliente) || 0;

        // Guardamos la cantidad actualizada
        compras.set(cliente, cantidadActual + 1);
    }

    return compras;
}

//MINIRETO 7: TIEMPO, MEMORIA Y CADENAS DE MÉTODOS
// Versión 1: utiliza métodos encadenados
function totalCiudadCadena(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    const ventasNormalizadas = ventas.map(venta => ({
        ...venta,
        ciudad: venta.ciudad.trim().toLowerCase()
    }));

    const ventasFiltradas = ventasNormalizadas.filter(
        venta => venta.ciudad === ciudadBuscada
    );

    const valores = ventasFiltradas.map(venta => valorVenta(venta));

    const total = valores.reduce(
        (acumulado, valor) => acumulado + valor,
        0
    );

    return total;
}

// Obtiene los clientes que realizaron más de una compra
function clientesRecurrentesMap(ventas) {
    const compras = comprasPorCliente(ventas);
    const recurrentes = [];

    for (const [cliente, cantidad] of compras) {
        if (cantidad > 1) {
            recurrentes.push(cliente);
        }
    }

    return recurrentes;
}

// Versión 2: utiliza un solo ciclo
function totalCiudadUnaPasada(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();
    let total = 0;

    for (let i = 0; i < ventas.length; i++) {
        const ciudadActual = ventas[i].ciudad.trim().toLowerCase();

        if (ciudadActual === ciudadBuscada) {
            total += valorVenta(ventas[i]);
        }
    }

    return total;
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
    topProductosPorValor,

    // MiniReto 4
    ventasDelDia,

    // MiniReto 5
    totalVendidoInstrumentada,
    ventaMayorInstrumentada,
    totalPorCiudadInstrumentada,
    primeraVenta,

    //MiniReto 6
    clientesRecurrentes,

    //MiniReto 7
    totalCiudadCadena,
    totalCiudadUnaPasada,

    //MiniReto 9
    clientesRecurrentesSet,
    comprasPorCliente,
    clientesRecurrentesMap
};