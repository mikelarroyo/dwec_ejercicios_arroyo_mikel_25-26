console.log("T03 - Ejercicio 21");

/**
 * Elabora un script que determine si un usuario ha introducido un número nacional fijo o móvil válido. 
 * Suponer que los números fijos válidos empiezan por 8 o 9 y que constan de 9 dígitos.
 *  Asimismo, un número móvil válido empieza por 6 o 7 y constan también de 9 dígitos. 
 * Deberás hacer uso del objeto RegExp y crear una función que se denomine "validarTelefono()" 
 * que reciba la cadena introducida por el usuario y devuelva un booleano.

La expresión regular debes crear usando el método: 

 Puedes usar una IA para generar el patrón, entendiendo dicho patrón.

Hecho esto, definirás una función que se llame validarPrefijoTeléfonoEsp() que permita validar si un teléfono introducido tiene el prefijo +34. Y para terminar harás una función llamada validarTelefonoConSin()
 que invoque a las dos funciones anteriores, según sea conveniente.

 */

function validarTelefono(entrada) {
    if (typeof entrada !== "string") {
        return false;
    }
    const entradaLimpia = entrada.trim();
    const patron = new RegExp("^[6789]\\d{8}$");
    return patron.test(entradaLimpia);
}

// valida prefijo +34
function validarPrefijoTelefonoEsp(entrada) {
    if (typeof entrada !== "string")
        return false;
    const entradaLimpia = entrada.trim();
    const patron = new RegExp("^\\+34 ?[6789]\\d{8}$");
    return patron.test(entradaLimpia);
}

// valida con o sin prefijo
function validarTelefonoConSin(entrada) {
    if (typeof entrada !== "string")
        return false;

    const entradaLimpia = entrada.trim();

    if (entradaLimpia.startsWith("+")) {
        if (validarPrefijoTelefonoEsp(entradaLimpia)) {
            alert("Teléfono válido con prefijo +34");
            return true;
        } else {
            alert("Número inválido con prefijo");
            return false;
        }
    } else {
        if (validarTelefono(entradaLimpia)) {
            alert("Teléfono nacional válido");
            return true;
        } else {
            alert("Número inválido sin prefijo");
            return false;
        }
    }
}


let entrada = prompt("Introduce un número nacional fijo o móvil");
let resultado = validarTelefonoConSin(entrada);

// Para ver también el booleano final
alert("Resultado final (true/false): " + resultado);
