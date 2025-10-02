console.log("T03 - Ejercicio 11");
/**
 * Haz un script que genere números aleatorios entre 0 y 100 ambos incluidos.
 */

let numneroAleatorio = Math.floor(Math.random() * 101);
console.log(numneroAleatorio);
//otra forma
let numeroAleatorio2 = Math.round(Math.random() * 100);
console.log(numeroAleatorio2);
alert("Número aleatorio entre 0 y 100: " + numneroAleatorio);
alert("Número aleatorio entre 0 y 100: " + numeroAleatorio2);