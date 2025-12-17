console.log("T04 - Ejercicio 01");

class Autor {
    #id;
    #nombreCompleto;
    #libros;

    static #ultimoId = 0;
    static obtenerSiguienteId() {
        Autor.#ultimoId++;
        return Autor.#ultimoId;
    }

    constructor(nombreCompleto) {
        this.#id = Autor.obtenerSiguienteId();
        this.nombreCompleto = nombreCompleto;
        this.#libros = [];
    }

    get id() {
        return this.#id; 
    }
    get nombreCompleto() {
        return this.#nombreCompleto;
    }
    get libros() {
        // Devuelve la referencia original (no copia)
        return this.#libros;
    }
    set nombreCompleto(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error(
                "Nombre completo inválido. Mínimo 3 letras y solo letras y espacios"
            );
        }
        this.#nombreCompleto = valor.trim();
    }
    mostrarDatosAutor() {
        return `
        AUTOR
        - ID: ${this.id}
        - Nombre: ${this.nombreCompleto}
        - Libros escritos: ${this.libros.length}
        - Títulos: ${this.libros.map((libro) => libro.titulo).join(", ")}`;
    }
    insertarLibro(libro) {
        if (libro === null || libro === undefined || !(libro instanceof Libro)) {
            throw new Error(
                "El objeto libro a insertar es inválido o no es una instancia de libro."
            );
        }
        // Usa el getter 'this.libros' para acceder al array original y mutarlo
        this.libros.push(libro);
        return this.libros.length;
    }
    tieneLibros() {
        // Usa el getter 'this.libros'
        return this.libros.length > 0;
    }
}