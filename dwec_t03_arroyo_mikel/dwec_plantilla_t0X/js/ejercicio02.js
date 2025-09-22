console.log("T03 - Ejercicio 01");


/**Realiza los siguientes scripts usando el lenguaje de programación JavaScript.
 
Objeto String // Number

¿Qué diferencia hay entre el método slice(), el método substr() y el método substring(). Haz un ejemplo donde se aprecie la diferencia entre dichos métodos.
*/


let texto = "JavaScript";

// slice(inicio, fin)
console.log(texto.slice(0, 4));   // "Java" → posiciones 0 a 3
console.log(texto.slice(-6, -3)); // "Scr"  → cuenta desde el final

// substring(inicio, fin)
console.log(texto.substring(0, 4)); // "Java" (igual que slice)
console.log(texto.substring(4, 0)); // "Java" (intercambia los valores)

// substr(inicio, longitud)
console.log(texto.substr(0, 4));  // "Java" → desde 0, 4 caracteres
console.log(texto.substr(4, 6));  // "Script" → desde 4, 6 caracteres

