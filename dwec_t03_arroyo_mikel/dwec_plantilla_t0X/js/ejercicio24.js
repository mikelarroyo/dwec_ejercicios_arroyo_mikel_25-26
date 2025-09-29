console.log("T03 - Ejercicio 23");

/**
 * Objeto String y RegExp

Desarrolla un script que pida al usuario una cadena de texto y una palabra.
 El script deberá buscar la palabra en la cadena e indicar si está presente. 
 Si se encuentra, mostrará un mensaje con la posición en la que empieza la palabra. 
 Si no está, el script ofrecerá la opción de realizar otra búsqueda 
 (esto puede ser en bucle). El método search() se usará con una expresión regular para evitar
  distinguir entre mayúsculas y minúsculas

 */

let respuesta;

do {

    let texto= prompt("Introduce una cadena de texto: ");
    let palabra = prompt("Introduce la palabra a buscar: ");

    if(!texto || !palabra) { //si metemos una cadena vacia o null nos saltara esta alerta.
        alert("por favor, introduce valores válidos");
        continue; //salta a la siguiente iteración del bucle para volver a pedir los datos.
    }

    let patron = new RegExp(palabra, "i");

    let posicion = texto.search(patron);

    if(posicion !== -1){ // Comprueba si la palabra se encontró en la cadena (`posicion` no es `-1`).
        alert(`La palabra "${palabra}" se encontró en la posición ${posicion}.`)
        break;

    } else{
        respuesta = prompt (`La palabra"${palabra}" no se encontro. ¿Quieres intentar otra busqueda? (s/n)`);
    }

    
}while(respuesta && respuesta.toLocaleLowerCase() === "s");

alert("Programa finalizado.");
