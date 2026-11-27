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

## MiniReto 7: Complejidad espacial

### 1. Comparación de implementaciones

Se desarrollaron dos funciones para calcular el total vendido por ciudad.

- `totalCiudadCadena`: utiliza dos métodos `map`, un `filter` y un `reduce`.
- `totalCiudadUnaPasada`: utiliza un único ciclo `for` y un acumulador.

Ambas funciones deben devolver el mismo resultado para las mismas ventas y ciudad.

### 2. Recorridos y arreglos creados

**Versión encadenada:**
- Realiza cuatro recorridos completos como máximo.
- Crea tres arreglos intermedios.
- Su complejidad temporal es O(n).
- Su complejidad espacial es O(n).

**Versión de una pasada:**
- Realiza un único recorrido.
- No crea arreglos intermedios.
- Su complejidad temporal es O(n).
- Su complejidad espacial adicional es O(1).

### 3. Análisis temporal

Aunque la versión encadenada realiza cuatro recorridos, su complejidad temporal sigue siendo O(n).

Esto sucede porque Big O elimina las constantes. Por lo tanto, O(4n) se simplifica a O(n).

La versión de una pasada también es O(n), pero realiza menos trabajo al recorrer los datos una sola vez.

### 4. Análisis espacial

La versión encadenada necesita memoria adicional para almacenar los arreglos que generan los métodos `map` y `filter`.

La versión de una pasada solamente utiliza variables temporales y un acumulador, por lo que su memoria adicional es constante.

### 5. Clasificación de las funciones del motor

Las funciones que trabajan con acumuladores y variables temporales, sin crear estructuras adicionales proporcionales a las ventas, tienen complejidad espacial O(1).

Las funciones que crean arreglos, agrupaciones o estructuras que almacenan resultados tienen complejidad espacial O(n) en el peor caso.

Se debe prestar especial atención a `totalPorCiudad`, que utiliza `filter`, y a `topProductosPorValor`, que necesita almacenar y ordenar información de los productos.

### 6. Decisión técnica

Se conservará `totalCiudadUnaPasada` en el motor porque permite obtener el mismo resultado con un solo recorrido y sin crear arreglos intermedios.

Aunque la versión encadenada es más fácil de leer, la versión de una pasada utiliza menos memoria adicional. Esta característica es importante cuando la plataforma procesa grandes cantidades de ventas y cuenta con recursos de memoria limitados.

La decisión prioriza el aprovechamiento de recursos sin cambiar el resultado esperado.

## Optimización: clientes recurrentes con Set y Map

### 1. Entender el problema

**Entrada:** arreglo de ventas con identificadores de clientes.

**Salida:** arreglo de clientes que realizaron más de una compra.

**Restricciones:** no modificar los datos originales y devolver cada cliente recurrente una sola vez.

### 2. Casos de prueba

- Arreglo vacío: devuelve `[]`.
- Una venta: devuelve `[]`.
- Clientes diferentes: devuelve `[]`.
- Un cliente con varias compras: aparece una sola vez en el resultado.
- Varios clientes recurrentes: todos deben aparecer una sola vez.

### 3. Solución inicial: fuerza bruta

La primera implementación compara cada venta con las siguientes mediante dos ciclos anidados.

Además, utiliza `includes()` para comprobar si un cliente recurrente ya fue registrado.

Las comparaciones entre pares tienen complejidad O(n²). En el peor caso, las búsquedas adicionales con `includes()` pueden elevar la complejidad temporal a O(n³).

La memoria adicional es O(n), debido al arreglo de clientes recurrentes.

### 4. Idea de optimización

Se utilizaron las estructuras `Set` y `Map` para evitar búsquedas repetidas.

**Versión Set:**
- `vistos` almacena los clientes que ya aparecieron.
- `recurrentes` almacena los clientes que aparecen más de una vez.
- Cada venta se procesa una sola vez.

Complejidad temporal esperada: O(n).

Complejidad espacial: O(n).

**Versión Map:**
- `comprasPorCliente` cuenta las compras de cada cliente.
- `clientesRecurrentesMap` obtiene los clientes cuya cantidad de compras es mayor que uno.

Complejidad temporal esperada: O(n).

Complejidad espacial: O(n).

### 5. Verificación

Se compararon las tres implementaciones con:
- Las 12 ventas originales del Día 1.
- 5.000 ventas generadas.

Los resultados se ordenaron antes de compararlos para evitar diferencias causadas únicamente por el orden de aparición.

**Resultado de la prueba con los datos del Día 1:** 
Original: [ 'C01', 'C02', 'C03' ]
Set: [ 'C01', 'C02', 'C03' ]
Map: [ 'C01', 'C02', 'C03' ]
¿Las tres versiones coinciden? true.

