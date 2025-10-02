console.log("T02 - Ejercicio 10");

/**Haz un script que pida un número entero al usuario y muestre por pantalla el factorial de dicho número.  
 * El script definirá la función "factorial" que recibe un número entero y devuelve el factorial de dicho número. La solución se deberá hacer de forma NO recursiva.

Recuerda: El factorial de un número n es el producto de todos los números naturales desde 1 hasta n inclusive. Así, factorial de 5 (5!) es: 5! = 5 x 4 x 3 x 2 x 1 = 120.

Contempla qué debe ocurrir si el número es 0 o 1 y qué debe ocurrir si el número es negativo.
 */

let num1 = Number(prompt("Escoge un numero"));

function factorialize(n) {
    if (n < 0) {
        alert("No existe el factorial de números negativos.");
        return;
    }
    if (n === 0 || n === 1) {
        alert("El factorial de " + n + " es: 1");
        return;
    }

    let resultado = n;
    for (let i = n - 1; i >= 1; i--) {
        resultado *= i;
        console.log("Multiplicando por", i, "→ resultado:", resultado);
    }

    alert("El factorial de " + n + " es: " + resultado);
}

factorialize(num1);

