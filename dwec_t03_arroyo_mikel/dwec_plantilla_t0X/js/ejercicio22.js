console.log("T03 - Ejercicio 22");

/**
 * Este script valida si una cadena introducida por el usuario es un DNI o un CIF válido.
 * Utiliza expresiones regulares para comprobar el formato y algoritmos básicos para validar.
 */

function regexDNI() {
    // Devuelve una expresión regular que valida el formato de un DNI.
    // El formato esperado es: 8 números seguidos de una letra válida (mayúscula).
    return new RegExp("^\\d{8}[A-HJ-NP-TV-Z]$");
}

function regexCIF() {
    // Devuelve una expresión regular que valida el formato de un CIF.
    // El formato esperado es: una letra inicial (tipo de entidad), 7 números y un carácter de control (número o letra).
    return new RegExp("^[ABCDEFGHJNPQRSUVW]\\d{7}[0-9A-J]$");
}

function letraDNICorrecta(num8, letra) {
    // Pseudocódigo: Validación DNI
    // - Se toma el número (los 8 dígitos sin letra).
    // - Se divide entre 23 y se calcula el resto.
    // - Ese resto indica la posición en una tabla de letras.
    const tabla = "TRWAGMYFPDXBNJZSQVHLCKE";
    const calculada = tabla[num8 % 23];
    return calculada === letra.toUpperCase();
}

function cifControlValido(cif) {
    // Pseudocódigo: Validación CIF
    // - Extraer letra inicial, dígitos centrales y carácter de control.
    const letraInicial = cif[0]; // Primer carácter: tipo de entidad
    const digitos = cif.slice(1, -1); // Los 7 números centrales
    const controlFinal = cif[cif.length - 1]; // Último carácter: dígito o letra de control

    // Pseudocódigo: Suma de posiciones pares
    let sumaPares = parseInt(digitos[1]) + parseInt(digitos[3]) + parseInt(digitos[5]);

    // Pseudocódigo: Suma de posiciones impares
    let sumaImpares = 0;
    for (let i = 0; i < digitos.length; i += 2) {
        let doble = parseInt(digitos[i]) * 2;
        if (doble >= 10) {
            // Si el resultado tiene dos cifras, se suman esas cifras
            let cifras = String(doble);
            sumaImpares += parseInt(cifras[0]) + parseInt(cifras[1]);
        } else {
            // Si el resultado es una cifra, se suma directamente
            sumaImpares += doble;
        }
    }

    // Pseudocódigo: Cálculo del dígito de control
    let sumaTotal = sumaPares + sumaImpares;
    let resto = sumaTotal % 10;
    let codeControl = 10 - resto;
    if (codeControl === 10) codeControl = 0;

    // Pseudocódigo: Validación del carácter final
    let esValido = false;
    if (letraInicial === "X" || letraInicial === "P") {
        // Si el tipo de entidad requiere una letra como control
        let letraEsperada = String.fromCharCode(64 + codeControl);
        esValido = controlFinal === letraEsperada;
    } else if (!isNaN(controlFinal)) {
        // Si el control es un número
        esValido = parseInt(controlFinal) === codeControl;
    } else {
        // Si el control es una letra
        const letrasControl = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        esValido = letrasControl[codeControl - 1] === controlFinal;
    }

    return esValido;
}

function validarDNI(cadena) {
    // Comprueba si una cadena es un DNI válido.
    // Primero valida el formato con la expresión regular.
    // Luego verifica si la letra es correcta usando el algoritmo de validación.
    if (typeof cadena !== "string") return false;
    const s = cadena.trim().toUpperCase();
    if (!regexDNI().test(s)) return false;
    const num = parseInt(s.substring(0, 8), 10);
    const letra = s[8];
    return letraDNICorrecta(num, letra);
}

function validarCIF(cadena) {
    // Comprueba si una cadena es un CIF válido.
    // Primero valida el formato con la expresión regular.
    // Luego verifica el carácter de control usando el algoritmo de validación.
    if (typeof cadena !== "string") return false;
    const s = cadena.trim().toUpperCase();
    if (!regexCIF().test(s)) return false;
    return cifControlValido(s);
}

function validarDNIyCIF(cadena) {
    // Comprueba si una cadena es un DNI o un CIF válido.
    // Llama a las funciones validarDNI() y validarCIF() y devuelve true si alguna de ellas es válida.
    return validarDNI(cadena) || validarCIF(cadena);
}

const entrada = prompt("Introduce un DNI o CIF:");
if (!entrada) {
    alert("Sin entrada.");
} else if (validarDNI(entrada)) {
    alert("DNI válido ");
} else if (validarCIF(entrada)) {
    alert("CIF válido ");
} else {

    alert("No es un DNI/CIF válido");
}


