console.log("T04 - Ejercicio 01");

class Libros {

    #listadoLibros;

    constructor() {
        this.#listadoLibros = [];
    }


    get listadoLibros() {
        // Devuelve la referencia original (tal como se solicitó)
        return this.#listadoLibros;
    }

    existeLibroPorIsbn(isbnAbuscar) {
        // Se asume que la validación de Util se hace en la capa superior (Tienda)
        const isbn = Number(isbnAbuscar);
        return this.#listadoLibros.some(libro => libro.isbn === isbn);
    }
    
    insertarLibros(libros) {
        if (!Array.isArray(libros)) {
            throw new Error("Se esperaba un array de libros para la insercion");
        }
        
        let contadorInsertados = 0;
        
        libros.forEach(libro => {
            if (!(libro instanceof Libro)) {
                console.log("Advertencia: El elemento no es una instancia de Libro. Saltado.");
                return; 
            }
            if (this.existeLibroPorIsbn(libro.isbn)) {
                console.log(`Advertencia: El libro con ISBN ${libro.isbn} ya existe`);
                return;
            }
            
            this.#listadoLibros.push(libro);
            contadorInsertados++;
        });
        
        return contadorInsertados;
    }
    
    buscarLibroPorIsbn(isbnAbuscar) {
        const isbn = Number(isbnAbuscar);
        const libroEncontrado = this.#listadoLibros.find(libro => libro.isbn === isbn);

        return libroEncontrado; 
    }
    
    buscarLibroPorTitulo(tituloAbuscar) {
        const texto = String(tituloAbuscar || "").trim(); 
        
        if (texto.length === 0) {
            return [];
        }
        
        const tituloLimpio = texto.toLowerCase();

        return this.#listadoLibros.filter(libro => {
            return libro.titulo.toLowerCase().includes(tituloLimpio);
        });
    }
    
    modificarLibroPorIsbn(isbnAmodificar, datosAActualizar) {
    
    const esMapaValido = typeof datosAActualizar === 'object' && datosAActualizar !== null && !Array.isArray(datosAActualizar);
    if (!esMapaValido) {
        throw new Error("ERROR: Los datos a modificar deben ser proporcionados en un objeto (mapa).");
    }
    
    const libroEncontrado = this.buscarLibroPorIsbn(isbnAmodificar);
    if (libroEncontrado === undefined) { 
        console.log(`Advertencia: Libro con ISBN ${isbnAmodificar} no encontrado para modificar.`);
        return false;
    }
    try {
        libroEncontrado.modificarLibro(datosAActualizar);
        console.log(`Libro con ISBN ${isbnAmodificar} modificado exitosamente.`);
        return true;
    } catch (error) {
        console.error(`ERROR DE VALIDACIÓN: No se pudo modificar el libro. Detalle: ${error.message}`);
        return false;
    }
}

    obtenerCadenaLibrosMenu() {
        if (this.#listadoLibros.length === 0) {
            return "No hay libros en el catálogo.";
        }
        const librosParaMenu = this.#listadoLibros.toSorted((a, b) => {
            const tituloA = a.titulo.toLowerCase();
            const tituloB = b.titulo.toLowerCase();

            if (tituloA < tituloB) {
                return -1;
            }
            if (tituloA > tituloB) {
                return 1; 
            }
            return 0; 
        });

        return librosParaMenu.map((libro, indice) => {
            let tipoLibro;
            if (libro instanceof Ebook) {
                tipoLibro = "Ebook";
            } else if (libro instanceof LibroPapel) {
                tipoLibro = "Libro en papel";
            } else {
                tipoLibro = "Tipo desconocido";
            }
            return `${indice + 1}. ${libro.titulo} (${tipoLibro})`;
        }).join('\n');
    }
}