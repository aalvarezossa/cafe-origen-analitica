# Bitácora - Café Origen Analítica

## MiniReto 1:

### 1. Plan de trabajo

1. Crear la estructura inicial del proyecto.
2. Inicializar Git y conectar el repositorio con GitHub.
3. Representar las 12 ventas mediante un arreglo de objetos.
4. Importar los datos desde explorar.js.
5. Inspeccionar los registros utilizando métodos de consola.
6. Identificar problemas de calidad en los datos.

### 2. Diccionario de datos

| Propiedad | Tipo de dato | Significado |
|---|---|---|
| id | Number | Identificador único de cada venta. |
| fecha | String | Fecha en la que se realizó la venta. |
| cliente | String | Código que identifica al cliente. |
| producto | String | Nombre del producto vendido. |
| ciudad | String | Ciudad donde se realizó la venta. |
| cantidad | Number | Cantidad de unidades vendidas. |
| precio | Number | Precio unitario del producto. |

### 3. Casos borde detectados

**Caso 1: Diferencia en el nombre de las ciudades**

Se encontró que Medellín aparece escrita de dos maneras: "Medellín" y "medellín".

Decisión: Mantener los datos originales en el módulo de datos y normalizar los nombres de las ciudades durante los análisis, convirtiendo los textos a un formato uniforme.

**Caso 2: Cantidad igual a cero**

La venta con ID 8 tiene una cantidad de 0 unidades.

Decisión: Conservar el registro original, pero excluirlo de los cálculos de unidades vendidas e ingresos, ya que no representa una venta efectiva.

**Caso 3: Clientes repetidos**

Los códigos C01, C02 y C03 aparecen en diferentes registros.

Decisión: No eliminar estos registros, porque un mismo cliente puede realizar varias compras. Se conservarán para poder analizar posteriormente las compras recurrentes.

### 4. Pruebas realizadas

- Se verificó que el arreglo contiene 12 registros.
- Se comprobó el primer registro.
- Se comprobó el último registro.
- Se verificó el producto ubicado en la posición 4.
- Se visualizó la tabla completa utilizando console.table().

### 5. Decisiones técnicas

Se utilizó module.exports para exportar el arreglo de ventas y require() para importarlo desde otros archivos.

Se decidió conservar los datos originales para evitar modificar accidentalmente el historial de ventas.

## MiniReto 2:

FUNCIÓN valorVenta(venta)

    MULTIPLICAR venta.cantidad POR venta.precio

    DEVOLVER resultado

FIN FUNCIÓN

FUNCIÓN totalVendido(ventas)

    INICIAR acumulador EN 0

    PARA CADA venta EN ventas

        SI venta.cantidad ES MAYOR QUE 0

            SUMAR valorVenta(venta) AL acumulador

        FIN SI

    FIN PARA

    DEVOLVER acumulador

FIN FUNCIÓN

FUNCIÓN unidadesVendidas(ventas)

    INICIAR acumulador EN 0

    PARA CADA venta EN ventas

        SI venta.cantidad ES MAYOR QUE 0

            SUMAR venta.cantidad AL acumulador

        FIN SI

    FIN PARA

    DEVOLVER acumulador

FIN FUNCIÓN

FUNCIÓN ventaMayor(ventas)

    INICIAR ventaMaxima EN null
    INICIAR valorMaximo EN 0

    PARA CADA venta EN ventas

        SI venta.cantidad ES MAYOR QUE 0

            CALCULAR valorVenta(venta)

            SI valorVenta ES MAYOR QUE valorMaximo

                ACTUALIZAR valorMaximo
                ACTUALIZAR ventaMaxima

            FIN SI

        FIN SI

    FIN PARA

    DEVOLVER ventaMaxima

FIN FUNCIÓN

FUNCIÓN ticketPromedio(ventas)

    INICIAR total EN 0
    INICIAR contador EN 0

    PARA CADA venta EN ventas

        SI venta.cantidad ES MAYOR QUE 0

            SUMAR valorVenta(venta) AL total

            AUMENTAR contador EN 1

        FIN SI

    FIN PARA

    SI contador ES IGUAL A 0

        DEVOLVER 0

    FIN SI

    DEVOLVER total / contador

FIN FUNCIÓN