**Resultado de la prueba con 5.000 ventas:**
Original: [
  'C01',   'C04',   'C05',   'C06',   'C07',   'C08',   'C09',
  'C10',   'C1001', 'C1003', 'C1004', 'C1005', 'C1006', 'C1007',
  'C1009', 'C101',  'C1010', 'C1011', 'C1012', 'C1013', 'C1014',
  'C1015', 'C1016', 'C1019', 'C102',  'C1020', 'C1021', 'C1022',
  'C1023', 'C1024', 'C1025', 'C1026', 'C1027', 'C1028', 'C1029',
  'C103',  'C1030', 'C1031', 'C1032', 'C1033', 'C1036', 'C1037',
  'C1038', 'C1039', 'C104',  'C1040', 'C1042', 'C1043', 'C1044',
  'C1046', 'C1047', 'C1048', 'C105',  'C1050', 'C1052', 'C1053',
  'C1054', 'C1055', 'C1056', 'C1057', 'C1058', 'C1059', 'C106',
  'C1061', 'C1062', 'C1063', 'C1064', 'C1066', 'C1067', 'C1068',
  'C1069', 'C107',  'C1071', 'C1072', 'C1075', 'C1076', 'C1077',
  'C1078', 'C1079', 'C1080', 'C1081', 'C1082', 'C1083', 'C1084',
  'C1085', 'C1086', 'C1087', 'C1088', 'C1089', 'C109',  'C1090',
  'C1092', 'C1093', 'C1094', 'C1096', 'C1097', 'C1099', 'C1100',
  'C1101', 'C1102',
  ... 1240 more items
]
Set: [
  'C01',   'C04',   'C05',   'C06',   'C07',   'C08',   'C09',
  'C10',   'C1001', 'C1003', 'C1004', 'C1005', 'C1006', 'C1007',
  'C1009', 'C101',  'C1010', 'C1011', 'C1012', 'C1013', 'C1014',
  'C1015', 'C1016', 'C1019', 'C102',  'C1020', 'C1021', 'C1022',
  'C1023', 'C1024', 'C1025', 'C1026', 'C1027', 'C1028', 'C1029',
  'C103',  'C1030', 'C1031', 'C1032', 'C1033', 'C1036', 'C1037',
  'C1038', 'C1039', 'C104',  'C1040', 'C1042', 'C1043', 'C1044',
  'C1046', 'C1047', 'C1048', 'C105',  'C1050', 'C1052', 'C1053',
  'C1054', 'C1055', 'C1056', 'C1057', 'C1058', 'C1059', 'C106',
  'C1061', 'C1062', 'C1063', 'C1064', 'C1066', 'C1067', 'C1068',
  'C1069', 'C107',  'C1071', 'C1072', 'C1075', 'C1076', 'C1077',
  'C1078', 'C1079', 'C1080', 'C1081', 'C1082', 'C1083', 'C1084',
  'C1085', 'C1086', 'C1087', 'C1088', 'C1089', 'C109',  'C1090',
  'C1092', 'C1093', 'C1094', 'C1096', 'C1097', 'C1099', 'C1100',
  'C1101', 'C1102',
  ... 1240 more items
]
Map: [
  'C01',   'C04',   'C05',   'C06',   'C07',   'C08',   'C09',
  'C10',   'C1001', 'C1003', 'C1004', 'C1005', 'C1006', 'C1007',
  'C1009', 'C101',  'C1010', 'C1011', 'C1012', 'C1013', 'C1014',
  'C1015', 'C1016', 'C1019', 'C102',  'C1020', 'C1021', 'C1022',
  'C1023', 'C1024', 'C1025', 'C1026', 'C1027', 'C1028', 'C1029',
  'C103',  'C1030', 'C1031', 'C1032', 'C1033', 'C1036', 'C1037',
  'C1038', 'C1039', 'C104',  'C1040', 'C1042', 'C1043', 'C1044',
  'C1046', 'C1047', 'C1048', 'C105',  'C1050', 'C1052', 'C1053',
  'C1054', 'C1055', 'C1056', 'C1057', 'C1058', 'C1059', 'C106',
  'C1061', 'C1062', 'C1063', 'C1064', 'C1066', 'C1067', 'C1068',
  'C1069', 'C107',  'C1071', 'C1072', 'C1075', 'C1076', 'C1077',
  'C1078', 'C1079', 'C1080', 'C1081', 'C1082', 'C1083', 'C1084',
  'C1085', 'C1086', 'C1087', 'C1088', 'C1089', 'C109',  'C1090',
  'C1092', 'C1093', 'C1094', 'C1096', 'C1097', 'C1099', 'C1100',
  'C1101', 'C1102',
  ... 1240 more items
]
¿Las tres versiones coinciden? true

### 6. Mediciones

