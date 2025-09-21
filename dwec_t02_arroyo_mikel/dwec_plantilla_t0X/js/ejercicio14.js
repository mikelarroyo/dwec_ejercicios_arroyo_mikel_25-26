

/**Determinar si un número entero positivo dado leído desde el teclado es abundante o no.
 *  Un número abundante es un número natural cuyos divisores (todos los divisores excepto el propio número) sumen más que dicho número. 
 * Ejemplo: 24 < 1 + 2 + 3 + 4 + 6 + 8 + 12 = 36.

Se tiene que comprobar si el usuario ha introducido un número entero mayor que 0. En el caso contrario, se le volverá a pedir el número hasta que lo introduzca correctamente.
 */

console.log("T02 - Ejercicio 12");

// Un número abundante es aquel cuya suma de divisores propios (sin incluirse a sí mismo)
// es mayor que el propio número.

let numero;

do {
    numero = Number(prompt("Escoge un número entero positivo:"));
} while (!Number.isInteger(numero) || numero <= 0);

// Calcular la suma de divisores
let suma = 0;
for (let i = 1; i < numero; i++) {
    if (numero % i === 0) {
        suma += i;
    }
}

// Mostrar resultado
if (suma > numero) {
    console.log(`${numero} es un número abundante porque la suma de sus divisores es ${suma}`);
} else {
    console.log(`${numero} NO es abundante porque la suma de sus divisores es ${suma}`);
}
