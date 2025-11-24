class Cliente {
    #dni;
    #nombreCompleto;
    #direccion;
    #pedidos; 

    constructor(dni, nombreCompleto, direccion) {
        this.dni = dni;
        this.nombreCompleto = nombreCompleto;
        this.direccion = direccion;

        this.#pedidos = [];  
    }


    get dni() { return this.#dni; }
    get nombreCompleto() { return this.#nombreCompleto; }
    get direccion() { return this.#direccion; }
    get pedidos() { return this.#pedidos; } 

    set dni(valor) {
        if (!Util.validarEntero(valor) || !Util.esPositivoMayorQueCero(valor)) {
            throw new Error("El DNI debe ser un número entero positivo.");
        }
        this.#dni = Number(valor);
    }

    set nombreCompleto(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("El nombre completo no es válido.");
        }
        this.#nombreCompleto = valor.trim();
    }

    set direccion(valor) {
        if (!Util.validarDireccion(valor)) {
            throw new Error("La dirección no es válida.");
        }
        this.#direccion = valor.trim();
    }

    mostrarDatosCliente() {
        return `DNI: ${this.#dni} | Nombre: ${this.#nombreCompleto} | Dirección: ${this.#direccion}`;
    }

    mostrarPedidosClienteAbierto() {
        if (this.#pedidos.length === 0) {
            return "El cliente no tiene pedidos.";
        }

        // Solo pedidos abiertos (estado = "abierto")
        const abiertos = this.#pedidos.filter(p => p.estado === "abierto");

        if (abiertos.length === 0) {
            return "El cliente no tiene pedidos abiertos.";
        }

        return abiertos
            .map(p => p.mostrarDatosPedido())
            .join("\n");
    }
}
