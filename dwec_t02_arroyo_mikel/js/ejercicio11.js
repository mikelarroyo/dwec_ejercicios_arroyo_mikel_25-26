console.log("T02 - Ejercicio 11");

/**Realizar un programa en javascript que calcule el factorial impar de un número entero. El factorial impar de un número n es el producto de todos los números naturales impares desde el 1 hasta n o n-1, dependiendo de si n es par o impar.  Ejemplo:
5! = 5 x 3 x 1 = 15
10! = 9 x 7 x 5 x 3 x 1 = 945
La solución se deberá hacer de forma recursiva: para que el bucle recursivo pare tenemos que siempre dentro de la funcion pare en algun momento. 
 */

let numero = Number(prompt("Escoge un numero para factorizar"));

function factorizar(num1) {
    if (num1 < 0) {
        alert("No existe el factorial de un numero negativo");
        return null;
    } else if (num1 === 0 || num1 === 1) {
        return 1;


    } else if (num1 % 2 === 0) {
        return factorizar(num1 - 1);
    } else {
        let siguiente = factorizar(num1 - 2);
        let parcial = num1 * siguiente;
        console.log("Multiplicando:", num1, "×", siguiente, "→ parcial:", parcial);
        return parcial;
    }
}

let resultado = factorizar(numero);

if (resultado !== null) {
    alert("El factorial impar de " + numero + " es: " + resultado);
}
