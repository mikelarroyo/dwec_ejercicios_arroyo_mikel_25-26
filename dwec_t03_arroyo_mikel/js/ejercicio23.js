console.log("T03 - Ejercicio 23");

/**
 * Desarrolla un script que determine si el formato usado en una fecha dada por el usuario es válido o no.
 * Los formatos de fechas válidos son DD-MM-YYYY, DD-MM-YY, DD/MM/YYYY y DD/MM/YY.
 * Deberás hacer uso del objeto ExpReg y crear una función que se denomine "validarFormatoFecha()"
 * que reciba la cadena introducida por el usuario y devuelva un booleano.
 * Después tienes que crear un objeto de tipo Date y determinar si la fecha es correcta.
 */

function validarFormatoFecha(fecha) {
    // Expresión regular para validar los formatos de fecha
    const patron = /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/](\d{4}|\d{2})$/;

    // Validar si la fecha coincide con el patrón
    return patron.test(fecha);
}

function esFechaValida(fecha) {
    // Dividir la fecha en partes (día, mes, año)
    const partes = fecha.split(/[-\/]/); // Separar por "-" o "/"
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Los meses en JavaScript van de 0 a 11
    const anio = partes[2].length === 2 ? parseInt("20" + partes[2], 10) : parseInt(partes[2], 10);

    // Crear un objeto Date
    const fechaObjeto = new Date(anio, mes, dia);

    // Comprobar si la fecha es válida
    return (
        fechaObjeto.getFullYear() === anio &&
        fechaObjeto.getMonth() === mes &&
        fechaObjeto.getDate() === dia
    );
}

// Solicitar al usuario una fecha
const fechaUsuario = prompt("Introduce una fecha (DD-MM-YYYY, DD-MM-YY, DD/MM/YYYY, DD/MM/YY):");

if (validarFormatoFecha(fechaUsuario)) {
    if (esFechaValida(fechaUsuario)) {
        alert("La fecha introducida es válida.");
    } else {
        alert("La fecha introducida no es válida.");
    }
} else {
    alert("El formato de la fecha no es válido.");
}

