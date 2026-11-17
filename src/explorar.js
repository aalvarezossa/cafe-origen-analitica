// Importamos los datos desde datos.js
const ventas = require("./datos");

// 1. Cantidad total de registros
console.log("Cantidad de registros:");
console.log(ventas.length);

// 2. Primer registro
console.log("\nPrimer registro:");
console.log(ventas[0]);

// 3. Último registro
console.log("\nÚltimo registro:");
console.log(ventas[ventas.length - 1]);

// 4. Producto del registro en la posición 4
console.log("\nProducto del registro en la posición 4:");
console.log(ventas[3].producto);

// 5. Tabla completa
console.log("\nTabla completa de ventas:");
console.table(ventas);