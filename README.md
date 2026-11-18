# Café Origen - Motor de Analítica

## Descripción

Proyecto desarrollado para Café Origen, una tostadora de café de especialidad ubicada en Medellín, Colombia.

El objetivo es construir un motor de analítica que permita procesar el historial de ventas y obtener indicadores útiles para la toma de decisiones del negocio.

## Objetivo del proyecto

Analizar los registros de ventas utilizando JavaScript, arreglos de objetos, ciclos, métodos de arreglos y funciones de agrupación.

## Tecnologías utilizadas

- JavaScript
- Node.js
- Git
- GitHub

## Estructura del proyecto

cafe-origen-analitica/
│
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   └── verificar.js
│
├── bitacora.md
└── README.md
```

## Ejecución

Para ejecutar la exploración de datos, utiliza:

```bash
node src/explorar.js
```

## Estado del proyecto

Versión 0.1 - MiniReto 1: Exploración y modelado de datos.

Proyecto en desarrollo.

Versión 0.1 - MiniReto 1: Exploración y modelado de datos.

Versión 0.1 - MiniReto 2: Indicadores básicos de negocio.

Funcionalidades implementadas:

- Exploración del historial de ventas.
- Cálculo del total vendido.
- Cálculo de unidades vendidas.
- Identificación de la venta de mayor valor.
- Cálculo del ticket promedio.
- Análisis de ventas por ciudad.
- Pruebas con arreglos completos, individuales y vacíos.

## Funcionalidades implementadas

### MiniReto 1
- Exploración del historial de ventas.
- Modelado de datos mediante arreglos de objetos.
- Identificación de casos borde.

### MiniReto 2
- Cálculo del total vendido.
- Cálculo de unidades vendidas.
- Identificación de la venta mayor.
- Cálculo del ticket promedio.
- Ventas por ciudad utilizando ciclos.

### MiniReto 3
- Implementación de map(), filter() y reduce().
- Comparación entre ciclos y métodos de arreglos.
- Agrupación de ventas por ciudad.
- Agrupación de unidades por producto.
- Ranking de productos por unidades.
- Top de productos por dinero generado.
- Verificación de resultados mediante verificar.js.