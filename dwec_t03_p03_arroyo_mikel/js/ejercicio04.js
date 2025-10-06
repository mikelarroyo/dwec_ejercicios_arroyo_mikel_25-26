console.log("T03 - Ejercicio 04");
/**
 * Desarrolla un script que ordene un array de cadenas
 *  alfabéticamente usando un método del objeto Array 
 * que permite hacerlo de forma directa. 
 * Se pueden ordenar de forma ascendente o descendente
 *  a decisión del usuario.
 */

const arr = ["mikel", "arroyo", "papa", "maria", "almorzar"];
console.log("Tu array original: ", arr);

function pedirOrden() {
  let entrada;
  do {
    entrada = prompt("Introduce cómo quieres ordenar tu array: escribe 'asc' o 'desc'");
    if (entrada === null) {
      alert("Has cancelado la entrada, se usará 'asc' por defecto.");
      return "asc";
    }
    entrada = entrada.trim().toLowerCase();
    if (entrada !== "asc" && entrada !== "desc") {
      alert("Entrada no válida. Escribe 'asc' o 'desc'.");
    }
  } while (entrada !== "asc" && entrada !== "desc");
  return entrada;
}


