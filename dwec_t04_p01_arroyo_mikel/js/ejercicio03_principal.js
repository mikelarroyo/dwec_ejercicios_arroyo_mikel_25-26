const aula1 = new Aula("AU01", "Aula de primero", 40, 1);
const aula2 = new Aula("AU02", "Aula de segundo", 30, 2);
const aula3 = new Aula("AU03", "Aula de tercero", 35, 3);
const aula4 = new Aula("AU04", "Aula de cuarto", 25, 4);
const aulas = [aula1, aula2, aula3, aula4];

function menuPrincipal() {
  return prompt(
    `MENÚ PRINCIPAL

1) Añadir alumno (pregunta aula; matricula 2 obligatorias y elige 2 optativas)
2) Asignar asignaturas a profesores (2, cursos distintos, sin solaparse)
3) Consultar alumnos de un profesor por una de sus asignaturas
4) Insertar notas por profesor y asignatura (uno por uno)
5) Listado por aula: nota media de cada alumno
6) Salir

Elige opción (1-6):`
  );
}
//Bloque opcion 1
function elegirAula() {
  let texto = "Elige un Aula: \n";
  for (let i = 0; i < aulas.length; i++) {
    let a = aulas[i];
    texto +=
      i + 1 + ")" + a.descripcion + "[" + a.id + "] (Curso " + a.curso + ")\n";
  }

  let indice = parseInt(prompt(texto)) - 1;

  if (isNaN(indice) || indice < 0 || indice >= aulas.length) {
    return null;
  }
  return aulas[indice];
}

function pedirNombreAlumno() {
  let nombre = prompt("Introduce el nombre del alumno:");

  if (!nombre) return null;
  nombre = nombre.trim();

  if (nombre === "") return null;

  return nombre;
}

function matricularAlumno(asignatura, alumno) {
  if (!asignatura || !alumno) {
    console.log("Error: faltan datos para matricular al alumno.");
    return false;
  }

  if (!Array.isArray(asignatura.alumnos)) {
    console.log("Error: la asignatura no tiene un array de alumnos válido.");
    return false;
  }

  Aula.prototype.insertarAlumnos.call(asignatura, [alumno]);

  console.log(
    `${alumno.nombre} matriculado en ${asignatura.nombreAsignatura}.`
  );
  return true;
}

function opcion1_anadirAlumno() {
  const aula = elegirAula();
  if (!aula) {
    console.log("aula no válido");
    return;
  }
  const cantidad = parseInt(prompt("Cuantos alumnos quieres añadir?"));
  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("cantidad no válida");
    return;
  }
  if (!aula.haySitioAlumnos(cantidad)) {
    console.log(
      "No ay suficientes plazas disponibkes\n" +
        "Plazas libres: " +
        aula.obtenerSitiosAlumno()
    );
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    const nombre = pedirNombreAlumno();
    if (!nombre) {
      alert("Nombre inválido. Se cancela el proceso.");
      break;
    }

    const alumno = new Alumno(nombre);

    const insertado = aula.insertarAlumno(alumno);
    if (!insertado) {
      alert("Aula llena. No se pueden añadir más alumnos.");
      break;
    }
    const obligatorias = Asignatura.filter(
      (a) => a.tipo === "obligatoria" && a.curso === aula.curso
    );

    if (obligatorias.length < 2) {
      alert("No hay suficientes asignaturas obligatorias para este curso.");
      continue;
    }

    matricularAlumno(obligatorias[0], alumno);
    matricularAlumno(obligatorias[1], alumno);

    const optativas = Asignatura.filter(
      (a) => a.tipo === "optativa" && a.curso === aula.curso
    );
    let textoOpt = "Elige 2 optativas (Ejemplo: 1,3): \n";
    for (let j = 0; j < optativas.length; j++) {
      textoOpt += `${j + 1}) ${optativas[j].nombreAsignatura} (Curso ${
        optativas[j].curso
      })\n`;
    }

    const entrada = prompt(textoOpt);
    if (!entrada) continue;

    const [i1, i2] = entrada.split(",").map((x) => parseInt(x.trim(), 10) - 1);

    if (
      isNaN(i1) ||
      isNaN(i2) ||
      i1 === i2 ||
      i1 < 0 ||
      i1 >= optativas.length ||
      i2 < 0 ||
      i2 >= optativas.length
    ) {
      console.log("Seleccion no válida. Se pasa al siguiente alumno.");
      continue;
    }
    matricularAlumno(optativas[i1], alumno);
    matricularAlumno(optativas[i2], alumno);

    alert(`Alumno ${alumno.nombre} añadido y matriculado correctamente.`);
  }
}
//Fin de bloque 1

