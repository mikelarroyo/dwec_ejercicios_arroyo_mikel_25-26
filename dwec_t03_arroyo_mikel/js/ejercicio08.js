console.log("T03 - Ejercicio 08");
/**
 * ¿Para qué sirve el método match(), el método search() y el método includes()
 *  del objeto String? Haz un ejemplo donde demuestres su uso.
 * - match(): Busca coincidencias con una expresión regular y devuelve un array con los resultados o null si no hay coincidencias.
 * - search(): Busca una coincidencia con una expresión regular y devuelve el índice de la primera coincidencia o -1 si no encuentra nada.
 * - includes(): Comprueba si una cadena contiene otra subcadena y devuelve true o false.
 */

let texto =  "El rápido zorro marrón salta sobre el perro perezoso.";

// Ejemplo de match()
let resultadoMatch = texto.match(/zorro/g);
console.log("Resultado de match():", resultadoMatch);
alert("Resultado de match(): " + resultadoMatch);

let resultadoSearch = texto.search(/zorro/);
console.log("Resultado de search():", resultadoSearch);
alert("Resultado de search(): " + resultadoSearch);

let resultadoIncludes = texto.includes("zorro");
console.log("Resultado de includes():", resultadoIncludes);
alert("Resultado de includes(): " + resultadoIncludes);

