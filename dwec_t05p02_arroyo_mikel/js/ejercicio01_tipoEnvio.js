class TipoEnvio {
    #nombre;
    #diasMax;
    #pesoMax;
    #precio;

    constructor(nombre, diasMax, pesoMax, precio) {
        this.nombre = nombre;     
        this.diasMax = diasMax;   
        this.pesoMax = pesoMax; 
        this.precio = precio;    
    }

    get nombre() { return this.#nombre; }
    get diasMax() { return this.#diasMax; }
    get pesoMax() { return this.#pesoMax; }
    get precio() { return this.#precio; }

    set nombre(valor) {
        if (!Util.validarTitulo(valor)) {
            throw new Error("Nombre de tipo de envío no válido.");
        }
        this.#nombre = valor.trim();
    }

    set diasMax(valor) {
        if (!Util.validarDiasEnvio(valor)) {
            throw new Error("Los días máximos deben ser un entero mayor que 0.");
        }
        this.#diasMax = Number(valor);
    }

    set pesoMax(valor) {
        if (!Util.validarPeso(valor)) {
            throw new Error("El peso máximo debe ser un número mayor que 0.");
        }
        this.#pesoMax = Number(valor);
    }

    set precio(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("El precio debe ser un número positivo.");
        }
        this.#precio = Number(valor);
    }
    mostrarDatosTipoEnvio() {
        return `Tipo: ${this.#nombre} | Días máx.: ${this.#diasMax} | Peso máx.: ${this.#pesoMax} kg | Precio: ${this.#precio}€`;
    }
}
