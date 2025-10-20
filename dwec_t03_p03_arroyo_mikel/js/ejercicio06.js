/** Desarrolla un script que cree dos arrays de 10 elementos.
 *  El primer array tendrá los nombres de 10 personas 
 * y el segundo array tendrá los teléfonos móviles de esas 10 personas, 
 * de forma que la persona que ocupa la posición
 *  4 del primer array tendrá su número de teléfono 
 * n la posición 4 del segundo array.
 * El script pedirá el nombre de una persona y mostrará el teléfono de dicha persona.
 *  Puede ocurrir que no exista esa persona o que haya dos personas con el mismo nombre. 
 * En ese caso se mostrarán los dos teléfonos.
*/

console.log("T03 - Ejercicio 06");

const personas = ["Pepe","Manolo","Paki","Olivares","Sofia","Ainara","Carmen","Raul","Aurora","Manuel"];
const telefonos = [608833679, 7332, 923242, 832, 43212, 134, 5645, 2321312, 45353, 6332];

let entrada;
do {
    entrada = prompt("Introduce el nombre de una persona (o escribe 'salir' para terminar):");

    if (entrada === null || entrada.trim() === "") {
        alert("Por favor, introduce un nombre válido.");
        continue;
    }

    if (entrada.toLowerCase() === "salir") {
        break;
    }

    // Buscar todas las posiciones donde aparece el nombre
    let indices = []; // Array para guardar las posiciones donde se encuentra el nombre
    
    // Recorrer todo el array de personas
    for(let i = 0; i < personas.length; i++) {
        // Si el nombre coincide (ignorando mayúsculas/minúsculas)
        if(personas[i].toLowerCase() === entrada.toLowerCase()) {
            // Guardar la posición
            indices.push(i);
        }
    }

    if (indices.length === 0) {
        alert(`La persona '${entrada}' no se encuentra en la lista.`);
    } else {
        let telefonosEncontrados = indices.map(index => telefonos[index]);
        alert(`Teléfonos de '${entrada}': ${telefonosEncontrados.join(", ")}`);
    }
} while (entrada.toLowerCase() !== "salir");