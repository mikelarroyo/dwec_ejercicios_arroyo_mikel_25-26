console.log("T03 - Ejercicio 25");
/**
Elabora un script que pida al usuario una cadena y dos letras. Después reemplazará una letra por otra. 
Si la primera letra no existe se indicará un error. 
Debes resolverlo usando el método replace() del objeto String usando expresiones regulares. 
No debe distinguir entre mayúsculas y minúsculas.
 Controla esto desde la expresión regular.
 */

let entrada = prompt("Introduce una cadena de texto: ");

let letraUno= prompt("Introduce la primera letra");
let letraDos= prompt("Introduce la segunda letra");

if(!entrada || !letraUno || !letraDos || letraUno.length !==1 || letraDos.length !== 1){
    alert ("La cadena o las letras introducidas no son válidas");
}
let patron= new RegExp(letraUno, "gi");
let reemplazar= entrada.replace(patron, letraDos);

alert (`la cadena moficiada es: ${reemplazar}`);
