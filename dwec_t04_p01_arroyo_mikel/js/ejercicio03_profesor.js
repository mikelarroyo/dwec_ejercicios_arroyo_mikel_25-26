// ===============================
// Archivo: ejercicio03_profesores.js
// ===============================

console.log("T04 - Ejercicio 03 - Profesores");

// -----------------------------------------
// Objetos literales de profesores
// -----------------------------------------

const profesor1 = { _nombre: "Alberto", _email: "alberto@gmail.com", _asignaturas: [] };
const profesor2 = { _nombre: "Juanma",  _email: "juanma@gmail.com",  _asignaturas: [] };
const profesor3 = { _nombre: "Julian",  _email: "julian@gmail.com",  _asignaturas: [] };
const profesor4 = { _nombre: "Angel",   _email: "angel@gmail.com",   _asignaturas: [] };

const profesores = [profesor1, profesor2, profesor3, profesor4];

// -----------------------------------------
// Getters y setters
// -----------------------------------------
function addGettersYSettersProfesor(obj) {
  Object.defineProperty(obj, "nombre", {
    get: function () { return this._nombre || ""; },
    set: function (v) { this._nombre = String(v ?? "").trim(); },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(obj, "email", {
    get: function () { return this._email || ""; },
    set: function (v) { this._email = String(v ?? "").trim(); },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(obj, "asignaturas", {
    get: function () {
      // 💡 Si aún no existe el array, lo inicializamos una sola vez
      if (!this._asignaturas) this._asignaturas = [];
      return this._asignaturas;
    },
    set: function (v) {
      if (Array.isArray(v)) this._asignaturas = v;
    },
    enumerable: true,
    configurable: true
  });
}


// Aplicar los getters y setters a todos los profesores
profesores.forEach(addGettersYSettersProfesor);
