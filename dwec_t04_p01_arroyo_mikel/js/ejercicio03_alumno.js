// ejercicio03_alumno.js


Alumno._contadorID = 1;

function Alumno(nombre) {
    this._id = Alumno._contadorID++;  
    this._nombre = nombre;
    this._notas = {}; 
}


Object.defineProperty(Alumno.prototype, "id", {
    get: function() {
        return this._id;
    }
    
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

Alumno.pedirDatos = function() {
    const nombre = prompt("Nombre del alumno:");
    if (!nombre || nombre.trim()==="") return null;
    return new Alumno(nombre.trim());
};

