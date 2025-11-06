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
    if (!Array.isArray(alumnos)) {
      console.log("Setter alumnos: debe propocionarse un array.");
      return;
    }
    this._alumnos = alumnos;
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
  set: function (valor) {
    const n = Number(valor);
    if (!Number.isInteger(n) || n < 0) {
      console.log("Setter maxAlumnos: debe ser un entero >= 0.");
      return;
    }
    if (Array.isArray(this.alumnos) && n < this.alumnos.length) {
      console.log(
        "Setter maxAlumnos: no puede ser menor que el número actual de alumnos."
      );
    }
    this._maxAlumnos = n;
  },
});
Object.defineProperty(Aula.prototype, "id", {
  get: function () {
    return this._id;
  },
  set: function (id) {
    if (!Number.isInteger(id) || Number(id) < 0) {
      console.log("Setter id: debe ser un entero > 0");
      return;
    }
    this._id = Number(id);
  },
});
Object.defineProperty(Aula.prototype, "descripcion", {
  get: function () {
    return this._descripcion;
  },
  set: function (descripcion) {
    if (descripcion == null) {
      this._descripcion = "";
      return;
    }
    this._descripcion = String(descripcion).trim();
  },
});
Object.defineProperty(Aula.prototype, "curso", {
  get: function () {
    return this._curso;
  },
  set: function (curso) {
    if (curso === 1 || curso === 2 || curso === 3 || curso === 4) {
      this._curso = curso;
    } else {
      console.log("Setter curso: debe ser 1, 2, 3 o 4.");
      return;
    }
  },
});



Aula.prototype.haySitioAlumnos = function (cantidad) {
    const nuevos = parseFloat(cantidad) || 1; 
    return this.alumnos.length + nuevos <= this._maxAlumnos;
};

Aula.prototype.hayAlumnos = function () {
    return this.alumnos.length > 0;
};


Aula.prototype.obtenerSitiosAlumnos = function () {
    return this._maxAlumnos - this.alumnos.length;
};



Aula.prototype.pedirDatosUnAlumno = function () {
    console.log("Pidiendo datos para UN alumno...");
    
    const nombre = prompt("Nombre:");
    if (nombre === null) return null; 

    const dni = prompt("DNI:");
    if (dni === null) return null; 

    const fecha = prompt("Fecha Nacimiento (YYYY-MM-DD):");
    if (fecha === null) return null; 

    const entradaNota1 = prompt("Nota T1:");
    if (entradaNota1 === null) return null;
    const n1 = parseFloat(entradaNota1);
    if (isNaN(n1)) return null; 

    const entradaNota2 = prompt("Nota T2:");
    if (entradaNota2 === null) return null;
    const n2 = parseFloat(entradaNota2);
    if (isNaN(n2)) return null; 

    const entradaNota3 = prompt("Nota T3:");
    if (entradaNota3 === null) return null;
    const n3 = parseFloat(entradaNota3);
    if (isNaN(n3)) return null; 
    
    const sexo = prompt("Sexo (h/m/o):");
    if (sexo === null) return null;


    return new Alumno(dni, nombre, fecha, n1, n2, n3, sexo);
};

Aula.prototype.pedirDatos = function () {
    const plazasLibres = this.obtenerSitiosAlumnos();
    
    const entradaCantidad = prompt(`¿Cuántos alumnos quieres matricular? (Quedan ${plazasLibres} plazas)`);
    
    if (entradaCantidad === null) return [];

    const cantidad = parseInt(entradaCantidad, 10);
    
    if (isNaN(cantidad) || cantidad <= 0 || cantidad > plazasLibres) {
        console.log("Cantidad no válida o no hay sitio suficiente.");
        return [];
    }
    
    const nuevos = [];
    
    for (let i = 0; i < cantidad; i++) {
        const alumno = this.pedirDatosUnAlumno();
        
        if (alumno === null) {
            console.log("Entrada de datos cancelada. Se devuelve un array vacío.");
            return [];
        }
        nuevos.push(alumno);
    }
    return nuevos;
};


Aula.prototype.insertarAlumnos = function (arrayAlumnos) {
    if (!Array.isArray(arrayAlumnos)) {
        console.warn("insertarAlumnos debe recibir un array.");
        return;
    }

    for (let i = 0; i < arrayAlumnos.length; i++) { 
        if (this.alumnos.length >= this._maxAlumnos) {
            console.log("Aula llena. Deteniendo la inserción.");
            break;
        }
        this.alumnos.push(arrayAlumnos[i]);
    }
};



Aula.prototype.mostrarDatos = function () {
    if (!this.hayAlumnos()) {
        return `Aula ${this._id} (${this._descripcion}): No hay alumnos.`;
    }

    let salida = `--- Aula ${this._id} (Curso ${this._curso}) - Alumnos: ${this.alumnos.length} ---\n`;
    
    this.alumnos.forEach(function(alumno) {
        salida += alumno.mostrarInformacion() + '\n'; 
    });

    return salida;
};

Aula.prototype.mediasNota = function () {
    if (!this.hayAlumnos()) return 0;
    
    let sumaNotas = 0;
    
    for (let i = 0; i < this.alumnos.length; i++) {
        sumaNotas += (this.alumnos[i].notaFinal || 0);
    }
    
    return sumaNotas / this.alumnos.length;
};

Aula.prototype.mejorNota = function () {
    if (!this.hayAlumnos()) return null;
    
    let mejorAlumno = this.alumnos[0];
    let mejorNotaValor = mejorAlumno.notaFinal || -1;
    
    for (let i = 1; i < this.alumnos.length; i++) {
        const notaActual = this.alumnos[i].notaFinal || -1;
        if (notaActual > mejorNotaValor) {
            mejorNotaValor = notaActual;
            mejorAlumno = this.alumnos[i];
        }
    }
    return mejorAlumno;
};


Aula.prototype.porcentajeSuspensos = function () {
    if (!this.hayAlumnos()) return 0;
    
    let suspensos = 0;
    for (let i = 0; i < this.alumnos.length; i++) {
        if ((this.alumnos[i].notaFinal || 0) < 5) {
            suspensos++;
        }
    }
    return (suspensos / this.alumnos.length) * 100;
};

Aula.prototype.mostrarSuspensosAprobados = function () {
    const pSuspensos = this.porcentajeSuspensos();
    const pAprobados = 100 - pSuspensos;

    return `Aprobados: ${pAprobados.toFixed(2)}%, Suspensos: ${pSuspensos.toFixed(2)}%`;
};

Aula.prototype.inicializarGestionGrupos = function (nombresGruposIniciales = ["Grupo 1" , "Grupo 2", "Grupo 3"]){
  this._grupos = new Set(nombresGruposIniciales);
  this._alumnosPorGrupo = new Map();
  console.log("Gestion de grupos iniciada")

};