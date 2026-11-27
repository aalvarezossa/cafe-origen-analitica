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

//DÍA 3

//MiniReto 10:
// Busca dos productos que sumen el valor de la tarjeta
// utilizando fuerza bruta
function comboRegalo(catalogo, valor) {

    // Primer ciclo: selecciona el primer producto
    for (let i = 0; i < catalogo.length; i++) {

        // Segundo ciclo: selecciona el segundo producto
        for (let j = i + 1; j < catalogo.length; j++) {

            const suma = catalogo[i].precio + catalogo[j].precio;

            if (suma === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }

    return null;
}

// Busca dos productos que sumen el valor de la tarjeta
// utilizando Map
function comboRegaloMap(catalogo, valor) {

    // Guarda los precios que ya hemos encontrado
    const preciosVistos = new Map();

    // Recorremos el catálogo una sola vez
    for (const producto of catalogo) {

        // Calculamos cuánto falta para completar la tarjeta
        const complemento = valor - producto.precio;

        // Preguntamos si ese complemento ya apareció
        if (preciosVistos.has(complemento)) {

            // Recuperamos el producto que tenía ese precio
            const productoEncontrado = preciosVistos.get(complemento);

            return [productoEncontrado, producto];
        }

        // Guardamos el producto actual utilizando su precio como clave
        preciosVistos.set(producto.precio, producto);
    }

    // Si terminamos el recorrido sin encontrar pareja
    return null;
}

// Encuentra el producto más vendido de cada ciudad
function productoEstrellaPorCiudad(ventas) {

    // Aquí guardaremos las ciudades y sus productos
    const conteoCiudades = new Map();

    // Primer recorrido: contamos las apariciones
    for (const venta of ventas) {

        const ciudad = venta.ciudad;
        const producto = venta.producto;

        // Si la ciudad todavía no existe, creamos su Map
        if (!conteoCiudades.has(ciudad)) {
            conteoCiudades.set(ciudad, new Map());
        }

        // Recuperamos el Map de productos de esa ciudad
        const conteoProductos = conteoCiudades.get(ciudad);

        // Obtenemos las apariciones actuales del producto
        const cantidadActual = conteoProductos.get(producto) || 0;

        // Aumentamos su contador
        conteoProductos.set(producto, cantidadActual + 1);
    }

    // Aquí guardaremos el producto estrella de cada ciudad
    const resultados = [];

    // Segundo recorrido: encontramos el producto más frecuente
    for (const [ciudad, productos] of conteoCiudades) {

        let productoEstrella = null;
        let mayorCantidad = 0;

        for (const [producto, cantidad] of productos) {

            if (cantidad > mayorCantidad) {
                mayorCantidad = cantidad;
                productoEstrella = producto;
            }
        }

        resultados.push({
            ciudad,
            producto: productoEstrella,
            apariciones: mayorCantidad
        });
    }

    return resultados;
}

// Encuentra el primer cliente que compró una sola vez
function primerClienteUnico(ventas) {

    // Guardamos cuántas compras realizó cada cliente
    const comprasPorCliente = new Map();

    // Primer recorrido: contamos las compras
    for (const venta of ventas) {

        const cliente = venta.cliente;

        const cantidadActual = comprasPorCliente.get(cliente) || 0;

        comprasPorCliente.set(cliente, cantidadActual + 1);
    }

    // Segundo recorrido: buscamos al primer cliente con una compra
    for (const venta of ventas) {

        const cliente = venta.cliente;

        if (comprasPorCliente.get(cliente) === 1) {
            return cliente;
        }
    }

    // Si todos compraron más de una vez
    return null;
}

//MiniReto 11
// Encuentra la mejor semana sumando cada bloque desde cero
function mejorSemanaBruta(dias, k) {

    // Validamos que exista una ventana válida
    if (k <= 0 || k > dias.length) {
        return null;
    }

    let mejorTotal = -Infinity;
    let mejorInicio = 0;

    // Recorremos todas las posiciones donde puede iniciar una semana
    for (let i = 0; i <= dias.length - k; i++) {

        let total = 0;

        // Sumamos nuevamente los k días de esa semana
        for (let j = i; j < i + k; j++) {
            total += dias[j];
        }

        // Comparamos el total encontrado con el máximo actual
        if (total > mejorTotal) {
            mejorTotal = total;
            mejorInicio = i;
        }
    }

    return {
        total: mejorTotal,
        diaInicio: mejorInicio + 1
    };
}

// Encuentra la mejor semana utilizando ventana deslizante
function mejorSemana(dias, k) {

    // Validamos que exista una ventana válida
    if (k <= 0 || k > dias.length) {
        return null;
    }

    // Calculamos el total de la primera ventana
    let totalActual = 0;

    for (let i = 0; i < k; i++) {
        totalActual += dias[i];
    }

    // Inicializamos el mejor resultado con la primera semana
    let mejorTotal = totalActual;
    let mejorInicio = 0;

    // Desplazamos la ventana por los días restantes
    for (let i = k; i < dias.length; i++) {

        // Agregamos el día que entra
        totalActual += dias[i];

        // Restamos el día que sale
        totalActual -= dias[i - k];

        // Comparamos el nuevo total con el máximo
        if (totalActual > mejorTotal) {
            mejorTotal = totalActual;
            mejorInicio = i - k + 1;
        }
    }

    return {
        total: mejorTotal,
        diaInicio: mejorInicio + 1
    };
}

// Encuentra dos productos cuya suma sea lo más cercana posible
// al presupuesto sin superarlo
function parMasCercano(precios, presupuesto) {

    // Creamos una copia ordenada para no modificar el catálogo original
    const ordenados = [...precios].sort(
        (a, b) => a.precio - b.precio
    );

    // Puntero al producto más económico
    let izquierda = 0;

    // Puntero al producto más costoso
    let derecha = ordenados.length - 1;

    // Guarda la mejor combinación encontrada
    let mejorPar = null;
    let mejorSuma = -Infinity;

    // Movemos los punteros hasta que se crucen
    while (izquierda < derecha) {

        const suma =
            ordenados[izquierda].precio +
            ordenados[derecha].precio;

        // Si no supera el presupuesto, es una combinación válida
        if (suma <= presupuesto) {

            // Comprobamos si es mejor que la combinación anterior
            if (suma > mejorSuma) {
                mejorSuma = suma;

                mejorPar = {
                    productos: [
                        ordenados[izquierda],
                        ordenados[derecha]
                    ],
                    total: suma
                };
            }

            // Buscamos una combinación de mayor valor
            izquierda++;

        } else {

            // La suma supera el presupuesto.
            // Reducimos el valor moviendo el puntero derecho.
            derecha--;
        }
    }

    return mejorPar;
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
    clientesRecurrentesMap,

    //MiniReto 10
    comboRegalo,
    comboRegaloMap,
    productoEstrellaPorCiudad,
    primerClienteUnico,

    //MiniReto 11
    mejorSemanaBruta,
    mejorSemana,
    parMasCercano
};