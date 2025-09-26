console.log("T03 - Ejercicio 20");
/**
 * 
 * Elabora un script que determine si un usuario
 *  ha introducido un número nacional fijo o móvil válido.
 *  Suponer que los números fijos válidos empiezan por 8 o 9 y que constan de 9 dígitos.
 *  Asimismo, un número móvil válido empieza por 6 o 7 y constan también de 9 dígitos.
 *  Deberás hacer uso del objeto RegExp y crear una función que se denomine 
 * "validaTelefono()" que reciba la cadena introducida por el usuario y devuelva un booleano.

La expresión regular debes crear usando el método: 

 Puedes usar una IA para generar el patrón, entendiendo dicho patrón.


 */

    let entrada= prompt("Introduce un numero nacional fijo o movil")

    const patron= new RegExp("^[6789]\\d{8}$")

    function validaTelefono(entrada){
        if (typeof entrada != "String") return false;

        const limpia = entrada.trim();
        const patron= new RegExp("^[6789]\\d{8}$")
        return patron.test(limpia);


    }
    const esValido = validaTelefono(entrada);
    alert (esValido ? "Numero válido" : "Numero invalido");
