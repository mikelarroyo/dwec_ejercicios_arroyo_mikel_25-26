class Tienda {
    static instancia = null;

    static getInstancia(nombreTienda) {
        if (Tienda.instancia === null) {
            Tienda.instancia = new Tienda(nombreTienda);
        }
        return Tienda.instancia;
    }

    #nombre;
    #libros;
    #autores;

    constructor(nombreTienda) {
        if (Tienda.instancia !== null) {
            throw new Error("Use Tienda.getInstancia()");
        }
        this.#nombre = nombreTienda.trim();
        this.#libros = new Libros();
        this.#autores = new Autores();
    }

    get libros() { return this.#libros; }

    cargarDatosPrueba() {
        const autor1 = new Autor("Gabriel García Márquez");
        const autor2 = new Autor("Ray Bradbury");
        this.#autores.insertarAutores([autor1, autor2]);

        const libro1 = new LibroPapel(1001, "Cien años de soledad", [autor1], "novela", 18.50, 0.4, "20x15x3", 10);
        const libro2 = new Ebook(1002, "Fahrenheit 451", [autor2], "ciencia ficcion", 8.99, 3.0, "epub");
        const libro3 = new LibroPapel(1003, "Crónicas Marcianas", [autor2], "ciencia ficcion", 12.00, 0.3, "20x14x2", 2);

        this.#libros.insertarLibros([libro1, libro2, libro3]);
        
        // Relacionar libros con autores
        autor1.insertarLibro(libro1);
        autor2.insertarLibro(libro2);
        autor2.insertarLibro(libro3);
    }
}