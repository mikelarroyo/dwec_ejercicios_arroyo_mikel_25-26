

// AULA DE 1º
const AU01 = new Aula("AU01", "Aula de primero", 40, 1);

// AULA DE 2º (esta es la que vas a usar en la prueba)
const AU02 = new Aula("AU02", "Aula de segundo", 30, 2);

// AULA DE 3º
const AU03 = new Aula("AU03", "Aula de tercero", 35, 3);

// AULA DE 4º
const AU04 = new Aula("AU04", "Aula de cuarto", 25, 4);

// Conjunto para usar en menus
const AULAS = [AU01, AU02, AU03, AU04];


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
























//boton
document.getElementById("btnIniciar").addEventListener("click", funcionPrueba3);