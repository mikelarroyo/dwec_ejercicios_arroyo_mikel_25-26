console.log("T02 - Ejercicio 13");

/**
Crear un script que dada una palabra determine si es un palíndromo.

Ignora mayúsculas y minúsculas.
ana: es un palíndromo.
Ana: en nuestro caso es un palíndromo.
alberto: no es un palíndromo.


 */


function esPalindromo(palabra) {
// Pasamos a minúsculas y quitamos espacios
let limpia = palabra.toLowerCase().replace(/\s+/g, "");
// Invertimos la cadena
let invertida = limpia.split("").reverse().join("");
return limpia === invertida;
}


let palabra = prompt("Introduce una palabra para comprobar si es palíndromo:");
if (palabra !== null) {
if (esPalindromo(palabra)) {
alert(palabra + ": es un palíndromo.");
console.log(palabra + ": es un palíndromo.");
} else {
alert(palabra + ": no es un palíndromo.");
console.log(palabra + ": no es un palíndromo.");
}
} else {
alert("Operación cancelada");
}