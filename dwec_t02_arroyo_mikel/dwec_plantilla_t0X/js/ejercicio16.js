/*
Desarrolla un script que pida un número entero al usuario y muestre el número con sus dígitos invertidos.
Ejemplo: 12345 → 54321.

Después se calcula la suma de los dígitos del número original y del número invertido y se comprueba que son iguales.

Debes validar que el número introducido sea un entero positivo.
*/

console.log("T06 - Ejercicio 16");

function pedirEnteroPositivo(mensaje) {
  let numero;
  do {
    let entrada = prompt(mensaje);
    if (entrada === null) return null; // cancelar
    numero = Number(entrada);
  } while (isNaN(numero) || numero <= 0 || !Number.isInteger(numero));
  return numero;
}

function invertirNumero(num) {
  return Number(num.toString().split("").reverse().join(""));
}

function sumaDigitos(num) {
  return num.toString().split("").reduce((suma, d) => suma + Number(d), 0);
}

let numero = pedirEnteroPositivo("Introduce un número entero positivo:");

if (numero !== null) {
  let invertido = invertirNumero(numero);
  alert("Número original: " + numero + "\nNúmero invertido: " + invertido);
  console.log("Número original: " + numero + ", Número invertido: " + invertido);

  let sumaOriginal = sumaDigitos(numero);
  let sumaInvertido = sumaDigitos(invertido);

  let mensaje = "Suma dígitos original: " + sumaOriginal +
                "\nSuma dígitos invertido: " + sumaInvertido +
                "\n¿Son iguales? " + (sumaOriginal === sumaInvertido);

  alert(mensaje);
  console.log(mensaje);
} else {
  alert("Operación cancelada");
}
