// ejercicio03_alumno.js

// Contador estático para IDs autoincrementados
Alumno._contadorID = 1;

function Alumno(nombre) {
    this._id = Alumno._contadorID++;  // autoincrementa con cada alumno nuevo
    this._nombre = nombre;
    this._notas = {};  // ejemplo: { "Lengua II": 7.5 }
}


Object.defineProperty(Alumno.prototype, "id", {
    get: function() {
        return this._id;
    }
    // No hay setter → el ID no se puede modificar
});

Object.defineProperty(Alumno.prototype, "nombre", {
    get: function() {
        return this._nombre;
    },
    set: function(v) {
        this._nombre = String(v ?? "").trim();
    }
});

Object.defineProperty(Alumno.prototype, "notas", {
    get: function() {
        return this._notas;
    },
    set: function(v) {
        this._notas = (v && typeof v === "object") ? v : {};
    }
});

Alumno.prototype.mostrarInformacion = function() {
    return (
        "ID: " + this.id + "\n" +
        "Nombre: " + this.nombre + "\n" +
        "Notas: " + JSON.stringify(this.notas)
    );
};


