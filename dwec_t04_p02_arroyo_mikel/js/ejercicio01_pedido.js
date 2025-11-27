console.log("T04 - Ejercicio 01: Pedido");

class Pedido {
    
    #id;
    #cliente;
    #librosPedido; // Clave: ISBN, Valor: {libro: Libro, unidades: number}
    #fecha;
    #tipoEnvioPedido;
    #precioTotalSinEnvioSinIVA;
    #precioTotalConEnvioSinIVA;
    #precioTotalConEnvioConIVA;
    #descuento;
    #abierto;
    static #ultimoId = 0;

    static obtenerSiguienteId() {
        Pedido.#ultimoId++;
        return Pedido.#ultimoId;
    }

    constructor(cliente) {
        if (!(cliente instanceof Cliente)) {
            throw new Error("El pedido debe tener un cliente válido.");
        }

        this.#id = Pedido.obtenerSiguienteId();
        this.#cliente = cliente;
        this.#librosPedido = new Map(); 
        this.#fecha = new Date();
        this.#tipoEnvioPedido = null;
        this.#precioTotalSinEnvioSinIVA = 0;
        this.#precioTotalConEnvioSinIVA = 0;
        this.#precioTotalConEnvioConIVA = 0;
        this.#descuento = 0;
        this.#abierto = true;
        
        // Llamada al método del cliente para asginarlo.
        this.#cliente.agregarPedido(this); 
    }

    get id() { return this.#id; }
    get cliente() { return this.#cliente; }
    get librosPedido() { return this.#librosPedido; }
    get fecha() { return this.#fecha; }
    get tipoEnvioPedido() { return this.#tipoEnvioPedido; }
    get precioTotalSinEnvioSinIVA() { return this.#precioTotalSinEnvioSinIVA; }
    get precioTotalConEnvioSinIVA() { return this.#precioTotalConEnvioSinIVA; }
    get precioTotalConEnvioConIVA() { return this.#precioTotalConEnvioConIVA; }
    get descuento() { return this.#descuento; }
    get abierto() { return this.#abierto; }

    set abierto(valor) {
        if (typeof valor === "boolean") {
            this.#abierto = valor;
        }
    }
    hayLibros() {
        return this.librosPedido.size > 0;
    }
    mostrarDatosPedido() { 
        this.calcularTotal();

        // **USANDO GETTERS**
        let info = `PEDIDO #${this.id}\n`;
        info += `Cliente: ${this.cliente.nombreCompleto}\n`;
        info += `Fecha: ${this.fecha.toLocaleDateString()}\n`;
        info += `Estado: ${this.abierto ? "Abierto" : "Cerrado"}\n`;
        
        info += `--- Libros ---\n`;
        
        // **USANDO GETTER**
        for (const item of this.librosPedido.values()) {
            const libro = item.libro;
            const unidades = item.unidades;
            
            const tipo = (libro instanceof Ebook) ? "Ebook" : "Papel";
            const precio = libro.precio.toFixed(2);
            info += `- ${libro.titulo} (${tipo}) x${unidades} (${precio}€/u)\n`; 
        }

        // **USANDO GETTER**
        const envioNombre = this.tipoEnvioPedido ? this.tipoEnvioPedido.nombre : "Sin envío";
        info += `\nEnvío: ${envioNombre}\n`;
        info += `Total sin IVA: ${this.precioTotalConEnvioSinIVA.toFixed(2)}€\n`;
        info += `Total con IVA: ${this.precioTotalConEnvioConIVA.toFixed(2)}€\n`;

        return info;
    }

    insertarLibro(libro, unidades) {
        if (!(libro instanceof Libro)) {
            throw new Error("El objeto no es un libro válido.");
        }

        let cant = Number(unidades);
        if (!Number.isInteger(cant) || cant <= 0) {
            throw new Error("Las unidades deben ser un entero positivo.");
        }
        
        const isbn = libro.isbn;

        if (libro instanceof Ebook) {
            if (cant !== 1) {
                throw new Error("Los Ebooks solo se pueden comprar de 1 en 1.");
            }
            // **USANDO GETTER**
            if (this.librosPedido.has(isbn)) {
                throw new Error("Este Ebook ya está en el pedido.");
            }
            this.#librosPedido.set(isbn, { libro: libro, unidades: cant });

        } else { 
            // **USANDO GETTER**
            const itemActual = this.librosPedido.get(isbn);
            if (itemActual) {
                itemActual.unidades += cant;
                this.#librosPedido.set(isbn, itemActual);
            } else {
                this.#librosPedido.set(isbn, { libro: libro, unidades: cant });
            }
        }
        
        let totalUnidades = 0;
        // **USANDO GETTER**
        for (const item of this.librosPedido.values()) {
            totalUnidades += item.unidades;
        }
        return totalUnidades;
    }

    establecerTipoEnvio(tipoEnvio) { 
        if (!(tipoEnvio instanceof TipoEnvio)) {
            throw new Error("El tipo de envío no es válido.");
        }
        let pesoTotal = 0;
        let hayPapel = false;
        for (const item of this.librosPedido.values()) {
            const libro = item.libro;
            const unidades = item.unidades;

            if (libro instanceof LibroPapel) {
                hayPapel = true;
                pesoTotal += (libro.peso * unidades);
            }
        }

        if (!hayPapel) {

            this.#tipoEnvioPedido = null;
            return false;
        }

        if (pesoTotal > tipoEnvio.pesoMax) { 
            throw new Error(`El peso (${pesoTotal}kg) supera el máximo permitido (${tipoEnvio.pesoMax}kg).`);
        }

        this.#tipoEnvioPedido = tipoEnvio;
        return true;
    }

    calcularTotal() { 
        let totalLibros = 0;
        const mesActual = this.fecha.getMonth(); 
        const esPromocion = (mesActual === 10 || mesActual === 11);
        for (const item of this.librosPedido.values()) {
            const libro = item.libro;
            const unidades = item.unidades;

            let precio = libro.precio;
            if (esPromocion) {
                precio = precio * 0.90;
            }
            totalLibros += (precio * unidades);
        }

        this.#precioTotalSinEnvioSinIVA = totalLibros;
        if (this.descuento > 0) {
            const rebaja = this.#precioTotalSinEnvioSinIVA * (this.descuento / 100);
            this.#precioTotalSinEnvioSinIVA -= rebaja;
        }

        let costeEnvio = 0;
        if (this.tipoEnvioPedido) {
            let hayPapel = false;
            for (const item of this.librosPedido.values()) {
                if (item.libro instanceof LibroPapel) {
                    hayPapel = true;
                    break;
                }
            }
            
            if (hayPapel) {
                costeEnvio = this.tipoEnvioPedido.precio;
            }
        }

        this.#precioTotalConEnvioSinIVA = this.#precioTotalSinEnvioSinIVA + costeEnvio;
        this.#precioTotalConEnvioConIVA = this.#precioTotalConEnvioSinIVA * 1.21;
        this.#precioTotalConEnvioConIVA = Number(this.#precioTotalConEnvioConIVA.toFixed(2));
    }


    aplicarDescuento(porcentaje) { 
        const desc = Number(porcentaje);
        if (isNaN(desc) || desc < 0 || desc > 100) {
            return false;
        }
        this.#descuento = desc;
        this.calcularTotal();
        return true;
    }
}