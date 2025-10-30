console.log("T04 - Ejercicio 02");

/**
 * ejercicio0X_aula.js
Un aula está formada por un grupo de alumnos. En nuestro caso un objeto aula tiene varios atributos: 
Un array de alumnos.
Un número que indica el número de alumnos y alumnas que hay en el aula.
Un número máximo de alumnos y alumnas que puede haber en el aula.
Identificador de aula.
Descripción de aula.
Curso: 1, 2, 3 o 4.

Define el 'constructor' para crear un aula. El constructor recibirá el número máximo de alumnos y alumnas que constituyen el aula. También recibirá el identificador, su descripción y el curso.

Nota: El script hará una serie de validaciones básicas y finalmente hemos decidido que las validaciones se realizarán fuera de la función constructora, 
ya que esta debe asumir que los datos que recibe son correctos. Esta decisión responde al deseo de separación de responsabilidades y la claridad estructural del código. 

Solo se incluirán validaciones dentro de la función constructora cuando se desee que esta sea autocontenible y robusta, como en el caso de diseñar una biblioteca reutilizable o un componente que pueda recibir datos de fuentes externas no controladas.

Define los siguientes métodos:
-   	Será necesario definir todos los getter y setter.
-   	Define un método que se denomine "haySitioAlumnos()" que te indique si hay sitio en el aula para nuevos alumnos. Devuelve true/false.
-   	Define un método que se denomine "hayAlumnos()" que te indique si hay alumnos en el aula. Devuelve true/false.
-   	Define un método que se denomine "pedirDatosUnAlumno()" que pedirá los datos de un alumno al usuario, creará el objeto alumno y lo devolverá. Esta función verifica que los datos sean correctos. Este método no recibe nada.
-   	Define un método que se denomine "pedirDatos()" que pedirá al usuario el número de alumnos que quiere matricular en el aula y verificará si hay sitio. Si no hay sitio para todos, no pide datos y  devuelve un array vacío. Si hay sitio, pedirá los datos de los alumnos del aula, después creará dichos alumnos y los guardará en el array temporal. El método no recibe nada y devuelve un array que será el que se añade posteriormente al array de alumnos del aula.
-    Define un método que se denomine "insertarAlumnos()" que recibe un array de alumnos a insertar que se añade al final del array de alumnos del objeto. No devuelve nada. Esto se hará así siempre aunque solo haya un alumno para insertar.
-   	Define un método que se denomine "mostrarDatos()" que devuelve los datos de todos los alumnos en una cadena. Este método no recibe nada.
-   	Define un método que se denomine "mediasNota()" que devuelve la media de las notas finales del aula. Este método no recibe nada y devuelve la media de notas.
-   	Define un método que se denomine "mejorNota()" que devuelva al alumno con la mejor nota. Este método no recibe nada.
-   	Define un método que se denomine "porcentajeSuspensos()" que devuelva el porcentaje de alumnos con menos de un 5 en la calificación final. Este método no recibe nada.
-   	Define un método que se denomine "mostrarSuspensosAprobados()" que devuelva una cadena con el % de aprobados y suspensos. Este método no recibe nada.

ejercicio0X_principal.js
En este script, crea una función con nombre 'funcionPrueba2()' que pida al usuario el número de alumnos que máximo hay en un aula y pruebe los distintos métodos del objeto aula creado. Para ello habrá un menú que se mostrará de forma iterativa hasta que el usuario marque la opción salir.

 */

function Aula(maxAlumnos, id, descripcion, curso) {
  this._alumnos = [];
  this._numAlumnos = 0;
  this._maxAlumnos = maxAlumnos;
  this._id = id;
  this._descripcion = descripcion;
  this._curso = curso;
}

Object.defineProperty(Aula.prototype, "alumnos", {
  get: function () {
    return this._alumnos;
  },
  set: function (alumnos) {
    if(!Array.isArray(alumnos))
    {console.log("Setter alumnos: debe propocionarse un array.")
      return;
    }
    this._alumnos = alumnos;
    this._numAlumnos = alumnos.length;
  },
});

Object.defineProperty(Aula.prototype, "numAlumnos", {
  get: function () {
    return this._alumnos.length;
  },
  
});

Object.defineProperty(Aula.prototype, "maxAlumnos", {
  get: function () {
    return this._maxAlumnos;
  },
  set: function (maxAlumnos) {
    this._maxAlumnos = maxAlumnos;
  },
});
Object.defineProperty(Aula.prototype, "id", {
  get: function () {
    return this._id;
  },
  set: function (id) {
    this._id = id;
  },
});
Object.defineProperty(Aula.prototype, "descripcion", {
  get: function () {
    return this._descripcion;
  },
  set: function (descripcion) {
    this._descripcion = descripcion;
  },
});
Object.defineProperty(Aula.prototype, "curso", {
  get: function () {
    return this._curso;
  },
  set: function (curso) {
    this._curso = curso;
  },
});