FUNCIÓN ventasPorCiudad(ventas, ciudad)

    INICIAR acumulador EN 0

    NORMALIZAR nombre de ciudad recibida

    PARA CADA venta EN ventas

        NORMALIZAR ciudad del registro

        SI ambas ciudades son iguales
        Y venta.cantidad ES MAYOR QUE 0

            SUMAR valorVenta(venta) AL acumulador

        FIN SI

    FIN PARA

    DEVOLVER acumulador

FIN FUNCIÓN

## MiniReto 2: Indicadores básicos de negocio

### 1. Plan en pseudocódigo

Se diseñaron seis funciones:

- valorVenta(): multiplica cantidad por precio.
- totalVendido(): acumula el valor de las ventas válidas.
- unidadesVendidas(): acumula las unidades vendidas.
- ventaMayor(): identifica el registro con mayor valor.
- ticketPromedio(): divide el total vendido entre las compras válidas.
- ventasPorCiudad(): acumula las ventas correspondientes a una ciudad.

Se utilizaron ciclos for...of para recorrer los registros.

### 2. Patrones utilizados

**Acumulador:**
Se utilizó para sumar el dinero y las unidades vendidas.

**Contador:**
Se utilizó en ticketPromedio() para contar las compras válidas.

**Máximo:**
Se utilizó en ventaMayor() para identificar la venta de mayor valor.

### 3. Casos borde y decisiones

- Las ventas con cantidad igual o inferior a cero no participan en los indicadores.
- Si el arreglo está vacío, los acumuladores devuelven 0.
- ventaMayor() devuelve null cuando no existen ventas válidas.
- ticketPromedio() devuelve 0 cuando no existen compras válidas.
- La comparación de ciudades ignora mayúsculas y espacios sobrantes.

### 4. Tabla de traza: totalVendido()

| ID | Valor | Acumulado |
|---|---:|---:|
| 1 | 84000 | 84000 |
| 2 | 26000 | 110000 |
| 3 | 95000 | 205000 |
| 4 | 42000 | 247000 |
| 5 | 135000 | 382000 |
| 6 | 52000 | 434000 |
| 7 | 120000 | 554000 |
| 8 | 0 | 554000 |
| 9 | 90000 | 644000 |
| 10 | 168000 | 812000 |
| 11 | 95000 | 907000 |
| 12 | 78000 | 985000 |

Resultado: 985000.

### 5. Tabla de traza: unidadesVendidas()

| ID | Cantidad | Acumulado |
|---|---:|---:|
| 1 | 2 | 2 |
| 2 | 1 | 3 |
| 3 | 1 | 4 |
| 4 | 1 | 5 |
| 5 | 3 | 8 |
| 6 | 2 | 10 |
| 7 | 1 | 11 |
| 8 | 0 | 11 |
| 9 | 2 | 13 |
| 10 | 4 | 17 |
| 11 | 1 | 18 |
| 12 | 3 | 21 |

Resultado: 21 unidades.

### 6. Resultados obtenidos

| Indicador | Resultado |
|---|---:|
| Total vendido | $985.000 |
| Unidades vendidas | 21 |
| Venta mayor | $168.000 |
| Ticket promedio | $89.545,45 |
| Ventas Medellín | $356.000 |
| Ventas Bogotá | $276.000 |
| Ventas Cali | $185.000 |
| Ventas Pereira | $168.000 |

### 7. Pruebas realizadas

Se probaron las funciones con:

- El arreglo completo de 12 registros.
- Un arreglo de un solo registro.
- Un arreglo vacío.

Los resultados obtenidos coincidieron con los cálculos manuales.

### 8. Decisiones técnicas

Se creó el módulo analitica.js para centralizar las funciones de análisis.

Se utilizó module.exports para exportar las funciones y require() para importarlas desde pruebas.js.

Se decidió mantener los ciclos for...of para comprender los patrones de recorrido, acumulación, conteo y máximo antes de utilizar métodos de arreglos.

## MiniReto 3: Métodos de arreglos, agrupaciones y rankings

### 1. Plan de trabajo

Se implementaron nuevas versiones de los indicadores del MiniReto 2 utilizando métodos de arreglos.

También se crearon funciones para agrupar las ventas por ciudad, agrupar unidades por producto y generar un ranking de los productos que más dinero generan.

### 2. Funciones implementadas

**totalVendidoM(ventas)**

