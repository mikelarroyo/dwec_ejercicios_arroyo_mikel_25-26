console.log("T04 - Ejercicio 01");

class Libro {
    static GENEROS_LITERARIOS = new Set([
        "Novela",
        "Poesia",
        "Ensayo",
        "Teatro",
        "Ciencia ficcion",
        "Fantasia",
        "Historico",
        "Biografia",
        "Terror",
        "Infantil",
    ]);

    #isbn;
    #titulo;
    #genero;
    #autores;
    #precio;
    #precioOriginal;

    constructor(isbn, titulo, autoresArray, genero, precio) {
        this.#isbn = Number(isbn);
        this.titulo = titulo;
        this.genero = genero;
        this.autores = autoresArray;
        this.precio = precio;
        this.#precioOriginal = this.precio;
    }

    get isbn() {
        return this.#isbn;
    }
    get titulo() {
        return this.#titulo;
    }
    get genero() {
        return this.#genero;
    }
    get autores() {
        return this.#autores;
    }
    get precio() {
        return this.#precio;
    }
    get precioOriginal() {
        return this.#precioOriginal;
    }

    set titulo(valor) {
        if (!Util.validarTitulo(valor)) {
            throw new Error("Titulo inválido");
        }
        this.#titulo = valor.trim();
    }
    set autores(lista) {
        if (!Array.isArray(lista) || lista.length < 1) {
            throw new Error("Debe haber al menos un autor.");
        }
        this.#autores = lista;
    }
    set genero(valor) {
        if (!Util.validarGenero(valor, Libro.GENEROS_LITERARIOS)) {
            throw new Error("Genero inválido");
        }
        this.#genero = valor;
    }
    set precio(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("Precio inválido");
        }
        this.#precio = Number(valor);
    }

    mostrarDatosLibro() {
        return `
            LIBRO
            - ISBN: ${this.#isbn}
            - Título: ${this.#titulo}
            - Género: ${this.#genero}
            - Autores: ${this.#autores
                .map((autores) => autores.nombreCompleto)
                .join(",")}
            - Precio actual (sin IVA): ${this.#precio.toFixed(2)} €
            - Precio original: ${this.#precioOriginal.toFixed(2)} €
            `;
    }

    deshacerDescuentoLibro() {
        this.#precio = this.#precioOriginal;
    }

    aplicarDescuentoLibro(porcentaje) {
        if (!Util.validarReal(porcentaje) || porcentaje <= 0 || porcentaje > 100) {
            throw new Error("Descuento inválido");
        }
        this.#precio = this.#precioOriginal;
        const rebaja = this.#precio * (porcentaje / 100);
        this.#precio = Number((this.#precio - rebaja).toFixed(2));
    }
}

class Ebook extends Libro {
    #tamanioArchivo;
    #formato;

    static FORMATOS = new Set(["pdf", "epub", "mobi"]);

