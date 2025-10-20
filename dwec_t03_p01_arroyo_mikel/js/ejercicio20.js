console.log("T03 - Ejercicio 20");
/**
Desarrolla un script que determine si el precio de venta de un artículo dado por un usuario es válido. 
El precio no puede tener más de 6 dígitos en la parte entera y sólo podrá tener dos decimales. 
Los decimales podrán estar indicados por “.” ó “,”.
Deberás hacer uso del objeto RegExp y crear una función que se denomine 
"validarMiReal()" que reciba la cadena introducida por el usuario y devuelva un booleano.
Si el precio es válido, el número se convertirá en un real válido para JS. Para ello, define la función convertirMiReal() 
que recibe un precio válido y devuelve un Number. Por tanto, si el precio válido es 123,34; se convertirá en 123.34
La expresión regular debes crear usando el método: 
Puedes usar una IA para generar el patrón, entendiendo dicho patrón. 

const patron = new RegExp("^\\d{1,6}([.,]\\d{2})?$")

 */


    function validarMiReal(entrada){
        if(typeof entrada !== "string")
            return false;
        
        const limpia= entrada.trim();
        const patron = new RegExp("^\\d{1,6}([.,]\\d{2})?$");
        return patron.test(limpia)
    }

    function convertirMiReal(precio){
        return Number(precio.replace(",","."))

    }

let entrada = prompt("Introduce un precio de venta: ");
if(validarMiReal(entrada)){
    let numero = convertirMiReal(entrada);
    alert ("precio valido. convertido a numero: " + numero);
} else {
    alert("Precio inválido");
}


