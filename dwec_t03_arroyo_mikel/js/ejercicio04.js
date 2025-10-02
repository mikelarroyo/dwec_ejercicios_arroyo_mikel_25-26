console.log("T03 - Ejercicio 04");


/**Elabora un script que lea una frase del usuario y una palabra. 
 * Después mostrará las veces que aparece dicha palabra en esa frase. Debes hacer uso de uno de los métodos del objeto String. Si la palabra no existe se mostrará un error.

*/

let frase = prompt("Escribe una frase:") || "";
let palabra = prompt("Escribe una palabra:") || "";

if (frase.includes(palabra)) {
  let coincidencias = Array.from(frase.matchAll(new RegExp(palabra, "g")));
  alert("La palabra aparece " + coincidencias.length + " veces en la frase.");
} else {
  alert("ERROR: tu palabra no está dentro de la frase.");
}
