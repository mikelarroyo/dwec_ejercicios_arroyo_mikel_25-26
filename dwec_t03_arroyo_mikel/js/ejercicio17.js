console.log("T03 - Ejercicio 17");

/**
 * 
 * Crea un script que pida al usuario dos fechas
 *  e indique los meses que hay entre ambas fechas.
 *  El script debe determinar qué fecha es la mayor.

 */

let entradaUno = prompt("Escribe la primera fecha DD/MM/YYYY");
let entradaDos = prompt("Escribe la segunda fecha DD/MM/YYYY");

function Fecha(entrada) {
    let partes = entrada.split("/");
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10);
    let anio = parseInt(partes[2], 10);
    return new Date(anio, mes - 1, dia);
}

let fechaUno = Fecha(entradaUno);
let fechaDos = Fecha(entradaDos);

let mayor, menor;

if (fechaUno > fechaDos) {
    mayor = fechaUno;
    menor = fechaDos;
} else {
    mayor = fechaDos;
    menor = fechaUno;
}
let aniosDiff = mayor.getFullYear() - menor.getFullYear();
let mesDiff = mayor.getMonth() - menor.getMonth();
let totalMeses = aniosDiff * 12 + mesDiff;

console.log("Fecha mayor: ", mayor.toDateString());
console.log("Fecha menor: ", menor.toDateString());
console.log("Meses de diferencia: ", totalMeses);
alert("Entre ambas fechas hay: ", totalMeses, "De diferencia: ")










