console.log("T02 - Ejercicio 12");

/**
[Modificado] Escribir un programa que pregunte al usuario una cantidad a invertir, el interés anual y el número de años, y muestre por pantalla el capital obtenido en la inversión.

En primer lugar se calculará el interés simple.

Después se preguntará al usuario si quiere calcular el interés compuesto. En ese caso, le mostrará el interés compuesto.
Todos los resultados se mostrarán con 2 decimales usando toFixed.

Se tiene que comprobar si el usuario ha introducido un número real válido. En el caso contrario, se le volverá a pedir el número hasta que lo introduzca correctamente.

 */

console.log("T04 - Cálculo de inversión");


// Función genérica para pedir un número válido
function pedirNumeroValido(mensaje) {
    let numero;
    do {
        let entrada = prompt(mensaje);
        if (entrada === null) return null; // permite cancelar
        numero = Number(entrada);
    } while (isNaN(numero) || numero <= 0);
    return numero;
}


// Pedimos datos al usuario
let capitalInicial = pedirNumeroValido("Introduce la cantidad a invertir (€):");
if (capitalInicial === null) {
    alert("Operación cancelada");
} else {
    let interesAnual = pedirNumeroValido("Introduce el interés anual (%):");
    if (interesAnual === null) {
        alert("Operación cancelada");
    } else {
        let anios = pedirNumeroValido("Introduce el número de años:");
        if (anios === null) {
            alert("Operación cancelada");
        } else {
            // Interés simple
            let capitalSimple = capitalInicial * (1 + (interesAnual / 100) * anios);
            alert("Capital con interés simple: " + capitalSimple.toFixed(2) + " €");
            console.log("Capital con interés simple: " + capitalSimple.toFixed(2) + " €");


            // Preguntar si quiere interés compuesto
            if (confirm("¿Quieres calcular también el interés compuesto?")) {
                let capitalCompuesto = capitalInicial * Math.pow(1 + interesAnual / 100, anios);
                alert("Capital con interés compuesto: " + capitalCompuesto.toFixed(2) + " €");
                console.log("Capital con interés compuesto: " + capitalCompuesto.toFixed(2) + " €");
            }
        }
    }
}