| Cantidad de ventas | Original (ms) | Set (ms) | Map (ms) |
|---:|---:|---:|---:|
| 1.000 | [4.557] | [0.151] | [0.311] |
| 10.000 | No ejecutada | [2.143] | [2.102] |
| 100.000 | No ejecutada | [16.895] | [21.407] |

### 7. Intercambio entre tiempo y memoria

La solución original utiliza búsquedas repetidas y comparaciones entre pares, lo que aumenta considerablemente el tiempo de ejecución.

Las soluciones con `Set` y `Map` reducen ese trabajo al procesar las ventas una sola vez y consultar estructuras de búsqueda.

La mejora en tiempo tiene un costo: ambas soluciones necesitan memoria adicional para almacenar clientes y cantidades.

Por lo tanto, se cambia un mayor consumo de memoria, proporcional a la cantidad de clientes, por una reducción importante del tiempo de procesamiento.

### 8. Conclusión

Se propone utilizar la versión con `Set` para identificar clientes recurrentes porque resuelve directamente el problema con un único recorrido y permite mantener separados los clientes vistos y los recurrentes.

La versión con `Map` también resulta útil porque permite conocer cuántas compras realizó cada cliente, información que puede aprovecharse en futuros reportes del marketplace.

La elección definitiva debe respaldarse con las mediciones obtenidas y las necesidades de los reportes.

## MiniReto: Complementos y conteo de frecuencias

### 1. Combinación de productos

Se creó un catálogo de ocho productos con sus respectivos precios.

Se implementaron dos soluciones para encontrar dos productos distintos cuyo precio sumara el valor de una tarjeta regalo.

**Fuerza bruta:**

Se utilizaron dos ciclos anidados para comparar los precios de todos los pares posibles.

Complejidad temporal: O(n²).

Complejidad espacial: O(1).

**Versión optimizada con Map:**

Se almacenaron los precios ya revisados. Para cada producto se calculó el complemento necesario y se consultó si ya estaba registrado en el Map.

Complejidad temporal esperada: O(n).

Complejidad espacial: O(n).

### 2. Pruebas de tarjetas regalo

| Valor | Resultado esperado |
|---:|---|
| $87.000 | Origen Huila 500 g + Origen Sierra 500 g |
| $61.000 | Origen Nariño 250 g + Taza de cerámica |
| $50.000 | Sin combinación (`null`) |

### 3. Traza de la versión optimizada para $87.000

| Paso | Producto actual | Precio | Complemento | ¿Está en el Map? |
|---:|---|---:|---:|---|
| 1 | Origen Nariño 250 g | 26.000 | 61.000 | No |
| 2 | Origen Huila 500 g | 42.000 | 45.000 | No |
| 3 | Origen Sierra 500 g | 45.000 | 42.000 | Sí |

En el tercer paso se encuentra el precio de $42.000, correspondiente a Origen Huila 500 g.

Por lo tanto, se devuelve la combinación de Origen Huila 500 g y Origen Sierra 500 g.

### 4. Producto estrella por ciudad

Se implementó `productoEstrellaPorCiudad(ventas)` mediante Map anidados.

El primer Map organiza la información por ciudad y el segundo cuenta las apariciones de cada producto.

La función devuelve el producto con mayor frecuencia en cada ciudad.

Complejidad temporal esperada: O(n).

Complejidad espacial: O(n).

En caso de empate se conserva el producto que apareció primero en el historial.

### 5. Primer cliente con una sola compra

Se implementó `primerClienteUnico(ventas)` mediante dos recorridos y un Map.

En el primer recorrido se cuenta cuántas compras realizó cada cliente.

En el segundo se revisan las ventas en su orden original y se devuelve el primer cliente cuyo conteo sea igual a uno.

Complejidad temporal esperada: O(n).

Complejidad espacial: O(n).

Si ningún cliente realizó exactamente una compra, la función devuelve `null`.

### 6. Conclusión

Las estructuras Map permiten resolver problemas de búsqueda y conteo sin tener que comparar repetidamente todos los elementos.

En la búsqueda de combinaciones, se reemplazaron las comparaciones de pares por consultas de complementos.

En los reportes comerciales, se utilizaron conteos por clave para identificar los productos más frecuentes y los clientes que realizaron una sola compra.

Estas soluciones ofrecen un crecimiento temporal esperado lineal y utilizan memoria adicional proporcional a la información almacenada.

### MiniReto 11:
VENTANA 1
[D1] [D2] [D3] [D4] [D5] [D6] [D7]  D8  D9
 320  410  280  390  510  620  700
Total: 3.230

VENTANA 2
 D1  [D2] [D3] [D4] [D5] [D6] [D7] [D8]  D9
     410  280  390  510  620  700  300
Total: 3.210

VENTANA 3
 D1  D2  [D3] [D4] [D5] [D6] [D7] [D8] [D9]
         280  390  510  620  700  300  290
