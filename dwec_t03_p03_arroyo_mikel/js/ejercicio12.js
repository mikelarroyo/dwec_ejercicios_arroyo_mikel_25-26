console.log("T03 - Ejercicio 10");

const categorias = [];
const estadosPosibles = new Set(["toDo", "done"]);

let opcion = -1;

function crearCategoria(nombre) {
  const nombreLimpio = nombre ? nombre.trim() : "";

  if (nombreLimpio === "") {
    console.log("No se puede crear una categoría sin nombre.");
    return;
  }

  // Comprobar si ya existe
  for (let i = 0; i < categorias.length; i++) {
    if (categorias[i][0].toLowerCase() === nombreLimpio.toLowerCase()) {
      console.log(`La categoría '${nombreLimpio}' ya existe.`);
      return; 
    }
  }

  // Crear la categoría
  categorias.push([nombreLimpio, []]);
  console.log(`Categoría '${nombreLimpio}' creada correctamente.`);

  // Si es la primera categoría, mostrar menú adicional
  if (categorias.length === 1) {
    const opcion = prompt(
      "¿Qué deseas hacer ahora?\n" +
        "1. Añadir una tarea a esta categoría\n" +
        "2. Crear otra categoría nueva\n" +
        "3. Volver al menú principal"
    );

    if (opcion === "1") {
      const indice = categorias.length - 1;
      const nombreTarea = prompt("Introduce el nombre de la nueva tarea:");
      if (nombreTarea && nombreTarea.trim() !== "") {
        agregarTarea(indice, nombreTarea);
      } else {
        console.log("No se puede añadir una tarea vacía.");
      }
    } else if (opcion === "2") {
      const nuevaCat = prompt("Introduce el nombre de la nueva categoría:");
      if (nuevaCat && nuevaCat.trim() !== "") {
        crearCategoria(nuevaCat);
      }
    } else {
      console.log("Volviendo al menú principal...");
    }
  } 
}

function agregarTarea(indiceCategoria, nombreTarea) {
  if (
    indiceCategoria < 0 ||
    indiceCategoria >= categorias.length ||
    isNaN(indiceCategoria)
  ) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const tareaLimpia = nombreTarea.trim();
  if (tareaLimpia === "") {
    console.log("No se puede agregar una tarea sin nombre.");
    return;
  }

  const listaTareas = categorias[indiceCategoria][1];
  const estadoInicial = "toDo";


  if (!estadosPosibles.has(estadoInicial)) {
    console.log(`Error: el estado '${estadoInicial}' no es válido.`);
    return;
  }

  listaTareas.push([tareaLimpia, estadoInicial]);
  console.log(`Tarea '${tareaLimpia}' añadida a '${categorias[indiceCategoria][0]}' con estado '${estadoInicial}'.`);
}


function marcarTareasDone(indiceCategoria, nombreTarea) {
  let encontrada = false;

  if (
    indiceCategoria < 0 ||
    indiceCategoria >= categorias.length ||
    isNaN(indiceCategoria)
  ) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const listaTareas = categorias[indiceCategoria][1];
  if (listaTareas.length === 0) {
    console.log("No hay tareas en esta categoría.");
    return;
  }

  for (let i = 0; i < listaTareas.length; i++) {
    if (listaTareas[i][0] === nombreTarea) {
      encontrada = true;

      if (listaTareas[i][1] === "done") {
        console.log(`La tarea '${listaTareas[i][0]}' ya estaba hecha.`);
      } else {
      
        if (estadosPosibles.has("done")) {
          listaTareas[i][1] = "done";
          console.log(`Tarea '${listaTareas[i][0]}' marcada como hecha.`);
        } else {
          console.log("Error: el estado 'done' no es válido en el Set de estados posibles.");
        }
      }
    }
  }

  if (!encontrada) {
    console.log("No se ha encontrado ninguna tarea con ese nombre.");
  }
}