//Bloque opcion 2
function opcion2_asignarAsignaturasAProfesores() {
  let texto = "Elige un profesor:\n";
  for (let i = 0; i < profesores.length; i++) {
    texto += `${i + 1}) ${profesores[i].nombre} (${profesores[i].email})\n`;
  }

  const indiceProfesor = parseInt(prompt(texto)) - 1;
  if (
    isNaN(indiceProfesor) ||
    indiceProfesor < 0 ||
    indiceProfesor >= profesores.length
  ) {
    console.log("Seleccion no válida");
    return;
  }

  const profesor = profesores[indiceProfesor];

  if (profesor.asignaturas.length >= 2) {
    console.log("El profe ya tiene 2 asignaturas asignadas");
    return;
  }

  const disponibles = Asignatura.filter(
    (a) => !profesores.some((p) => p.asignaturas.includes(a))
  );

  if (disponibles.length < 2) {
    alert("No hay suficientes asignaturas libres.");
    return;
  }

  let lista1 = "Elige la primera asignatura:\n";
  for (let i = 0; i < disponibles.length; i++) {
    lista1 += `${i + 1}) ${disponibles[i].nombreAsignatura} (Curso ${
      disponibles[i].curso
    })\n`;
  }
  const i1 = parseInt(prompt(lista1)) - 1;
  if (isNaN(i1) || i1 < 0 || i1 >= disponibles.length) {
    alert("Selección no válida.");
    return;
  }

  const asig1 = disponibles[i1];

  const disponibles2 = disponibles.filter((a) => a.curso !== asig1.curso);

  let lista2 = "Elige la segunda asignatura (curso distinto):\n";

  for (let i = 0; i < disponibles2.length; i++) {
    lista2 += `${i + 1}) ${disponibles2[i].nombreAsignatura} (Curso ${
      disponibles2[i].curso
    })\n`;
  }

  const i2 = parseInt(prompt(lista2)) - 1;
  if (isNaN(i2) || i2 < 0 || i2 >= disponibles2.length) {
    alert("Selección no válida.");
    return;
  }
  const asig2 = disponibles2[i2];
  profesor.asignaturas.push(asig1, asig2);
  asig1.profesor = profesor;
  asig2.profesor = profesor;
  asignarProfesor.call(asig1, profesor.nombre, profesor.email);
  asignarProfesor.call(asig2, profesor.nombre, profesor.email);

  alert(
    `Profesor ${profesor.nombre}\n` +
      `Asignado a:\n- ${asig1.nombreAsignatura} (Curso ${asig1.curso})\n- ${asig2.nombreAsignatura} (Curso ${asig2.curso})`
  );
}
//Fin de bloque 2

function opcion3_consultarAlumnosDeProfesor() {
  let textoProfes = "Elie un profesor: \n";
  for (let i = 0; i < profesores.length; i++) {
    textoProfes += `${i + 1}) ${profesores[i].nombre} (${
      profesores[i].email
    })\n`;
  }
  const iProf = parseInt(prompt(textoProfes)) - 1;
  if (isNaN(iProf) || iProf < 0 || iProf >= profesores.length) {
    alert("Selección no válida.");
    return;
  }

  const profesor = profesores[iProf];
  if (!profesor.asignaturas || profesor.asignaturas.length === 0) {
    console.log(
      `El profesor ${profesor.nombre} no tiene asignaturas asignadas.`
    );
    alert("Este profe no tiene asignaturas asignadas.");
    return;
  }

  let textoAsig = `Asignaturas que imparte ${profesor.nombre}:\n`;
  for (let i = 0; i < profesor.asignaturas.length; i++) {
    const a = profesor.asignaturas[i];
    textoAsig += `${i + 1}) ${a.nombreAsignatura} (Curso ${a.curso})\n`;
  }

  const iAsig = parseInt(prompt(textoAsig)) - 1;
  if(isNaN(iAsig) || iAsig < 0 || iAsig >= profesor.asignaturas.length){
    console.log("Seleccion inválida");
    alert("Seleccion no válida");
    return;
  }
  const asignatura = profesor.asignaturas[iAsig];
    if (!asignatura.alumnos || asignatura.alumnos.length === 0) {
    alert(`No hay alumnos matriculados en ${asignatura.nombreAsignatura}.`);
    return;
  }

  let listaAlumnos = `Alumnos matriculados en ${asignatura.nombreAsignatura}:\n`;
  for (let i = 0; i < asignatura.alumnos.length; i++) {
    listaAlumnos += `${i + 1}) ${asignatura.alumnos[i].nombre}\n`;
  }
  console.log(listaAlumnos);
  alert(listaAlumnos);
}


function funcionPrueba3() {
  let salir = false;

  while (!salir) {
    const op = menuPrincipal();
    if (op === null) return;

    switch (op.trim()) {
      case "1":
        opcion1_anadirAlumno();
        break;
      case "2":
        opcion2_asignarAsignaturasAProfesores();
        break;
      case "3":
        opcion3_consultarAlumnosDeProfesor();
        break;
      case "4":
        alert("Opción 4 aún no implementada");
        break;
      case "5":
        alert("Opción 5 aún no implementada");
        break;
      case "6":
        salir = true;
        break;
      default:
        alert("Opción no válida.");
    }
  }

  alert("Aplicación finalizada.");
}

//boton
document.getElementById("btnIniciar").addEventListener("click", funcionPrueba3);