    constructor(
        isbn,
        titulo,
        autoresArray,
        genero,
        precio,
        tamanioArchivo,
        formato
    ) {
        super(isbn, titulo, autoresArray, genero, precio);
        this.tamanioArchivo = tamanioArchivo;
        this.formato = formato;
    }
    get tamanioArchivo() {
        return this.#tamanioArchivo;
    }
    get formato() {
        return this.#formato;
    }
    set tamanioArchivo(valor) {
        if (!Util.validarTamanoArchivo(valor)) {
            throw new Error("Tamanio archivo inválido");
        }
        this.#tamanioArchivo = Number(valor);
    }
    set formato(valor) {
        if (!Util.validarFormato(valor, Ebook.FORMATOS)) {
            throw new Error("Formato no valido");
        }
        this.#formato = valor.toLowerCase().trim();
    }
    descargar() {
        return "Descargando...";
    }
    convertirFormato(nuevoFormato) {
        if (!Util.validarFormato(nuevoFormato, Ebook.FORMATOS)) {
            throw new Error("Formato no válido");
        }
        this.formato = nuevoFormato;
    }
    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()}
        - Tamanio Archivo: ${this.tamanioArchivo}
        - Formato: ${this.formato}
        `;
    }
    comprobarDisponibilidad() {
        return true;
    }
    modificarLibro(mapaInfo) {
        if (mapaInfo.hasOwnProperty("isbn")) {
            console.log("El ISBN no se puede modificar. Ignorado.");
        }
        if (mapaInfo.hasOwnProperty("titulo")) {
            this.titulo = mapaInfo.titulo;
        }
        if (mapaInfo.hasOwnProperty("autores")) {
            this.autores = mapaInfo.autores;
        }
        if (mapaInfo.hasOwnProperty("genero")) {
            this.genero = mapaInfo.genero;
        }
        if (mapaInfo.hasOwnProperty("precio")) {
            this.precio = mapaInfo.precio;
        }

        if (mapaInfo.hasOwnProperty("tamanioArchivo")) {
            this.tamanioArchivo = mapaInfo.tamanioArchivo;
        }

        if (mapaInfo.hasOwnProperty("formato")) {
            this.convertirFormato(mapaInfo.formato);
        }
    }


}

class LibroPapel extends Libro {
    #peso;
    #dimensiones;
    #stock;
    static MINIMO_STOCK = 2;

    constructor(
        isbn,
        titulo,
        autoresArray,
        genero,
        precio,
        peso,
        dimensiones,
        stock
    ) {
        super(isbn, titulo, autoresArray, genero, precio, peso, dimensiones, stock);
        this.peso = peso;
        this.dimensiones = dimensiones;
        this.stock = stock;
    }
    get peso() { return this.#peso };
    get dimensiones() { return this.#dimensiones };
    get stock() { return this.#stock };
    set peso(valor) {
        if (!Util.validarPeso(valor)) {
            throw new Error("Peso inválido");
        }
        this.#peso = Number(valor);
    }
    set dimensiones(valor) {
        if (!Util.validarDimensiones(valor)) {
            throw new Error("Dimension inválida");
        }
        this.#dimensiones = valor;
    }
    set stock(valor) {
        if (!Util.validarStock(valor)) {
            throw new Error("Stock inválido");
        }
        this.#stock = Numer(valor);
    }
    embalar() {
        return "embalando...";
    }
    reducirStock() {
        if (this.#stock <= 0) {
            throw new Error("No hay stock suficiente para reducir.");
        }
        this.#stock--;
    }

    ampliarStock(numUnidades) {
        if (!Util.validarStock(numUnidades) || numUnidades <= 0) {
            throw new Error("Número de unidades inválido para ampliar stock.");
        }
        this.#stock += numUnidades;

    }
    avisoStockMinimo() {
        if (this.#stock < LibroPapel.MINIMO_STOCK) {
            return "Atención: Stock por debajo del mínimo.";
        }
        return "Stock suficiente";
    }
    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()}
            - Peso: ${this.peso} kg
            - Dimensiones: ${this.dimensiones}
            - Stock: ${this.stock}
            `;
    }

    comprobarDisponibilidad() {
        return this.#stock > 0;
    }

    // Sobrescribir mostrarDatosLibro()
    mostrarDatosLibro() {
        return `
        ${super.mostrarDatosLibro()}
        - Stock disponible: ${this.stock}
        - ¿Necesita reposición?: ${this.stock < LibroPapel.MINIMO_STOCK ? "Sí" : "No"}
                `;
    }

    // Polimorfismo: modificarLibro()
    modificarLibro(mapaInfo) {

        // El ISBN NO puede modificarse
        if (mapaInfo.hasOwnProperty("isbn")) {
            console.log("El ISBN no puede modificarse. Ignorado.");
        }

        // Título
        if (mapaInfo.hasOwnProperty("titulo")) {
            this.titulo = mapaInfo.titulo;
        }

        // Autores
        if (mapaInfo.hasOwnProperty("autores")) {
            this.autores = mapaInfo.autores;
        }

        // Género
        if (mapaInfo.hasOwnProperty("genero")) {
            this.genero = mapaInfo.genero;
        }

        // Precio
        if (mapaInfo.hasOwnProperty("precio")) {
            this.precio = mapaInfo.precio;
        }

        // Stock — solo en LibroPapel
        if (mapaInfo.hasOwnProperty("stock")) {
            this.stock = mapaInfo.stock;
        }
    }

}



