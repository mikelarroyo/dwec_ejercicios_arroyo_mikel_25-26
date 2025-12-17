console.log("T04 - Ejercicio 01");

class Libro {
    static GENEROS_LITERARIOS = new Set([
        "novela",
        "poesia",
        "ensayo",
        "teatro",
        "ciencia ficcion",
        "fantasia",
        "historico",
        "biografia",
        "terror",
        "infantil",
    ]);

    #isbn;
    #titulo;
    #genero;
    #autores;
    #precio;
    #precioOriginal;

    constructor(isbn, titulo, autoresArray, genero, precio) {
        if (!Util.validarEntero(isbn) || !Util.esPositivoMayorQueCero(isbn)) {
            throw new Error("ISBN inválido. Debe ser un entero positivo.");
        }
        this.#isbn = Number(isbn);
        this.titulo = titulo;
        this.genero = genero;
        this.autores = autoresArray;
        this.precio = precio;
        this.#precioOriginal = this.precio; // Usa el getter this.precio
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
        if (!Array.isArray(lista)) { 
            throw new Error("Debe ser un array de autores.");
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
            - ISBN: ${this.isbn}
            - Título: ${this.titulo}
            - Género: ${this.genero}
            - Autores: ${this.autores
                .map((autor) => autor.nombreCompleto)
                .join(", ")}
            - Precio actual (sin IVA): ${this.precio.toFixed(2)} €
            - Precio original: ${this.precioOriginal.toFixed(2)} €
            `;
    }

    deshacerDescuentoLibro() {
        // Usa el setter y el getter
        this.precio = this.precioOriginal; 
    }

    aplicarDescuentoLibro(porcentaje) {
        if (!Util.validarPercentaje(porcentaje) || porcentaje === 0) {
            throw new Error("Descuento inválido");
        }
        // Usa el setter y el getter
        this.precio = this.precioOriginal; 
        const rebaja = this.precio * (porcentaje / 100);
        // Usa el setter
        this.precio = Number((this.precio - rebaja).toFixed(2));
    }
    
    modificarLibro(mapaInfo) {
        for (const clave in mapaInfo) {
            if (mapaInfo.hasOwnProperty(clave)) {
                if (clave === 'isbn') {
                    console.log("El ISBN no puede modificarse. Ignorado.");
                    continue;
                }
                
                try {
                    // Asignación mediante setter (this[clave] = valor)
                    this[clave] = mapaInfo[clave]; 
                } catch (error) {
                    console.log(`Advertencia: La propiedad '${clave}' no es modificable en Libro base o el valor es inválido.`);
                }
            }
        }
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
        // Usa el setter
        this.formato = nuevoFormato; 
    }
    mostrarDatosLibro() {
        return `${super.mostrarDatosLibro()}
        - Tamanio Archivo: ${this.tamanioArchivo} MB
        - Formato: ${this.formato}
        `;
    }
    comprobarDisponibilidad() {
        return true;
    }
    
    modificarLibro(mapaInfo) { 
        for (const clave in mapaInfo) {
            if (mapaInfo.hasOwnProperty(clave)) {
                if (clave === 'isbn') {
                    console.log("El ISBN no se puede modificar. Ignorado.");
                    continue;
                }
                
                try {
                    // Asignación mediante setter
                    this[clave] = mapaInfo[clave];
                } catch (error) {
                    console.log(`Advertencia: No se pudo asignar '${clave}'. El valor es inválido o la propiedad no existe en Ebook.`);
                }
            }
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
        super(isbn, titulo, autoresArray, genero, precio); 
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
        this.#stock = Number(valor); 
    }
    
    embalar() {
        return "embalando...";
    }
    
    reducirStock() {
        // Usa el getter para leer, y el setter para escribir
        if (this.stock <= 0) { 
            throw new Error("No hay stock suficiente para reducir.");
        }
        this.stock = this.stock - 1; 
    }

    ampliarStock(numUnidades) {
        if (!Util.validarEntero(numUnidades) || numUnidades <= 0) {
            throw new Error("Número de unidades inválido para ampliar stock.");
        }
        // Usa el setter y el getter
        this.stock = this.stock + numUnidades; 
    }
    
    avisoStockMinimo() {
        // Usa el getter
        return this.stock < LibroPapel.MINIMO_STOCK; 
    }

    comprobarDisponibilidad() {
        // Usa el getter
        return this.stock > 0; 
    }

    mostrarDatosLibro() {
        return `
        ${super.mostrarDatosLibro()}
        - Peso: ${this.peso} kg
        - Dimensiones: ${this.dimensiones}
        - Stock disponible: ${this.stock}
        - ¿Necesita reposición?: ${this.avisoStockMinimo() ? "Sí" : "No"}
                `;
    }

    modificarLibro(mapaInfo) {
        for (const clave in mapaInfo) {
            if (mapaInfo.hasOwnProperty(clave)) {
                if (clave === 'isbn') {
                    console.log("El ISBN no puede modificarse. Ignorado.");
                    continue;
                }
                
                try {
                    // Asignación mediante setter
                    this[clave] = mapaInfo[clave];
                } catch (error) {
                    console.log(`Advertencia: No se pudo asignar '${clave}'. El valor es inválido o la propiedad no existe en LibroPapel.`);
                }
            }
        }
    }
}