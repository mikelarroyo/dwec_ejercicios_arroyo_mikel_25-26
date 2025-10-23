console.log("T04 - Ejercicio 01");
/**
 * OBJETOS PREDEFINIDOS POR EL USUARIO
 
1. 	Desarrolla un script que permita almacenar información de los alumnos de una asignatura. El script constará de dos ficheros: ejercicio0X_alumno.js y ejercicio0X_principal.js

El ejercicio se hará usando una función constructora (no uses class).
 
ejercicio0X_alumno.js
De cada alumno interesa conocer
su DNI (con letra), 
su nombre, 
su edad, 
su fecha de nacimiento, 
su nota final (con decimales),
su nota en el trimestre 1 (con decimales),
su nota en el trimestre 2 (con decimales), 
su nota en el trimestre 3 (con decimales) 
y su sexo ('h', 'm', 'o').
 
Define el 'constructor' para crear un alumno con todos los datos de interés.
 El constructor recibirá todos los datos del alumno menos su edad y su nota final. La edad y la nota se calcularán automáticamente
  invocando a métodos del propio objeto que hacen esos cálculos.
 
Define los siguientes métodos:
-   	Será necesario definir todos los getter y setter.
-   	Define un método que devuelva una cadena con toda la información de un alumno. El método se llamará "mostrarInformacion()". No recibe nada.
-   	Define un método que se llame "calcularEdad()" que calcule la edad del alumno conociendo su fecha de nacimiento. No recibe nada. No devuelve nada. Este será el método usado en el 'constructor'.
-   	Define un método que se llame "calcularNota()" que calcule la nota media del alumno conociendo su nota en los tres trimestres. No recibe nada. No devuelve nada.
 Este será el método usado en el constructor.
-   	Define un método que se llame "cambiarNotas()". Este método recibe tres notas, calcula la nota final y hace los cambios pertinentes en el objeto. No devuelve nada.
-   	Define un método que se llame "comparar()" que reciba un objeto de tipo persona y devuelva 1 si la nota del objeto origen es mayor que la nota del objeto recibido, -1 si la nota del objeto origen no es mayor que la nota del objeto recibido y 0 si las notas son iguales.
-   	Define un método que se llame "estaAprobado()" que devuelve true si la nota final es 5 o más (aprobado), y false en caso contrario.


ejercicio0X_principal.js
En este script, crea una función con nombre 'funcionPrueba1()' donde primero se crean dos alumnos y se prueban los métodos mencionados.

 */

function Alumno(dni, nombre, fechaNacimiento, notaT1, notaT2, notaT3, sexo) {
  this.dni = dni;
  this.nombre = nombre;
  this.fechaNacimiento = fechaNacimiento;
  this.notaT1 = notaT1;
  this.notat2 = notaT2;
  this.notaT3 = notaT3;
  this.sexp = sexo;
  this.edad = function () {};
  this.calcularNota = function () {
    let media = (this.notaT1 + this.notaT2 + this.notaT3) / 3;
    return Math.round(media * 100) / 100;
  };
}
Object.defineProperty(Alumno.prototype, "nombre", {
  get: function () {
    return this._nombre;
  },
  set: function (name) {
    this._nombre = name.trim();
  },
});

Object.defineProperty(Alumno.prototype, "notaT1", {
  get: function () {
    return this._notaT1;
  },
  set: function (nota) {
    if (isNaN(nota) || num < 0 || num > 10) {
      this._notaT1= null;
    }
    this._notaT1 = Number(nota);
  },
});
Object.defineProperty(Alumno.prototype, "notaT2", {
  get: function () {
    return this._notaT2;
  },
  set: function (nota) {
    if (isNaN(nota) || num < 0 || num > 10) {
      this._notaT2=null;
    }
    this._notaT2 = Number(nota);
  },
});
Object.defineProperty(Alumno.prototype, "notaT3", {
  get: function () {
    return this._notaT3;
  },
  set: function (nota) {
    if (isNaN(nota) || num < 0 || num > 10) {
      this._notaT3= null;
    }
    this._notaT3 = Number(nota);
  },
});

Object.defineProperties(Alumno.prototype, "fechaNacimiento", {
    get: function() {
        return this._fechaNacimiento;
    },
    set: function (fechaNacimiento){
        if(!(fechaNacimiento instanceof Date))
            this._fechaNacimiento= null;
    } 
});