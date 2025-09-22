console.log("T03 - Ejercicio 10");

/**
 * - Math.ceil(): Redondea hacia arriba al entero más próximo.
 * - Math.floor(): Redondea hacia abajo al entero más próximo.
 * - Math.round(): Redondea al entero más cercano (hacia arriba si la parte decimal es 0.5 o mayor).
 */


let numero = 4.7;

console.log("Número original: " + numero);
alert("Número original: " + numero);
console.log("Redondeo hacia arriba (Math.ceil): " + Math.ceil(numero));
alert("Redondeo hacia arriba (Math.ceil): " + Math.ceil(numero));
console.log("Redondeo hacia abajo (Math.floor): " + Math.floor(numero));
alert("Redondeo hacia abajo (Math.floor): " + Math.floor(numero));
console.log("Redondeo al entero más cercano (Math.round): " + Math.round(numero));
alert("Redondeo al entero más cercano (Math.round): " + Math.round(numero));

// Puedes cambiar el valor de 'numero' para probar con otros números