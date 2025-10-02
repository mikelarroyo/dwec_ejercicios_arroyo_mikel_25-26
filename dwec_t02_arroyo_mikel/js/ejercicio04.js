console.log("T02 - Ejercicio 04");

/**Realizar un programa que determine si el número introducido por el usuario es primo o no.

Antes de calcular, comprobar que el usuario introduce realmente un número (Number.isInteger).
 */


let numero = Number(prompt("Escoge un numero"));

if(Number.isInteger(numero)){
    alert ("Has introducido un numero válido: " + numero);
// todos los posibles divisores desde 2 hasta el número menos 1
// Un número es primo si es mayor que 1 y solo se puede dividir exactamente entre 1 y él mismo.
    let esPrimo = true;
    for (let i= 2; i < numero; i++){ 
        if (numero % i ===0) {
            esPrimo = false;
            break;
        }
    }
    if (esPrimo) {
        alert (numero + " Es primo");
    } else {
        alert (numero + " no es primo")
    }
} else {
    alert ("No has introducido un numero válido");
}


