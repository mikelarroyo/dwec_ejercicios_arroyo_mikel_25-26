// ejercicio03_aula.js

function Aula(id, descripcion, maxAlumnos, curso) {
  this._alumnos = [];
  this._numAlumnos = 0;              
  this._id = id;
  this._descripcion = descripcion;
  this._maxAlumnos = maxAlumnos;
  this._curso = curso;
}


Object.defineProperty(Aula.prototype, "alumnos", {
  get: function () {
    return this._alumnos;
  },
  set: function (alumnos) {
    if (!Array.isArray(alumnos)) {
      console.log("Setter alumnos: debe proporcionarse un array.");
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
      console.log("Setter maxAlumnos: no puede ser menor que el número actual de alumnos.");
      return;
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
    if ([1, 2, 3, 4].includes(curso)) {
      this._curso = curso;
    } else {
      console.log("Setter curso: debe ser 1, 2, 3 o 4.");
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

Aula.prototype.insertarAlumno = function (alumno) {
    if (this.alumnos.length < this._maxAlumnos) {
        this.alumnos.push(alumno);
        return true;
    }
    return false;
};
