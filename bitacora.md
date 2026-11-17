# Bitácora - Café Origen Analítica

## MiniReto 1: Exploración y modelado de datos

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