console.log("T03 - Ejercicio 03");


/**Realiza los siguientes scripts usando el lenguaje de programación JavaScript.
 
Crea un script que pida al usuario una cadena y diga cuántas palabras tiene esa cadena. Después mostrará cada una de las palabras que constituyen la  cadena. 
Suponemos que una palabra está formada por uno o más caracteres distintos al espacio y al tabulador.

No puedes usar patrones.

*/


let texto = prompt("Escribe un texto");

if (texto === null) {
    texto = "";
}



let partes = texto.split(" ");
let palabras = [];
let j= 0;

for (let i = 0; i < partes.length; i++) {
    if (partes[i] !== "") {
        palabras[j] = partes[i]
        j++;
    }
}
let mensaje = "La cadena tiene" + palabras.length + "palabras\n";

for (let i = 0; i < palabras.length; i++) {
    mensaje += (i + 1) + ". " + palabras[i] + "\n";


}
alert(mensaje);
