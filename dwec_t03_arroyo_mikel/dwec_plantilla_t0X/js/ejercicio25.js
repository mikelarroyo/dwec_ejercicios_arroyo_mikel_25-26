console.log("T03 - Ejercicio 24");

/**
 * Desarrolla un script que pida al usuario una cadena y una letra 
 * e indique cuántas veces aparece dicha letra en esa cadena. 
 * Si la letra no existe se indicará un error.
 *  Debes hacer uso del método match() del objeto String usando expresiones regulares.

 */


let cadena= prompt("Introduce una cadena de texto: ");
let letra= prompt("Introduce una letra: ");


if (!cadena|| !letra || letra.length !== 1){
    alert("la cadena o la letra introducida no es válida");
}

let patron = new RegExp (letra, "g");
let posicion = cadena.match(patron);

if (posicion) {
    alert(`La letra ${letra} aparece ${posicion.length} veces en la cadena.`);
}else {
    alert(`La letra ${letra} no se encuentra en la cadena.`);
}