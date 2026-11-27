# Informe técnico de rendimiento — Café Origen

**Versión:** 0.2  
**Proyecto:** cafe-origen-analitica  
**Objetivo:** documentar la complejidad temporal y espacial del motor de analítica, registrar mediciones y establecer prioridades de optimización.

## 1. Alcance y metodología

Este informe analiza las funciones del motor de analítica utilizando como referencia un conjunto de 10.000 ventas.

Se evalúan dos aspectos:

- **Complejidad temporal:** cómo aumenta el trabajo de una función cuando crece la cantidad de ventas.
- **Complejidad espacial:** cómo aumenta la memoria adicional que necesita la función.

La notación Big O describe el crecimiento teórico. Los tiempos medidos representan el comportamiento observado durante una ejecución concreta y pueden variar según el equipo, los datos y el entorno.

Los tiempos se registran en milisegundos (ms). Las operaciones se registran únicamente cuando la función tiene un contador instrumentado.

## 3. Proyección

Para proyectar el tiempo de procesamiento de 1.000.000 de ventas se toma como referencia el tiempo medido con 10.000 ventas.

La proyección es teórica: no sustituye una prueba real con un millón de registros.

### 3.1 Factores de crecimiento

| Complejidad | Factor de crecimiento de 10.000 a 1.000.000 |
|---|---:|
| O(1) | 1 |
| O(log n) | Aproximadamente 1,3 |
| O(n) | 100 |
| O(n log n) | Aproximadamente 150,5 |
| O(n²) | 10.000 |
| O(n³) | 1.000.000 |

### 3.2 Proyección por función

| Función o grupo | Complejidad utilizada | Tiempo medido con 10.000 ventas | Tiempo proyectado con 1.000.000 |
|---|---|---:|---:|
| `valorVenta` | O(1) | Pendiente | Pendiente |
| `totalVendido` | O(n) | Pendiente | Pendiente |
| `unidadesVendidas` | O(n) | Pendiente | Pendiente |
| `ventaMayor` | O(n) | Pendiente | Pendiente |
| `ticketPromedio` | O(n) | Pendiente | Pendiente |
| `ventasPorCiudad` | O(n) | Pendiente | Pendiente |
| `totalVendidoM` | O(n) | Pendiente | Pendiente |
| `unidadesVendidasM` | O(n) | Pendiente | Pendiente |
| `ventasPorCiudadM` | O(n) | Pendiente | Pendiente |
| `totalPorCiudad` | O(n) | Pendiente | Pendiente |
| `unidadesPorProducto` | O(n) | Pendiente | Pendiente |
| `topProductosPorValor` | O(n + k log k) | Pendiente | Pendiente |
| `ventasDelDia` | O(n) | Pendiente | Pendiente |
| `clientesRecurrentes` | O(n³) en el peor caso | Pendiente | No estimar con una simple extrapolación sin validar el comportamiento |
| `totalCiudadCadena` | O(n) | Pendiente | Pendiente |
| `totalCiudadUnaPasada` | O(n) | Pendiente | Pendiente |

Para funciones lineales, la fórmula de proyección es:

**Tiempo proyectado = tiempo medido × 100**

Para funciones O(n log n), se utiliza aproximadamente:

**Tiempo proyectado = tiempo medido × 150,5**

Para funciones cuadráticas:

**Tiempo proyectado = tiempo medido × 10.000**

La proyección de `clientesRecurrentes` requiere especial cuidado: el costo de `includes` depende de cuántos clientes recurrentes se van acumulando. Se deben analizar los datos de prueba y las mediciones de varios tamaños antes de estimar un millón de ventas.

## 4. Riesgos

El orden considera el crecimiento teórico del tiempo de ejecución y, en segundo lugar, el consumo de memoria adicional.

1. **`clientesRecurrentes`: riesgo muy alto.** Compara pares de ventas y realiza búsquedas adicionales mediante `includes`. En el peor caso puede alcanzar O(n³), por lo que su rendimiento puede deteriorarse considerablemente con historiales grandes.

2. **`topProductosPorValor`: riesgo medio.** Necesita agrupar productos y ordenar los resultados. El costo de ordenamiento depende de la cantidad de productos distintos.

3. **`totalCiudadCadena`: riesgo medio.** Tiene tiempo O(n), pero realiza varios recorridos y crea arreglos intermedios, aumentando el consumo de memoria.

4. **`totalPorCiudad` y `ventasDelDia`: riesgo medio.** Sus recorridos son lineales, pero crean arreglos adicionales mediante `filter`.

5. **Funciones de agrupación:** `ventasPorCiudad`, `ventasPorCiudadM` y `unidadesPorProducto` necesitan almacenar resultados adicionales. Su memoria depende de la cantidad de elementos distintos.

6. **Funciones de acumulación:** `totalVendido`, `unidadesVendidas`, `ventaMayor` y `ticketPromedio` presentan menor riesgo espacial porque utilizan memoria adicional constante.

7. **`totalCiudadUnaPasada`: riesgo bajo.** Realiza un único recorrido y no crea arreglos intermedios.

Este orden es una clasificación teórica inicial. Debe contrastarse con los tiempos medidos y las características reales de los datos.

## 5. Plan de optimización

### Función prioritaria: `clientesRecurrentes`

La implementación actual compara una venta con las ventas siguientes para identificar clientes repetidos. Además, cada vez que encuentra un posible cliente recurrente, utiliza `includes` para comprobar si ya se encuentra en el arreglo de resultados.

Esto genera trabajo repetido:

- Se comparan múltiples pares de ventas.
- Se vuelve a buscar un cliente en la lista de recurrentes.
- La lista de resultados puede crecer a medida que avanza el procesamiento.

### Idea de mejora

Evaluar el uso de un `Set` de JavaScript (estructura que almacena valores únicos y permite consultar su existencia eficientemente).

La idea sería:

1. Recorrer las ventas una sola vez.
2. Guardar los clientes que ya aparecieron en un primer conjunto.
3. Cuando un cliente vuelva a aparecer, registrarlo en un segundo conjunto de recurrentes.
4. Evitar repetir búsquedas recorriendo manualmente un arreglo de resultados.

Con este enfoque se busca reducir el trabajo repetido y mejorar el rendimiento esperado a O(n) en tiempo, con O(n) de memoria adicional.

**Esta mejora queda planteada como propuesta. No se implementa en esta versión**, porque el objetivo es documentar el estado actual y definir las prioridades técnicas.

## 6. Revisión técnica

Este documento debe ser revisado por al menos un compañero.

**Nombre del revisor:** [Completar]

**Observación recibida:** [Copiar la observación real]

**Respuesta y ajuste realizado:** [Explicar si se acepta o no la observación y justificar la decisión]

## 7. Conclusión

El motor cuenta con funciones de complejidad lineal y de memoria constante que son adecuadas para procesar grandes cantidades de registros.

Sin embargo, existen funciones que requieren atención. La identificación de clientes recurrentes representa la prioridad principal por sus comparaciones anidadas y búsquedas adicionales.

También se deben controlar las funciones que generan arreglos intermedios o estructuras de agrupación, debido a que el consumo de memoria puede aumentar con el volumen de información.

La siguiente etapa debe priorizar la optimización de `clientesRecurrentes`, validar las mejoras mediante mediciones y repetir las pruebas con diferentes tamaños de entrada.