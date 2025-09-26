console.log("T03 - Ejercicio 18");

/**
 * Crea un script que pida al usuario la fecha
 * de su nacimiento (para saber su cumpleaños).
 *  El script mostrará si hoy es su cumpleaños y su edad. 
 * Si hoy no es su cumpleaños mostrará los días que quedan para su próximo cumpleaños.
 * Hay que verificar previamente si la fecha es correcta sin usar expresiones regulares
 *  (la fecha solo será correcta con este formato: DD/MM/YYYY).

 */
/** 
let entrada = prompt("Escribe tu fecha de nacimiento: ")

function Fecha(entrada) {
    let partes = entrada.split("/");
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10);
    let anio = parseInt(partes[2], 10);
    return new Date(anio, mes - 1, dia);
}

let cumpleaños= 
**/