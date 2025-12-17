console.log("T04 - Ejercicio 01");

class Autores {
    #listadoAutores;

    constructor() {
        this.#listadoAutores = [];
    }

    get listadoAutores() {
        return this.#listadoAutores;
    }


    existeAutorPorNombre(nombreAbuscar) {
        const nombreLimpio = nombreAbuscar.trim().toLowerCase();
        return this.listadoAutores.some(autor => autor.nombreCompleto.toLowerCase() === nombreLimpio);
    }

    insertarAutores(autores) {
        if (!Array.isArray(autores)) {
            throw new Error("se esperaba un array de autores.");
        }
        let contadorInsertados = 0;
        autores.forEach(autor => {
            if (!(autor instanceof Autor)) {
                console.log("Se intento insertar un elemento que no una es instancia de Autor.saltando.");
                return;
            }
            if (this.existeAutorPorNombre(autor.nombreCompleto)) {
                console.log(`Advertencia: El autor ${autor.nombreCompleto} ya existe y no fue insertado.`);
                return;
            }
            this.#listadoAutores.push(autor);
            contadorInsertados++;
            

        });
        return contadorInsertados;

    }
    buscarAutoresPorId(idAbuscar) {
        const id = Number(idAbuscar);
        return this.#listadoAutores.find(autor => autor.id === id);

    }
    buscarAutoresPorNombre(nombreAbuscar) {
        const nombreLimpio = nombreAbuscar.trim().toLowerCase();
        return this.#listadoAutores.find(autor => autor.nombreCompleto === nombreLimpio);
    }
    obtenerCadenaAutoresMenu() {
        if (this.listadoAutores.length === 0) {
            return "No hay autores registrados.";
        }
        
        // CUMPLIMIENTO: Usa .toSorted() para la inmutabilidad de la ordenación
        const autoresOrdenados = this.listadoAutores.toSorted((a, b) => {
            const nombreA = a.nombreCompleto.toLowerCase();
            const nombreB = b.nombreCompleto.toLowerCase();

            if (nombreA < nombreB) return -1;
            if (nombreA > nombreB) return 1;
            return 0;
        });

        return autoresOrdenados.map((autor, index) => {
            const numLibros = autor.libros.length;
            return `${index + 1}. ${autor.nombreCompleto} (${numLibros} libro${numLibros !== 1 ? 's' : ''})`;
        }).join('\n');
    }
}