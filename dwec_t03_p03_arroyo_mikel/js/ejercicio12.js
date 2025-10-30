console.log("T03 - Ejercicio 10");

const categorias = [];
const estadosValidos = new Set(["toDo", "done"]);
const pilaDeshacer = [];

let opcionPrincipal = -1;

function crearCategoria(nombreCategoria) {
  const nombre = nombreCategoria ? nombreCategoria.trim() : "";

  if (nombre === "") {
    console.log("No se puede crear una categoría sin nombre.");
    return;
  }

  // Comprobar si ya existe
  for (let i = 0; i < categorias.length; i++) {
    if (categorias[i][0].toLowerCase() === nombre.toLowerCase()) {
      console.log(`La categoría '${nombre}' ya existe.`);
      return;
    }
  }

  // Crear la categoría
  categorias.push([nombre, []]);
  console.log(`Categoría '${nombre}' creada correctamente.`);

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
      const nueva = prompt("Introduce el nombre de la nueva categoría:");
      if (nueva && nueva.trim() !== "") {
        crearCategoria(nueva);
      }
    } else {
      console.log("Volviendo al menú principal...");
    }
  }
}

function agregarTarea(indiceCat, nombreTarea) {
  if (indiceCat < 0 || indiceCat >= categorias.length || isNaN(indiceCat)) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const tarea = nombreTarea.trim();
  if (tarea === "") {
    console.log("No se puede agregar una tarea sin nombre.");
    return;
  }

  const tareasCategoria = categorias[indiceCat][1];
  const estadoPorDefecto = "toDo";

  if (!estadosValidos.has(estadoPorDefecto)) {
    console.log(`Error: el estado '${estadoPorDefecto}' no es válido.`);
    return;
  }

  tareasCategoria.push([tarea, estadoPorDefecto]);
  console.log(
    `Tarea '${tarea}' añadida a '${categorias[indiceCat][0]}' con estado '${estadoPorDefecto}'.`
  );
}

function marcarTareasDone(indiceCat, nombreTarea) {
  let encontrada = false;

  if (indiceCat < 0 || indiceCat >= categorias.length || isNaN(indiceCat)) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const tareasCategoria = categorias[indiceCat][1];
  if (tareasCategoria.length === 0) {
    console.log("No hay tareas en esta categoría.");
    return;
  }

  const indicesHechos = [];

  for (let i = 0; i < tareasCategoria.length; i++) {
    if (tareasCategoria[i][0] === nombreTarea) {
      encontrada = true;

      if (tareasCategoria[i][1] === "done") {
        console.log(`La tarea '${tareasCategoria[i][0]}' ya estaba hecha.`);
      } else {
        tareasCategoria[i][1] = "done";
        indicesHechos.push(i);
        console.log(`Tarea '${tareasCategoria[i][0]}' marcada como hecha.`);
      }
    }
  }

  // Guardar en pila de deshacer
  if (indicesHechos.length > 0) {
    pilaDeshacer.push([indiceCat, indicesHechos]);
    if (pilaDeshacer.length > 5) pilaDeshacer.shift(); // mantener 5 últimas
  }

  if (!encontrada) {
    console.log("No se ha encontrado ninguna tarea con ese nombre.");
  }
}

