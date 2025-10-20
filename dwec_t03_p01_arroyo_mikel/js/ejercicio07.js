console.log("T03 - Ejercicio 07");


/**Un usuario puede darte una hora usando los siguientes formatos: 
 * "HH:MM", "HH-MM" o "HH.MM". Determina qué separador ha usado el usuario y 
 * crea un objeto Date con la hora introducida por el usuario. 
 * Después verifica si la hora es válida.

No puedes usar patrones.*/

let entrada= prompt("Introduce una hora (HH:MM, HH-MM o HH.MM):");
let separador = ":";
if (entrada.includes("-")) {
    separador = "-";
} else if (entrada.includes(".")) {
    separador = ".";
}

let partes = entrada.split(separador);
let horas = parseInt(partes[0], 10);
let minutos = parseInt(partes[1], 10); // <-- Corrige aquí, debe ser partes[1]

if (horas >= 0 && horas < 24 && minutos >= 0 && minutos < 60){
    // Crear objeto Date con la hora introducida (usando la fecha de hoy)
    let ahora = new Date();
    let fechaHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), horas, minutos);
    alert("La hora es válida: " + fechaHora.toLocaleTimeString());
    console.log("La hora es válida: " + fechaHora.toLocaleTimeString());
}else{
    alert("La hora es inválida");
    console.log("La hora es inválida");
}