- ¿Qué recorro?: El arreglo de ventas.
- ¿Qué filtro?: Ventas con cantidad mayor que cero.
- ¿Qué transformo?: Cada venta en su valor monetario mediante map().
- ¿Qué acumulo?: El dinero generado por las ventas mediante reduce().

**unidadesVendidasM(ventas)**

- ¿Qué recorro?: El arreglo de ventas.
- ¿Qué filtro?: Ventas con cantidad mayor que cero.
- ¿Qué transformo?: Cada venta en su cantidad de unidades.
- ¿Qué acumulo?: El total de unidades vendidas.

**ventasPorCiudadM(ventas, ciudad)**

- ¿Qué recorro?: El arreglo de ventas.
- ¿Qué filtro?: Ventas válidas que coincidan con la ciudad solicitada.
- ¿Qué transformo?: Cada venta en su valor monetario.
- ¿Qué acumulo?: El dinero generado en la ciudad seleccionada.
- ¿Cómo comparo?: Normalizo los nombres con trim() y toLowerCase().

**totalPorCiudad(ventas)**

- ¿Qué recorro?: Todas las ventas.
- ¿Qué filtro?: Registros con cantidad mayor que cero.
- ¿Qué transformo?: Normalizo los nombres de las ciudades.
- ¿Qué acumulo?: El dinero generado por cada ciudad.
- ¿Cómo agrupo?: Utilizo reduce() para crear un objeto cuyas claves son las ciudades.

**unidadesPorProducto(ventas)**

- ¿Qué recorro?: Todas las ventas.
- ¿Qué filtro?: Ventas con cantidad mayor que cero.
- ¿Qué transformo?: Identifico el nombre del producto.
- ¿Qué acumulo?: Las unidades vendidas de cada producto.
- ¿Cómo agrupo?: Utilizo reduce() para crear un objeto con los productos como claves.

**topProductosPorValor(ventas, k)**

- ¿Qué recorro?: Todas las ventas.
- ¿Qué filtro?: Ventas con cantidad mayor que cero.
- ¿Qué transformo?: Agrupo los productos y convierto el resultado en un arreglo de objetos.
- ¿Qué acumulo?: El dinero generado por cada producto.
- ¿Cómo ordeno?: Utilizo sort() para organizar los productos de mayor a menor valor.
- ¿Cómo selecciono?: Utilizo slice() para devolver los primeros k productos.

### 3. Verificación de resultados

Se creó verificar.js para comparar las funciones del MiniReto 2 con las nuevas versiones del MiniReto 3.

Se verificaron:

- totalVendido() y totalVendidoM().
- unidadesVendidas() y unidadesVendidasM().
- ventasPorCiudad() y ventasPorCiudadM() para Medellín, Bogotá, Cali y Pereira.

Los resultados coincidieron y las pruebas mostraron OK.

### 4. Resultados obtenidos

**Total por ciudad**

| Ciudad | Total vendido |
|---|---:|
| Medellín | 356000 |
| Bogotá | 276000 |
| Cali | 185000 |
| Pereira | 168000 |

**Unidades por producto**

| Producto | Unidades |
|---|---:|
| Origen Huila 500 g | 7 |
| Origen Nariño 250 g | 6 |
| Origen Sierra 500 g | 5 |
| Prensa francesa | 2 |
| Molino manual | 1 |

**Top 3 productos por valor**

| Producto | Total vendido |
|---|---:|
| Origen Huila 500 g | 294000 |
| Origen Sierra 500 g | 225000 |
| Prensa francesa | 190000 |

### 5. Decisiones técnicas

Se conservaron las funciones con ciclos del MiniReto 2 para poder comparar sus resultados.

Se utilizaron filter(), map() y reduce() para construir las nuevas versiones.

Se utilizó Object.entries() para transformar los objetos agrupados en arreglos.

Se utilizó sort() para ordenar los rankings y slice() para seleccionar los primeros resultados.

Se evitó modificar el arreglo original de ventas durante el ordenamiento.

Se mantuvo la exclusión de ventas con cantidad igual o inferior a cero.

## MiniReto 4: Reporte de negocio y depuración

### 1. Error: Bogotá aparece dos veces

