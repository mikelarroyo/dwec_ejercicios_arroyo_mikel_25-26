console.log("T03 - Ejercicio 26");
/**
 * Crea un script que pida al usuario una cadena y diga cuántas palabras
 * tiene esa cadena.
 * Suponemos que una palabra está formada por
 * uno o más caracteres distintos al espacio y al tabulador.
 * Usa expresiones regulares.
 */

let entrada = prompt("Introduce una cadena de texto:");

if (!entrada) {
    alert("No se ha introducido ninguna cadena.");
} else {
    // Usamos una expresión regular para encontrar palabras
    // \S+ busca secuencias de caracteres que no sean espacios o tabuladores
    const palabras = entrada.match(/\S+/g);

    if (palabras) {
        alert(`La cadena tiene ${palabras.length} palabras.`);
    } else {
        alert("La cadena no contiene palabras.");
    }
}
