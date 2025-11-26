console.log("T04 - Ejercicio 01");

class Pedido {
    static #ultimoId = 0;
    static obtenerSiguienteId() {
        return ++this.#ultimoId;
    }

    #id;
    #cliente;
    #librosPedido; 
    #tipoEnvioPedido = null;
    #fecha;
    #precioTotalSinEnvioSinIVA = 0;
    #precioTotalConEnvioSinIVA = 0;
    #precioTotalConEnvioConIVA = 0;
    #descuento = 0;
    #abierto = true;

    constructor(cliente) {
        if (!cliente) throw new Error("Debe haber un cliente para crear un pedido.");
        
        this.#id = Pedido.obtenerSiguienteId();
        this.#cliente = cliente;
        this.#librosPedido = new Map();
        this.#fecha = new Date();
    }

    hayLibros() {
        return this.#librosPedido.size > 0;
    }

    insertarLibro(libro, unidades) {
        if (!libro) throw new Error("Libro no válido.");
        if (!Util.validarEntero(unidades) || unidades <= 0)
            throw new Error("Unidades no válidas.");

        // Los ebooks siempre son 1 unidad
        if (libro.tipo === "ebook") unidades = 1;

        // Si ya existe
        if (this.#librosPedido.has(libro.isbn)) {
            if (libro.tipo === "ebook")
                throw new Error("Un ebook solo puede añadirse una vez.");

            const actuales = this.#librosPedido.get(libro.isbn);
            this.#librosPedido.set(libro.isbn, actuales + unidades);
        } else {
            this.#librosPedido.set(libro.isbn, unidades);
        }

        let total = 0;
        for (let u of this.#librosPedido.values()) total += u;
        return total;
    }
    establecerTipoEnvio(tipoEnvio) {
        if (!tipoEnvio) return false;
        let hayPapel = false;
        let pesoTotal = 0;

        for (let [isbn, unidades] of this.#librosPedido.entries()) {
            const libro = this.#cliente.tienda.buscarLibroPorIsbn(isbn);

            if (libro.tipo === "papel") {
                hayPapel = true;
                pesoTotal += libro.peso * unidades;
            }
        }

        // Si NO hay papel → no se puede poner envío
        if (!hayPapel) return false;
        if (pesoTotal > tipoEnvio.pesoMaximo)
            throw new Error("El peso supera el máximo permitido.");

        this.#tipoEnvioPedido = tipoEnvio;
        return true;
    }

    calcularTotal() {
        let totalLibros = 0;

        // Descuento automático en noviembre/diciembre
        const mes = this.#fecha.getMonth() + 1;
        const aplicarDescuentoAuto = (mes === 11 || mes === 12);

        // Calcular precio de todos los libros
        for (let [isbn, unidades] of this.#librosPedido.entries()) {
            const libro = this.#cliente.tienda.buscarLibroPorIsbn(isbn);
            let precioLibro = libro.precio;

            if (aplicarDescuentoAuto) {
                precioLibro = precioLibro * 0.90; // 10% menos
            }

            totalLibros += precioLibro * unidades;
        }

        this.#precioTotalSinEnvioSinIVA = totalLibros;

        // Calcular si hay envío
        let costeEnvio = 0;
        let hayPapel = false;

        for (let [isbn] of this.#librosPedido.entries()) {
            const libro = this.#cliente.tienda.buscarLibroPorIsbn(isbn);
            if (libro.tipo === "papel") hayPapel = true;
        }

        if (hayPapel && this.#tipoEnvioPedido) {
            costeEnvio = this.#tipoEnvioPedido.precioEnvio;
        }
        this.#precioTotalConEnvioSinIVA = totalLibros + costeEnvio;
        this.#precioTotalConEnvioConIVA = (totalLibros + costeEnvio) * 1.21;
    }
    aplicarDescuento(porcentaje) {
        const factor = porcentaje / 100;
        const descuento = this.#precioTotalSinEnvioSinIVA * factor;
        this.#descuento = descuento;
        const subtotalDescuento = this.#precioTotalSinEnvioSinIVA - descuento;
        let costeEnvio = 0;
        let hayPapel = false;
        for (let [isbn] of this.#librosPedido.entries()) {
            const libro = this.#cliente.tienda.buscarLibroPorIsbn(isbn);
            if (libro.tipo === "papel") hayPapel = true;
        }
        if (hayPapel && this.#tipoEnvioPedido) {
            costeEnvio = this.#tipoEnvioPedido.precioEnvio;
        }
        this.#precioTotalConEnvioSinIVA = subtotalDescuento + costeEnvio;
        this.#precioTotalConEnvioConIVA = (subtotalDescuento + costeEnvio) * 1.21;
        return true;
    }

    // -------------------------------------------------------
    // Mostrar datos del pedido
    // -------------------------------------------------------
    mostrarDatosPedido() {
        let salida = `PEDIDO ${this.#id}\n`;
        salida += `Fecha: ${this.#fecha.toLocaleDateString()}\n`;
        salida += `Cliente: ${this.#cliente.nombre}\n\n`;
        salida += "Libros:\n";

        for (let [isbn, unidades] of this.#librosPedido.entries()) {
            const libro = this.#cliente.tienda.buscarLibroPorIsbn(isbn);
            salida += ` - ${libro.titulo} (${libro.tipo}) x${unidades}\n`;
        }

        salida += `\nTipo de envío: ${this.#tipoEnvioPedido ? this.#tipoEnvioPedido.nombre : "No aplica"}\n`;
        salida += `Total sin envío (sin IVA): ${this.#precioTotalSinEnvioSinIVA.toFixed(2)}€\n`;
        salida += `Descuento aplicado: ${this.#descuento.toFixed(2)}€\n`;
        salida += `Total con envío (sin IVA): ${this.#precioTotalConEnvioSinIVA.toFixed(2)}€\n`;
        salida += `Total final con IVA: ${this.#precioTotalConEnvioConIVA.toFixed(2)}€\n`;

        return salida;
    }
}