function borrarCategoria(indiceCategoria) {
  if (
    indiceCategoria < 0 ||
    indiceCategoria >= categorias.length ||
    isNaN(indiceCategoria)
  ) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const categoria = categorias[indiceCategoria];
  const tareas = categoria[1];
  let todasDone = true;

  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i][1] !== "done") {
      todasDone = false;
      break;
    }
  }

  if (tareas.length === 0 || todasDone) {
    const confirmacion = prompt(
      `¿Estás seguro de que quieres borrar la categoría '${categoria[0]}'? (S/N)`
    );
    if (confirmacion && confirmacion.trim().toUpperCase() === "S") {
      categorias.splice(indiceCategoria, 1);
      console.log(`Categoría '${categoria[0]}' borrada correctamente.`);
    } else {
      console.log("Operación cancelada.");
    }
  } else {
    console.log(
      `La categoría '${categoria[0]}' no puede ser borrada porque tiene tareas pendientes.`
    );
  }
}

function menuSeleccionarCategoria() {
  if (categorias.length === 0) {
    console.log("No hay categorías disponibles.");
    return null;
  }

  let opcionCategoria = -1;
  let continuar = true;
  let textoMenu = "";

  do {
    textoMenu = "===== Menú 2 - Categorías =====\n";
    for (let i = 0; i < categorias.length; i++) {
      textoMenu += `${i + 1}. ${categorias[i][0]} (${
        categorias[i][1].length
      } tareas)\n`;
    }
    textoMenu += `${categorias.length + 1}. Atrás\n\n`;
    textoMenu += "Introduce el número de la categoría o 'Atrás':";

    opcionCategoria = Number(prompt(textoMenu));

    const indiceReal = opcionCategoria - 1;

    if (
      !isNaN(opcionCategoria) &&
      opcionCategoria >= 1 &&
      opcionCategoria <= categorias.length + 1
    ) {
      if (opcionCategoria === categorias.length + 1) {
        console.log("Volviendo al menú principal...");
        return null;
      } else {
        console.log(`Categoría seleccionada: ${categorias[indiceReal][0]}`);
        return indiceReal;
      }
    } else {
      console.log("Opción no válida. Introduce un número correcto.");
      const respuesta = prompt("¿Quieres volver a intentarlo? (S/N):");
      if (!respuesta || respuesta.toUpperCase() !== "S") {
        continuar = false;
      }
    }
  } while (continuar);

  console.log("Volviendo al menú principal...");
  return null;
}

if (categorias.length === 0) {
  console.log("No hay categorías creadas todavía.");
  const primera = prompt("Introduce el nombre de la primera categoría:");
  if (primera && primera.trim() !== "") {
    crearCategoria(primera);
  } else {
    console.log(
      "No se puede crear una categoría vacía. Intenta de nuevo desde el menú."
    );
  }
}

do {
  opcion = prompt(
    "Menú 1 - Gestión de Categorías\n" +
      "==============================\n" +
      "1. Listar categorías\n" +
      "2. Añadir nueva categoría\n" +
      "3. Borrar categoría \n" +
      "4. Salir\n\n" +
      "Elige una opción (1-4):"
  );
  switch (opcion) {
    case "1":
      if (categorias.length === 0) {
        console.log("No hay categorías.");
      } else {
        const indice = menuSeleccionarCategoria();
        if (indice !== null) {
          menuCategoria(indice);
        }
      }
      break;

    case "2":
      let continuarCat = "S";
      do {
        const nombre = prompt("Introduce el nombre de la nueva categoría:");
        if (nombre !== null && nombre.trim() !== "") {
          crearCategoria(nombre);
        } else {
          console.log("No se puede crear una categoría vacía.");
        }
        continuarCat = prompt("¿Quieres crear otra categoría? (S/N):");
      } while (continuarCat && continuarCat.toUpperCase() === "S");
      break;

    case "3":
      if (categorias.length === 0) {
        console.log("No hay categorías para borrar.");
      } else {
        console.log("\n===== Menú - Borrar Categoría =====");
        for (let i = 0; i < categorias.length; i++) {
          console.log(
            `${i + 1}. ${categorias[i][0]} (${categorias[i][1].length} tareas)`
          );
        }
        console.log(`${categorias.length + 1}. Atrás`);

        const opcion = Number(
          prompt("Introduce el número de la categoría que deseas borrar:")
        );
        const indiceReal = opcion - 1;

        if (opcion === categorias.length + 1) {
          console.log("Cancelado. Volviendo al menú principal.");
        } else if (
          !isNaN(indiceReal) &&
          indiceReal >= 0 &&
          indiceReal < categorias.length
        ) {
          borrarCategoria(indiceReal); //
        } else {
          console.log("Número no válido.");
        }
      }
      break;

    case "4":
      console.log("Saliendo del programa...");
      break;

    default:
      console.log("Opción no válida. Elige un número del 1 al 4.");
  }
} while (opcion !== "4");

