console.log("T04 - Ejercicio 01: Cliente");

class Cliente {
    // ===== Atributos Privados =====
    #dni;
    #nombreCompleto;
    #direccion;
    #pedidosCliente; // Array de referencias a objetos Pedido

    // ===== Constructor =====
    constructor(dni, nombreCompleto, direccion) {
        if (!Util.validarEntero(dni) || !Util.esPositivoMayorQueCero(dni)) {
            throw new Error("DNI del cliente inválido. Debe ser un entero positivo.");
        }
        this.#dni = Number(dni);
        this.#pedidosCliente = [];
        this.nombreCompleto = nombreCompleto;
        this.direccion = direccion;
    }

    get dni() {
        return this.#dni;
    }
    get nombreCompleto() {
        return this.#nombreCompleto;
    }
    get direccion() {
        return this.#direccion;
    }
    get pedidosCliente() {
        return this.#pedidosCliente; 
    }
    
    set nombreCompleto(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("Nombre completo inválido. Mínimo 3 caracteres y solo letras/espacios.");
        }
        this.#nombreCompleto = valor.trim();
    }

    set direccion(valor) {
        if (!Util.validarDireccion(valor)) {
            throw new Error("Dirección inválida.");
        }
        this.#direccion = valor.trim();
    }


    mostrarDatosCliente() {
        return `
            CLIENTE
            - DNI: ${this.dni}
            - Nombre: ${this.nombreCompleto}
            - Dirección: ${this.direccion}
            - Pedidos realizados: ${this.pedidosCliente.length}
        `;
    }

    mostrarPedidosClienteAbierto() {
        // Usa el getter y filter()
        const pedidosAbiertos = this.pedidosCliente.filter(pedido => pedido.abierto === true);
        
        if (pedidosAbiertos.length === 0) {
            return `El cliente ${this.nombreCompleto} no tiene pedidos abiertos.`;
        }
        
        let cadena = `--- Pedidos Abiertos de ${this.nombreCompleto} ---\n`;
        
        // Usa map para mostrar la información básica de cada pedido abierto
        cadena += pedidosAbiertos.map(pedido => {
            // Asume que la clase Pedido tiene un getter para id, fecha y precioTotalConEnvioConIVA
            return `ID ${pedido.id} | Fecha: ${pedido.fecha.toLocaleDateString()} | Total: ${pedido.precioTotalConEnvioConIVA.toFixed(2)} €`;
        }).join('\n');
        
        return cadena;
    }

    agregarPedido(pedido) {
        if (typeof Pedido === 'undefined' || !(pedido instanceof Pedido)) {
            throw new Error("Solo se pueden agregar instancias de Pedido.");
        }
        this.#pedidosCliente.push(pedido);
        return this.#pedidosCliente.length;
    }
}