function borrarCategoria(indiceCat) {
  if (indiceCat < 0 || indiceCat >= categorias.length || isNaN(indiceCat)) {
    console.log("Índice de categoría no válido.");
    return;
  }

  const categoria = categorias[indiceCat];
  const tareas = categoria[1];
  let todasHechas = true;

  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i][1] !== "done") {
      todasHechas = false;
      break;
    }
  }

  if (tareas.length === 0 || todasHechas) {
    const confirmacion = prompt(
      `¿Estás seguro de que quieres borrar la categoría '${categoria[0]}'? (S/N)`
    );
    if (confirmacion && confirmacion.trim().toUpperCase() === "S") {
      categorias.splice(indiceCat, 1);
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

  let opcionSeleccion = -1;

  while (true) {
    console.log("\n===== Menú 2 (Ampliado) =====");

    for (let i = 0; i < categorias.length; i++) {
      console.log(`${i + 1}. ${categorias[i][0]}`);
    }

    const indiceAtras = categorias.length + 1;
    const indiceBuscarToDo = categorias.length + 2;
    const indiceBuscarTexto = categorias.length + 3;
    const indiceResumen = categorias.length + 4;

    console.log(`${indiceAtras}. Atrás`);
    console.log(
      `${indiceBuscarToDo}. Buscar tareas 'toDo' en cualquier categoría.`
    );
    console.log(
      `${indiceBuscarTexto}. Buscar tareas por texto en cualquier categoría.`
    );
    console.log(`${indiceResumen}. Resumen global de todas las categorías.`);

    const entrada = prompt("Introduce el número de la opción que deseas:");
    if (entrada === null) {
      console.log("Operación cancelada.");
      return null;
    }

    opcionSeleccion = Number(entrada.trim());
    const indiceSeleccionado = opcionSeleccion - 1;

    if (opcionSeleccion >= 1 && opcionSeleccion <= categorias.length) {
      // devolver el índice seleccionado al llamador
      return indiceSeleccionado;
    } else if (opcionSeleccion === indiceAtras) {
      console.log("Volviendo al menú principal...");
      return null;
    } else if (opcionSeleccion === indiceBuscarToDo) {
      mostrarTareasPendientes();
    } else if (opcionSeleccion === indiceBuscarTexto) {
      buscarTareasPorTexto();
    } else if (opcionSeleccion === indiceResumen) {
      resumenGlobal();
    } else {
      console.log("Opción no válida. Introduce un número correcto.");
    }
  }
}

function deshacerUltimoDone() {
  if (pilaDeshacer.length === 0) {
    console.log("No hay acciones recientes para deshacer.");
    return;
  }

  const ultimo = pilaDeshacer.pop();
  const indiceCat = ultimo[0];
  const indicesTareas = ultimo[1];

  if (indiceCat < 0 || indiceCat >= categorias.length) {
    console.log("Error: categoría inválida en el historial.");
    return;
  }

  const tareasCategoria = categorias[indiceCat][1];

  for (let i = 0; i < indicesTareas.length; i++) {
    const idx = indicesTareas[i];
    if (idx >= 0 && idx < tareasCategoria.length) {
      if (tareasCategoria[idx][1] === "done") {
        tareasCategoria[idx][1] = "toDo";
        console.log(`Deshecho: '${tareasCategoria[idx][0]}' vuelve a 'toDo'.`);
      } else {
        console.log(
          `La tarea '${tareasCategoria[idx][0]}' ya no estaba en 'done'.`
        );
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

  if (!hayPendientes)
    console.log("No hay tareas pendientes en ninguna categoría.");
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
      console.log(
        `${encontradas[i][0]} (${encontradas[i][1]}) → ${encontradas[i][2]}`
      );
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
  opcionPrincipal = prompt(
    "Menú 1 - Gestión de Categorías\n" +
      "==============================\n" +
      "1. Listar categorías\n" +
      "2. Añadir nueva categoría\n" +
      "3. Borrar categoría \n" +
      "4. Salir\n\n" +
      "Elige una opción (1-4):"
  );
  switch (opcionPrincipal) {
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
      let seguir = "S";
      do {
        const nombre = prompt("Introduce el nombre de la nueva categoría:");
        if (nombre !== null && nombre.trim() !== "") {
          crearCategoria(nombre);
        } else {
          console.log("No se puede crear una categoría vacía.");
        }
        seguir = prompt("¿Quieres crear otra categoría? (S/N):");
      } while (seguir && seguir.toUpperCase() === "S");
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
          borrarCategoria(indiceReal);
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
} while (opcionPrincipal !== "4");

function menuCategoria(indiceCategoria) {
  const categoria = categorias[indiceCategoria];
  if (!categoria) {
    console.log("Categoría no encontrada.");
    return;
  }

  let salir = false;
  while (!salir) {
    console.log(`\n===== Menú 3. Categoría ${categoria[0]} =====`);

    const tareas = categoria[1];
    const n = tareas.length;

    // construir listado de tareas para el prompt (el usuario no ve la consola)
    const textoTareas =
      n === 0
        ? "No hay tareas todavía en esta categoría.\n\n"
        : tareas.map((t, i) => `${i + 1}. ${t[0]} (${t[1]})`).join("\n") +
          "\n\n";

    // índices dinámicos para opciones (empiezan después de la última tarea)
    const idxAñadir = n + 1;
    const idxBorrar = n + 2;
    const idxAtras = n + 3;
    const idxDeshacer = n + 4;

    const entradaRaw = prompt(
      `Elige una opción:\n` +
        `Introduce el número o números de las tareas para marcarlas como 'done' (separados por comas), o elige:\n` +
        `Categoría: ${categoria[0]}\n\n` +
        textoTareas +
        `${idxAñadir}. Añadir nueva tarea\n` +
        `${idxBorrar}. Borrar tarea\n` +
        `${idxAtras}. Atrás\n` +
        `${idxDeshacer}. Deshacer últimos 'done'`
    );

    if (entradaRaw === null) {
      console.log("Operación cancelada. Volviendo al menú de categorías...");
      return;
    }
    const entrada = entradaRaw.trim();
    if (entrada === "") {
      console.log("Entrada vacía.");
      continue;
    }

    // marcar tareas si la entrada son índices válidos
    const posibles = entrada
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((nv) => !Number.isNaN(nv));
    if (posibles.length > 0 && posibles.every((v) => v >= 1 && v <= n)) {
      const hechos = [];
      for (let k = 0; k < posibles.length; k++) {
        const idx = posibles[k] - 1;
        if (tareas[idx][1] !== "done") {
          tareas[idx][1] = "done";
          hechos.push(idx);
          console.log(`Tarea '${tareas[idx][0]}' marcada como hecha.`);
        } else {
          console.log(`Tarea '${tareas[idx][0]}' ya estaba hecha.`);
        }
      }
      if (hechos.length) {
        pilaDeshacer.push([indiceCategoria, hechos]);
        if (pilaDeshacer.length > 5) pilaDeshacer.shift();
      }
      continue;
    }

    const num = Number(entrada);
    if (!Number.isNaN(num)) {
      if (num === idxAñadir) {
        let seguir = "S";
        do {
          const nueva = prompt("Introduce el nombre de la nueva tarea:");
          if (nueva && nueva.trim() !== "")
            agregarTarea(indiceCategoria, nueva);
          else console.log("No se puede añadir una tarea vacía.");
          seguir = prompt("¿Quieres añadir otra tarea? (S/N):");
        } while (seguir && seguir.toUpperCase() === "S");
      } else if (num === idxBorrar) {
        if (n === 0) {
          console.log("No hay tareas para borrar.");
          continue;
        }
        const raw = prompt(
          `Introduce el número de la tarea a borrar (1-${n}):`
        );
        if (raw === null) {
          console.log("Cancelado.");
          continue;
        }
        const toDel = Number(raw.trim());
        if (!Number.isNaN(toDel) && toDel >= 1 && toDel <= n) {
          const conf = prompt(
            `¿Seguro que quieres borrar '${tareas[toDel - 1][0]}'? (S/N)`
          );
          if (conf && conf.toUpperCase() === "S") {
            tareas.splice(toDel - 1, 1);
            console.log("Tarea borrada.");
          } else console.log("Operación cancelada.");
        } else console.log("Número de tarea no válido.");
      } else if (num === idxAtras) {
        console.log("Volviendo al menú de categorías...");
        salir = true;
      } else if (num === idxDeshacer) {
        deshacerUltimoDone();
      } else {
        console.log("Opción no válida.");
      }
    } else {
      console.log(
        "Entrada no válida. Introduce números de tareas o una opción mostrada."
      );
    }
  }
}

// === Resumen global ===
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
