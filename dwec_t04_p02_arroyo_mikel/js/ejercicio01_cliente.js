console.log("T04 - Ejercicio 01");

class Cliente{

    #dni;
    #nommbreCompleto;
    #direccion;
    #pedidos;


    constructor(dni,nombre,direccion){
        this.dni=dni;
        this.nombre=nombre;
        this.direccion=direccion;
        this.#pedidos= [];
    }

    get dni(){return this.#dni;}
    get nombreCompleto(){return this.#nommbreCompleto;}
    get direccion(){return this.#direccion;}
    get pedidos(){return this.#pedidos;}
    set dni(valor){
        if(!Util.validarEntero(valor)||!Util.validarReal(valor)){
            throw new Error("tiene que ser un numero entero");
        }
        dniLimpio=Number(valor);
        this.#dni= dniLimpio.trim();
    }
    set nombre(valor){
        if(!Util.validarNombrePersona(valor)|| !Util.vali)
    }
    








}