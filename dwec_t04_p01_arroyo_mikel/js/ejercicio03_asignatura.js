
const lengua2 = new Object({
    curso: 2,
    nombreAsignatura: "Lengua II",
    tipo: "Obligatoria",
    alumnos: []
});

const mates2 = new Object({
    curso: 2,
    nombreAsignatura: "Matemáticas II",
    tipo: "Obligatoria",
    alumnos: []
});


const economia2 = new Object({
    curso: 2,
    nombreAsignatura: "Economía",
    tipo: "Optativa",
    alumnos: []
});

const informatica2 = new Object({
    curso: 2,
    nombreAsignatura: "Informática",
    tipo: "Optativa",
    alumnos: []
});

const lengua3 = new Object({
    curso: 3,
    nombreAsignatura: "Lengua III",
    tipo: "Obligatoria",
    alumnos: []
});

const mates3 = new Object({
    curso: 3,
    nombreAsignatura: "Matemáticas III",
    tipo: "Obligatoria",
    alumnos: []
});


const dibujo3 = new Object({
    curso: 3,
    nombreAsignatura: "Dibujo Técnico",
    tipo: "Optativa",
    alumnos: []
});

const musica3 = new Object({
    curso: 3,
    nombreAsignatura: "Música",
    tipo: "Optativa",
    alumnos: []
});

function addGetterNombreAsignatura(obj){
    Object.defineProperty(obj, "getNombreAsignatura", {
        get: function(){
            return this.nombreAsignatura;
        },
        enumerable: true,
        configurable: true
    });
}

function addGetterTipo(obj){
    Object.defineProperty(obj, "getTipo", {
        get: function(){
            return this.tipo;
        },
        enumerable: true,
        configurable: true
    });
}

function addGetterCurso(obj){
    Object.defineProperty(obj,"getCurso", {
        get: function(){
            return this.curso;
        },
        enumerable: true,
        confirable: true
    });
}

function addSetterNombreAsignatura(obj){
    Object.defineProperty(obj, "setNombreAsignatura", {
        set: function(v){
            this.nombreAsignatura = String(v ?? "").trim();
        },
        enumerable: true,
        configurable: true
    });
}

function addSetterTipo(obj){
    Object.defineProperty(obj, "setTipo", {
        set: function(v){
            this.tipo = String(v ?? "").trim();
        },
        enumerable: true,
        configurable: true
    });
}

function addSetterCurso(obj){
    Object.defineProperty(obj, "setCurso", {
        set: function(v){
            const n = Number(v);
            if ([1,2,3,4].includes(n)){
                this.curso = n;
            }
        },
        enumerable: true,
        configurable: true
    });
}

const asignaturas = [
    lengua2, mates2, economia2, informatica2,
    lengua3, mates3, dibujo3, musica3
];

asignaturas.forEach(addGetterNombreAsignatura);
asignaturas.forEach(addGetterTipo);
asignaturas.forEach(addGetterCurso);

asignaturas.forEach(addSetterNombreAsignatura);
asignaturas.forEach(addSetterTipo);
asignaturas.forEach(addSetterCurso);

