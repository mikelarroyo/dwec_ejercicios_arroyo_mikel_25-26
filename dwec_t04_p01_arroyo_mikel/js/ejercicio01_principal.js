console.log("T04 - Ejercicio 01");
/**
 * OBJETOS PREDEFINIDOS POR EL USUARIO
 
1. 	Desarrolla un script que permita almacenar información de los alumnos de una asignatura. El script constará de dos ficheros: ejercicio0X_alumno.js y ejercicio0X_principal.js

El ejercicio se hará usando una función constructora (no uses class).
 
ejercicio0X_alumno.js
De cada alumno interesa conocer su DNI (con letra), su nombre, su edad, su fecha de nacimiento, su nota final (con decimales), su nota en el trimestre 1 (con decimales), su nota en el trimestre 2 (con decimales), su nota en el trimestre 3 (con decimales) y su sexo ('h', 'm', 'o').
 
Define el 'constructor' para crear un alumno con todos los datos de interés. El constructor recibirá todos los datos del alumno menos su edad y su nota final. La edad y la nota se calcularán automáticamente invocando a métodos del propio objeto que hacen esos cálculos.
 
Define los siguientes métodos:
-   	Será necesario definir todos los getter y setter.
-   	Define un método que devuelva una cadena con toda la información de un alumno. El método se llamará "mostrarInformacion()". No recibe nada.
-   	Define un método que se llame "calcularEdad()" que calcule la edad del alumno conociendo su fecha de nacimiento. No recibe nada. No devuelve nada. Este será el método usado en el 'constructor'.
-   	Define un método que se llame "calcularNota()" que calcule la nota media del alumno conociendo su nota en los tres trimestres. No recibe nada. No devuelve nada. Este será el método usado en el constructor.
-   	Define un método que se llame "cambiarNotas()". Este método recibe tres notas, calcula la nota final y hace los cambios pertinentes en el objeto. No devuelve nada.
-   	Define un método que se llame "comparar()" que reciba un objeto de tipo persona y devuelva 1 si la nota del objeto origen es mayor que la nota del objeto recibido, -1 si la nota del objeto origen no es mayor que la nota del objeto recibido y 0 si las notas son iguales.
-   	Define un método que se llame "estaAprobado()" que devuelve true si la nota final es 5 o más (aprobado), y false en caso contrario.


ejercicio0X_principal.js
En este script, crea una función con nombre 'funcionPrueba1()' 
donde primero se crean dos alumnos y se prueban los métodos mencionados.

 */

function funcionPrueba1() {
  const alumno1 = new Alumno(
    "12345678A",
    "Ana Lopez",
    new Date(2001, 4, 15),
    8,
    7.5,
    9,
    "m"
  );
  const alumno2 = new Alumno(
    "87654321B",
    "Carlos Pérez",
    new Date(2000, 9, 2),
    3,
    5,
    4.5,
    "h"
  );

  console.log("----Alumno 1---");
  console.log(alumno1.mostrarInformacion());

  console.log("----Alumno 2---");
  console.log(alumno2.mostrarInformacion());

  console.log("Comparar");
  console.log(alumno1.comparar(alumno2));
  console.log(alumno2.comparar(alumno1));

  console.log("Esta Aprobado?");
  console.log(alumno1.estaAprobado());
  console.log(alumno2.estaAprobado());
}

function funcionPrueba2() {
    console.log("--- Prueba de Objeto Aula ---");

    const maxAlumnos = parseInt(prompt("Máximo alumnos:"), 10);
    const aulaPrueba = new Aula(maxAlumnos, 101, "Aula de Pruebas", 1);
    
    if (isNaN(maxAlumnos) || maxAlumnos <= 0) {
        console.log("Máximo de alumnos no válido. Saliendo.");
        return;
    }

    console.log("Aula lista (" + maxAlumnos + " plazas).");
    
    let opcion = '';
    
    while (opcion !== '0') {
        const numActual = aulaPrueba.numAlumnos;
        const max = aulaPrueba.maxAlumnos;
        
        const menu = 
            "--- Menú Aula (Alumnos: " + numActual + "/" + max + ") ---\n" +
            "1. Matricular (pedir y añadir)\n" +
            "2. Mostrar todos los datos\n" +
            "3. Resumen de notas (Media, Mejor, %)\n" +
            "4. ¿Hay sitio?\n" +
            "0. Salir\n" +
            "Opción: ";

        opcion = prompt(menu);

        switch (opcion) {
            case '1':
                const nuevos = aulaPrueba.pedirDatos(); 
                if (nuevos.length > 0) {
                    aulaPrueba.insertarAlumnos(nuevos);
                    console.log("Matriculados: " + nuevos.length);
                } else {
                    console.log("Nada que añadir.");
                }
                break;
            
            case '2':
                console.log("--- Datos del Aula ---");
                console.log(aulaPrueba.mostrarDatos());
                break;
            
            case '3':
                if (!aulaPrueba.hayAlumnos()) {
                    console.log("No hay alumnos.");
                    break;
                }
                
                const media = aulaPrueba.mediasNota().toFixed(2);
                const mejor = aulaPrueba.mejorNota();
                const infoMejor = mejor ? mejor.nombre + " (" + mejor.notaFinal.toFixed(2) + ")" : 'N/D';
                const infoPorcentajes = aulaPrueba.mostrarSuspensosAprobados();
                
                console.log("--- Resumen de Notas ---");
                console.log("Media: " + media);
                console.log("Mejor: " + infoMejor);
                console.log(infoPorcentajes);
                break;
            
            case '4':
                console.log(aulaPrueba.haySitioAlumnos() ? "Sí hay sitio." : "Está lleno.");
                break;
                
            case '0':
                console.log("Fin de la prueba.");
                break;
                
            default:
                console.log("Opción no válida.");
        }
    }
};

funcionPrueba2();