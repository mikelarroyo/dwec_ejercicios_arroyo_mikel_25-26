console.log("T03 - Ejercicio 06");

/**
 * Un usuario puede darte una fecha usando los siguientes formatos: 
 * "DD-MM-YYYY", "DD/MM/YYYY" o "DD MM YYYY".
 *  Determina qué separador ha usado el usuario y crea un objeto Date con
 *  la fecha introducida por el usuario. Después verifica si la fecha es válida.

 */

let entrada = prompt("Introduce una fecha (DD-MM-YYYY, DD/MM/YYYY o DD MM YYYY):");

let separador = "-";
if (entrada.includes("/")) {
  separador = "/";
} else if (entrada.includes(" ")) {
  separador = " ";
}

let partes = entrada.split(separador);
let dia = parseInt(partes[0], 10);
let mes = parseInt(partes[1], 10);
let anio = parseInt(partes[2], 10);

let fecha = new Date(anio, mes - 1, dia);

if (
  fecha.getFullYear() === anio &&
  fecha.getMonth() + 1 === mes &&
  fecha.getDate() === dia
) {
  alert("La fecha es válida")
  console.log("la fecha es válida");
} else {
  alert("La fecha es inválida")
  console.log("la fecha es inválida")
}
