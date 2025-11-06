console.log("T04 - Ejercicio 03");


const profesor1 = new Object({
    nombre: "Alberto",
    email: "alberto@gmail.com",
    asignaturas:[]

});

const profesor2 = new Object({
    nombre: "Juanma",
    email: "juanma@gmail.com",
    asignaturas:[]

});
const profesor3 = new Object({
    nombre: "julian",
    email: "julian@gmail.com",
    asignaturas:[]

});
const profesor4 = new Object({
    nombre: "Angel",
    email: "angel@gmail.com",
    asignaturas:[]

});
function addGetterNombre(obj){
    Object.defineProperty(obj, "getNombre", {
        get: function(){
            return this.nombre;
        },
        enumerable: true,
        configurable: true
    });
}

function addSetterNombre(obj){
    Object.defineProperty(obj, "setNombre", {
        set: function(v){
            this.nombre = String(v ?? "").trim();
        },
        enumerable: true,
        configurable: true
    });
}

function addGetterEmail(obj){
    Object.defineProperty(obj, "getEmail", {
        get: function(){
            return this.email;
        },
        enumerable: true,
        configurable: true
    });
}

function addSetterEmail(obj){
    Object.defineProperty(obj, "setEmail", {
        set: function(v){
            this.email = String(v ?? "").trim();
        },
        enumerable: true,
        configurable: true
    });
}
[profesor1, profesor2, profesor3, profesor4].forEach(addGetterNombre);
[profesor1, profesor2, profesor3, profesor4].forEach(addSetterNombre);
[profesor1, profesor2, profesor3, profesor4].forEach(addGetterEmail);
[profesor1, profesor2, profesor3, profesor4].forEach(addSetterEmail);