function menuCategoria(indiceCategoria) {
  const categoria = categorias[indiceCategoria];
  let opcion = "";

  do {
    console.log(`\n===== Menú 3 - Categoría: ${categoria[0]} =====`);

    if (categoria[1].length === 0) {
      console.log("No hay tareas todavía en esta categoría.");
    } else {
      console.log("Tareas actuales:");
      for (let i = 0; i < categoria[1].length; i++) {
        const tarea = categoria[1][i];
        console.log(`${i + 1}. ${tarea[0]} (${tarea[1]})`);
      }
    }

    opcion = prompt(
      "\nElige una opción:\n" +
        "1. Añadir nueva tarea\n" +
        "2. Marcar tareas como hechas (done)\n" +
        "3. Borrar una tarea\n" +
        "4. Atrás"
    );

    switch (opcion) {
      case "1":
        let continuarTarea = "S";
        do {
          const nueva = prompt("Introduce el nombre de la nueva tarea:");
          if (nueva && nueva.trim() !== "") {
            agregarTarea(indiceCategoria, nueva);
          } else {
            console.log("No se puede añadir una tarea vacía.");
          }
          continuarTarea = prompt("¿Quieres añadir otra tarea? (S/N):");
        } while (continuarTarea && continuarTarea.toUpperCase() === "S");
        break;

      case "2":
        if (categoria[1].length === 0) {
          console.log("No hay tareas para marcar.");
        } else {
          const entrada = prompt(
            "Introduce los números de las tareas hechas (separados por comas):"
          );
          if (entrada) {
            const numeros = entrada.split(",");
            for (let i = 0; i < numeros.length; i++) {
              const pos = Number(numeros[i].trim()) - 1;
              if (pos >= 0 && pos < categoria[1].length) {
                const nombreTarea = categoria[1][pos][0];
                marcarTareasDone(indiceCategoria, nombreTarea);
              } else {
                console.log(`Número de tarea no válido: ${numeros[i].trim()}`);
              }
            }
          }
        }
        break;

      case "3":
        if (categoria[1].length === 0) {
          console.log("No hay tareas para borrar.");
        } else {
          const borrar =
            Number(
              prompt("Introduce el número de la tarea que quieres borrar:")
            ) - 1;
          if (borrar >= 0 && borrar < categoria[1].length) {
            const confirmacion = prompt(
              `¿Seguro que quieres borrar '${categoria[1][borrar][0]}'? (S/N)`
            );
            if (confirmacion && confirmacion.toUpperCase() === "S") {
              categoria[1].splice(borrar, 1);
              console.log("Tarea borrada correctamente.");
            } else {
              console.log("Operación cancelada.");
            }
          } else {
            console.log("Número de tarea no válido.");
          }
        }
        break;

      case "4":
        console.log("Volviendo al menú de categorías...");
        break;

      default:
        console.log("Opción no válida. Introduce un número del 1 al 4.");
    }
  } while (opcion !== "4");
}

console.log("Programa finalizado.");
