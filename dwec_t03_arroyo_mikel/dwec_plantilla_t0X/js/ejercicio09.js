console.log("T03 - Ejercicio 09");

/**
 * 
Objeto Math // Random
  
Haz un script que pida al usuario cuántos números quiere introducir,
después los introducirá en un array y finalmente mostrará el menor y el mayor. 
Para mostrar el menor y el mayor deberás hacer uso de los métodos "max()" y "min()" del objeto Math.

 */

let cantidad= Number(prompt("¿Cuantos numeros quieres introducir?"));

let numeros = new Array(cantidad);

for (let i= 0; i <cantidad; i++){
  let n= Number(prompt("Introduce el numero " + (i + 1)+ ":"));
  numeros[i] = n;
}

let menor = Math.min(...numeros);
let mayor = Math.max(...numeros);

alert("El menor es: " + menor + "\nEl mayor es: " + mayor ); 

