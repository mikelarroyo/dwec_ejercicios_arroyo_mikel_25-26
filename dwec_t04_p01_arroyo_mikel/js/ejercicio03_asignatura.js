// ===============================
// Archivo: ejercicio03_asignaturas.js
// ===============================

const lengua2 = { _curso: 2, _nombreAsignatura: "Lengua II", _tipo: "obligatoria", _alumnos: [] };
const mates2 = { _curso: 2, _nombreAsignatura: "Matemáticas II", _tipo: "obligatoria", _alumnos: [] };
const economia2 = { _curso: 2, _nombreAsignatura: "Economía", _tipo: "optativa", _alumnos: [] };
const informatica2 = { _curso: 2, _nombreAsignatura: "Informática", _tipo: "optativa", _alumnos: [] };


const lengua3 = { _curso: 3, _nombreAsignatura: "Lengua III", _tipo: "obligatoria", _alumnos: [] };
const mates3 = { _curso: 3, _nombreAsignatura: "Matemáticas III", _tipo: "obligatoria", _alumnos: [] };
const dibujo3 = { _curso: 3, _nombreAsignatura: "Dibujo Técnico", _tipo: "optativa", _alumnos: [] };
const musica3 = { _curso: 3, _nombreAsignatura: "Música", _tipo: "optativa", _alumnos: [] };

const Asignatura = [
  lengua2, mates2, economia2, informatica2,
  lengua3, mates3, dibujo3, musica3
];

// -----------------------------------------
// Getters y setters para las propiedades
// -----------------------------------------

function addGettersYSetters(obj) {
  Object.defineProperty(obj, "nombreAsignatura", {
    get: function () {
      return this._nombreAsignatura;
    },
    set: function (v) {
      this._nombreAsignatura = String(v ?? "").trim();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(obj, "tipo", {
    get: function () {
      return this._tipo;
    },
    set: function (v) {
      this._tipo = String(v ?? "").trim().toLowerCase();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(obj, "curso", {
    get: function () {
      return this._curso;
    },
    set: function (v) {
      const n = Number(v);
      if ([1, 2, 3, 4].includes(n)) {
        this._curso = n;
      }
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(obj, "alumnos", {
    get: function() {
      return this._alumnos;
    },
    set: function(v) {
      if (Array.isArray(v)) this._alumnos = v;
    },
    enumerable: true,
    configurable: true
  });

}



Asignatura.forEach(addGettersYSetters);


function mostrarInfo(asignatura) {
  console.log(`Asignatura: ${asignatura.nombreAsignatura} (${asignatura.tipo}) - Curso ${asignatura.curso}`);
}

// Asigna un profesor (se reutilizará con call/apply más adelante)
function asignarProfesor(asignatura, nombre, correo) {
  console.log(`Profesor ${nombre} (${correo}) imparte ${asignatura.nombreAsignatura}`);
}