- **Síntoma:** Bogotá aparece como dos grupos diferentes en el reporte de ventas por ciudad.
- **Entrada que lo produce:** ciudades escritas con diferencias de espacios y mayúsculas, por ejemplo: "Bogotá", " bogotá " y "BOGOTÁ".
- **Hipótesis:** la agrupación utiliza el nombre original de la ciudad sin normalizarlo.
- **Prueba realizada:** se creó un arreglo de prueba con tres registros que representan la misma ciudad, pero tienen diferencias de escritura.
- **Causa:** JavaScript considera diferentes las cadenas cuando tienen espacios o diferencias entre mayúsculas y minúsculas.
- **Corrección:** en totalPorCiudad() se utiliza trim() para eliminar espacios y se normaliza la escritura de la ciudad antes de agruparla.
- **Resultado:** los tres registros se agrupan bajo una sola clave: Bogotá. El total obtenido en la prueba es $40.000.

### 2. Error: el ticket promedio devuelve NaN

- **Síntoma:** el ticket promedio muestra NaN cuando se consulta un día sin ventas.
- **Entrada que lo produce:** una fecha que no tiene registros de ventas, como 2026-09-07.
- **Hipótesis:** se intenta dividir el total vendido entre cero ventas.
- **Prueba realizada:** se consultó la función ventasDelDia() con la fecha 2026-09-07 y se verificó el resultado.
- **Causa:** dividir cero entre cero produce NaN en JavaScript.
- **Corrección:** antes de calcular el promedio se verifica si la cantidad de ventas es igual a cero. En ese caso, la función devuelve 0.
- **Resultado:** el día sin ventas devuelve cero en total vendido, unidades, cantidad de ventas y ticket promedio.

### 3. Reporte de negocio

Se creó reporte.js para presentar los indicadores de Café Origen en secciones:

- Resumen general.
- Ventas por ciudad.
- Unidades por producto.
- Top 3 de productos por valor.
- Resumen de un día con ventas.
- Resumen de un día sin ventas.

Los valores monetarios se presentan en pesos colombianos utilizando toLocaleString("es-CO").

### 4. Decisiones técnicas

- Se conservaron las funciones de los MiniRetos anteriores.
- Se agregó ventasDelDia() para analizar una fecha específica.
- Se mantuvo la normalización de ciudades para evitar agrupaciones duplicadas.
- Se protegió el cálculo del ticket promedio cuando no existen ventas.
- Se separó la lógica de cálculo de la presentación del reporte.

### Día 2
Predicción antes de medir (nx10):
Para totalPorCiudadInstrumentada, el número de operaciones se multiplicará aproximadamente por 10, porque el recorrido de filter y reduce escala de forma lineal con la cantidad de registros ($n$) y el trabajo por venta es constante (siempre que se mantenga una proporción similar de ventas con cantidad > 0). Si hay otras funciones en la práctica, su factor dependerá de si son $O(1)$ (factor ~1), $O(n)$ (factor ~10) o $O(n^2)$ (factor ~100).

## MiniReto 6: Clientes recurrentes

### Traza manual

Se utilizaron 5 ventas:

C01, C02, C01, C03, C02.

El algoritmo realizó las siguientes comparaciones:

4 + 3 + 2 + 1 = 10.

Los clientes recurrentes encontrados fueron C01 y C02.

### Generalización

Con n ventas, el número de comparaciones entre pares es:

n * (n - 1) / 2.

Esto representa un crecimiento cuadrático O(n²).

### Mediciones

Tamaño del lote     |	Tiempo de ejecución
1.000	            |       5.593 ms   
2.000	            |       14.053 ms
4.000	            |       54.325 ms
8.000	            |       209.914 ms
16.000	            |       790.624 ms

### Costo oculto de includes()

El método includes() busca un elemento dentro del arreglo recurrentes.

Para realizar esta búsqueda puede tener que revisar varios elementos.

Por lo tanto, además de las comparaciones de los ciclos for,
también debemos considerar el costo de buscar clientes repetidos.

En el peor caso, estas búsquedas pueden incrementar
considerablemente el trabajo realizado por el algoritmo.

### Conclusión

El reporte de clientes recurrentes se vuelve lento porque, a medida que aumenta el historial de ventas, el sistema necesita realizar muchas más comparaciones entre clientes. Además, debe buscar si cada cliente repetido ya fue registrado. Esto hace que el tiempo de procesamiento crezca considerablemente. Para historiales grandes, será necesario optimizar la forma en que identificamos los clientes recurrentes.