Total: 3.090

## MiniReto: Ventana deslizante y dos punteros

### 1. Mejor semana de ventas

Se implementaron dos funciones para encontrar el período de siete días consecutivos con mayor total de ventas.

**Solución por fuerza bruta: `mejorSemanaBruta(dias, k)`**

Utiliza dos ciclos. El primero selecciona el inicio de cada ventana y el segundo suma nuevamente los k días correspondientes.

- Complejidad temporal: O(n × k).
- Complejidad espacial: O(1).

**Solución optimizada: `mejorSemana(dias, k)`**

Utiliza una ventana deslizante. Primero calcula el total de los primeros k días. Después, para avanzar, suma el día que entra y resta el día que sale.

- Complejidad temporal: O(n).
- Complejidad espacial: O(1).

### 2. Traza de las primeras tres ventanas

Se utilizaron los datos de septiembre con k = 7.

**Primera ventana: días 1 al 7**

320 + 410 + 280 + 390 + 510 + 620 + 700 = 3.230.

**Segunda ventana: días 2 al 8**

3.230 + 300 - 320 = 3.210.

**Tercera ventana: días 3 al 9**

3.210 + 290 - 410 = 3.090.

Los valores están expresados en miles de pesos.

### 3. Resultado de septiembre

La mejor semana comienza el día 24 y termina el día 30.

Total: 3.670 miles de pesos ($3.670.000).

### 4. Verificación y mediciones

Se compararon las dos implementaciones con los datos de septiembre y con 100.000 días generados aleatoriamente.

| Conjunto de datos | Resultado coincidente |
|---|---|
| Septiembre, 30 días | [Completar después de ejecutar] |
| 100.000 días generados | [Completar después de ejecutar] |

**Tiempos medidos con 100.000 días:**

- Fuerza bruta: [Completar] ms.
- Ventana deslizante: [Completar] ms.

La comparación permite observar el ahorro de trabajo de la ventana deslizante, que evita volver a sumar los días que permanecen dentro de cada ventana.

### 5. Par de productos más cercano al presupuesto

Se implementó `parMasCercano(precios, presupuesto)` utilizando dos punteros sobre una copia del catálogo ordenada de menor a mayor precio.

El puntero izquierdo comienza en el producto más económico y el derecho en el más costoso.

- Si la suma supera el presupuesto, se mueve el puntero derecho hacia la izquierda.
- Si la suma no supera el presupuesto, se guarda la combinación cuando mejora el resultado y se mueve el puntero izquierdo hacia la derecha.

### 6. Traza para un presupuesto de $100.000

| Paso | Producto izquierdo | Producto derecho | Suma | Acción |
|---:|---|---|---:|---|
| 1 | Filtros (18.000) | Molino (120.000) | 138.000 | Mover derecha |
| 2 | Filtros (18.000) | Prensa (95.000) | 113.000 | Mover derecha |
| 3 | Filtros (18.000) | Huila 1 kg (79.000) | 97.000 | Guardar y mover izquierda |
| 4 | Nariño (26.000) | Huila 1 kg (79.000) | 105.000 | Mover derecha |
| 5 | Nariño (26.000) | Sierra (45.000) | 71.000 | Guardar y mover izquierda |
| 6 | Taza (35.000) | Sierra (45.000) | 80.000 | Guardar y mover izquierda |
| 7 | Huila 500 g (42.000) | Sierra (45.000) | 87.000 | Guardar y mover izquierda |

La mejor combinación encontrada es Filtros de papel x100 y Origen Huila 1 kg, con un total de $97.000.

### 7. Pruebas de presupuesto

| Presupuesto | Resultado esperado |
|---:|---|
| $100.000 | Combinación de $97.000 |
| $140.000 | Combinación de $140.000 |
| $40.000 | Sin combinación posible |

### 8. Complejidad

| Función | Tiempo | Espacio |
|---|---|---|
| `mejorSemanaBruta` | O(n × k) | O(1) |
| `mejorSemana` | O(n) | O(1) |
| `parMasCercano` | O(n log n) | O(n) |

En `parMasCercano`, el recorrido con dos punteros es O(n), pero el ordenamiento previo cuesta O(n log n). Por eso la complejidad total es O(n log n).

### 9. Conclusión

La ventana deslizante permite reutilizar los resultados de una ventana anterior y evitar sumas repetidas. Esto reduce el tiempo de O(n × k) a O(n).

La técnica de dos punteros permite encontrar una pareja de productos adecuada sin comparar todas las combinaciones posibles. Sin embargo, requiere ordenar primero los precios, por lo que su complejidad total es O(n log n).

Ambas técnicas permiten resolver problemas comerciales de forma más eficiente y con un uso controlado de memoria.