console.log("T03 - Ejercicio 10");

const categorias = [];
const estadosPosibles = new Set(["toDo", "done"]);
const undoStack = [];


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

  if (indiceCategoria < 0 || indiceCategoria >= categorias.length || isNaN(indiceCategoria)) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const listaTareas = categorias[indiceCategoria][1];
  if (listaTareas.length === 0) {
    console.log("No hay tareas en esta categoría.");
    return;
  }

  const indicesHechos = [];

  for (let i = 0; i < listaTareas.length; i++) {
    if (listaTareas[i][0] === nombreTarea) {
      encontrada = true;

      if (listaTareas[i][1] === "done") {
        console.log(`La tarea '${listaTareas[i][0]}' ya estaba hecha.`);
      } else {
        listaTareas[i][1] = "done";
        indicesHechos.push(i);
        console.log(`Tarea '${listaTareas[i][0]}' marcada como hecha.`);
      }
    }
  }

  // Guardar en pila de deshacer
  if (indicesHechos.length > 0) {
    undoStack.push([indiceCategoria, indicesHechos]);
    if (undoStack.length > 5) undoStack.shift(); // mantener 5 últimas
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

  do {
    console.log("\n===== Menú 2 (Ampliado) =====");

    // Listar categorías numeradas
    for (let i = 0; i < categorias.length; i++) {
      console.log(`${i + 1}. ${categorias[i][0]}`);
    }

    // Añadir las nuevas opciones al final
    const indiceAtras = categorias.length + 1;
    const indiceToDo = categorias.length + 2;
    const indiceBuscar = categorias.length + 3;
    const indiceResumen = categorias.length + 4;

    console.log(`${indiceAtras}. Atrás`);
    console.log(`${indiceToDo}. Buscar tareas 'toDo' en cualquier categoría.`);
    console.log(`${indiceBuscar}. Buscar tareas por texto en cualquier categoría.`);
    console.log(`${indiceResumen}. Resumen global de todas las categorías.`);

    const entrada = prompt("Introduce el número de la opción que deseas:");
    if (entrada === null) {
      console.log("Operación cancelada.");
      return;
    }

    opcionCategoria = Number(entrada.trim());
    const indiceReal = opcionCategoria - 1;


    if (opcionCategoria >= 1 && opcionCategoria <= categorias.length) {
      console.log(`\nCategoría seleccionada: ${categorias[indiceReal][0]}`);
      menuCategoria(indiceReal);


    } else if (opcionCategoria === indiceAtras) {
      console.log("Volviendo al menú principal...");
      continuar = false;


    } else if (opcionCategoria === indiceToDo) {
      mostrarTareasPendientes();


    } else if (opcionCategoria === indiceBuscar) {
      buscarTareasPorTexto();


    } else if (opcionCategoria === indiceResumen) {
      resumenGlobal();


    } else {
      console.log("Opción no válida. Introduce un número correcto.");
    }

  } while (continuar);
}


function deshacerUltimoDone() {
  if (undoStack.length === 0) {
    console.log("No hay acciones recientes para deshacer.");
    return;
  }

  const ultimoPaso = undoStack.pop();
  const indiceCategoria = ultimoPaso[0];
  const indicesTareas = ultimoPaso[1];

  if (indiceCategoria < 0 || indiceCategoria >= categorias.length) {
    console.log("Error: categoría inválida en el historial.");
    return;
  }

  const listaTareas = categorias[indiceCategoria][1];

  for (let i = 0; i < indicesTareas.length; i++) {
    const idx = indicesTareas[i];
    if (idx >= 0 && idx < listaTareas.length) {
      if (listaTareas[idx][1] === "done") {
        listaTareas[idx][1] = "toDo";
        console.log(`Deshecho: '${listaTareas[idx][0]}' vuelve a 'toDo'.`);
      } else {
        console.log(`La tarea '${listaTareas[idx][0]}' ya no estaba en 'done'.`);
      }
    }
  }
}

function mostrarTareasPendientes() {
  console.log("\n===== TAREAS PENDIENTES ('toDo') =====");
  let hayPendientes = false;

  for (let i = 0; i < categorias.length; i++) {
    const nombreCat = categorias[i][0];
    const tareas = categorias[i][1];
    for (let j = 0; j < tareas.length; j++) {
      if (tareas[j][1] === "toDo") {
        console.log(`${tareas[j][0]} → ${nombreCat}`);
        hayPendientes = true;
      }
    }
  }

  if (!hayPendientes) console.log("No hay tareas pendientes en ninguna categoría.");
}

