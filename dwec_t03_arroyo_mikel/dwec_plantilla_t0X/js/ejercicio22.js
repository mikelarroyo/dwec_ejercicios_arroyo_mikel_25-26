console.log("T03 - Ejercicio 22");
/**
 * Busca en internet dos expresiones regulares. Una que permita validar un DNI y otra que permita validar un CIF. 
 * Crea script que pida al usuario una cadena y determine si es DNI o CIF válido. 
 * Es necesario que definas una función que se denomine "validarDNIyCIF()" que reciba una cadena y devuelva un booleano.

La expresión regular debes crear usando el método: 


Después, busca el algoritmo que permite comprobar si el DNI o el CIF son correctos (es decir, si corresponde la letra al número)

Puedes usar una IA para generar el patrón y el segundo algoritmo de comprobación, entiendo el código dado.
primeroc compruebo que cumple un patron, si eso es true entonces ya tendre lo de calcular el algoritmo que permita comprobar
 si el DNI o el CIF son correctos

 */

function regexDNI() {
  return new RegExp("^\\d{8}[A-HJ-NP-TV-Z]$");
}

function regexCIF() {
  return new RegExp("^[ABCDEFGHJNPQRSUVW]\\d{7}[0-9A-J]$");
}


// ===== 2) ALGORITMO DNI (NIF) =====
function letraDNICorrecta(num8, letra) {
  const tabla = "TRWAGMYFPDXBNJZSQVHLCKE";
  const calculada = tabla[num8 % 23];
  return calculada === letra.toUpperCase();
}