function buscarTareasPorTexto() {
  const texto = prompt("Introduce una palabra para buscar tareas:");
  if (!texto || texto.trim() === "") {
    console.log("Búsqueda vacía cancelada.");
    return;
  }

  const termino = texto.trim().toLowerCase();
  const encontradas = [];

  console.log(`\n===== RESULTADOS DE BÚSQUEDA: '${termino}' =====`);

  for (let i = 0; i < categorias.length; i++) {
    const nombreCat = categorias[i][0];
    const tareas = categorias[i][1];
    for (let j = 0; j < tareas.length; j++) {
      const nombreTarea = tareas[j][0].toLowerCase();
      if (nombreTarea.includes(termino)) {
        encontradas.push([tareas[j][0], tareas[j][1], nombreCat]);
      }
    }
  }

  if (encontradas.length === 0) {
    console.log("No se encontraron tareas que coincidan con la búsqueda.");
  } else {
    for (let i = 0; i < encontradas.length; i++) {
      console.log(`${encontradas[i][0]} (${encontradas[i][1]}) → ${encontradas[i][2]}`);
    }
  }
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
    console.log(`\n===== Menú 3. Categoría ${categoria[0]} =====`);

    if (categoria[1].length === 0) {
      console.log("No hay tareas todavía en esta categoría.");
    } else {
      for (let i = 0; i < categoria[1].length; i++) {
        const tarea = categoria[1][i];
        console.log(`${i + 1}. ${tarea[0]} (${tarea[1]})`);
      }
    }

    opcion = prompt(
      "\nElige una opción:\n" +
      "Introduce el número o números de las tareas para marcarlas como 'done' (separados por comas), o elige:\n" +
      "4. Añadir nueva tarea\n" +
      "5. Borrar tarea\n" +
      "6. Atrás\n" +
      "7. Deshacer últimos 'done' realizados"
    );


    const entrada = opcion ? opcion.trim() : "";
    const numeros = entrada.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));


    if (numeros.length > 0 && numeros.every((n) => n >= 1 && n <= categoria[1].length)) {
      const indicesHechos = [];

      for (let i = 0; i < numeros.length; i++) {
        const idx = numeros[i] - 1;
        const tarea = categoria[1][idx];
        if (tarea[1] === "done") {
          console.log(`La tarea '${tarea[0]}' ya estaba hecha.`);
        } else {
          tarea[1] = "done";
          indicesHechos.push(idx);
          console.log(`Tarea '${tarea[0]}' marcada como hecha.`);
        }
      }

      // Registrar el paso en la pila de deshacer
      if (indicesHechos.length > 0) {
        undoStack.push([indiceCategoria, indicesHechos]);
        if (undoStack.length > 5) undoStack.shift();
      }

    } else if (opcion === "4") {
      let continuar = "S";
      do {
        const nueva = prompt("Introduce el nombre de la nueva tarea:");
        if (nueva && nueva.trim() !== "") {
          agregarTarea(indiceCategoria, nueva);
        } else {
          console.log("No se puede añadir una tarea vacía.");
        }
        continuar = prompt("¿Quieres añadir otra tarea? (S/N):");
      } while (continuar && continuar.toUpperCase() === "S");

    } else if (opcion === "5") {
      if (categoria[1].length === 0) {
        console.log("No hay tareas para borrar.");
      } else {
        const numBorrar = Number(prompt("Introduce el número de la tarea que deseas borrar:")) - 1;
        if (numBorrar >= 0 && numBorrar < categoria[1].length) {
          const confirmacion = prompt(
            `¿Seguro que quieres borrar '${categoria[1][numBorrar][0]}'? (S/N)`
          );
          if (confirmacion && confirmacion.toUpperCase() === "S") {
            categoria[1].splice(numBorrar, 1);
            console.log("Tarea borrada correctamente.");
          } else {
            console.log("Operación cancelada.");
          }
        } else {
          console.log("Número de tarea no válido.");
        }
      }

    } else if (opcion === "6") {
      console.log("Volviendo al menú de categorías...");
      break;

    } else if (opcion === "7") {
      deshacerUltimoDone();

    } else {
      console.log("Opción no válida. Introduce números válidos o una opción del 4 al 7.");
    }

  } while (opcion !== "6");
}

// === Ampliación 5 ===
function resumenGlobal() {
  console.log("\n===== RESUMEN GLOBAL DE CATEGORÍAS =====");

  if (categorias.length === 0) {
    console.log("No hay categorías.");
    return;
  }

  for (let i = 0; i < categorias.length; i++) {
    const nombreCat = categorias[i][0];
    const tareas = categorias[i][1];
    const total = tareas.length;
    let hechas = 0;

    for (let j = 0; j < tareas.length; j++) {
      if (tareas[j][1] === "done") hechas++;
    }

    console.log(`${nombreCat} → ${total} tareas (${hechas} done)`);
  }
}

console.log("Programa finalizado.");
