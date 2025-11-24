console.log("T04 - Ejercicio 01");

class TiposEnvios {
    #lista;

    constructor() {
        this.#lista = [];
    }

    get lista() {
        return this.#lista;
    }

    existeTipoPorNombre(nombreAbuscar) {
        const nombreLimpio = nombreAbuscar.trim().toLowerCase();

        return this.lista.some(tipo =>
            tipo.nombre.toLowerCase() === nombreLimpio
        );
    }

    insertarTipos(arrayTipos) {
        if (!Array.isArray(arrayTipos)) {
            throw new Error("Se esperaba un array.");
        }

        let contadorInsertados = 0;

        arrayTipos.forEach(tipo => {

            if (!(tipo instanceof TipoEnvio)) {
                throw new Error("Se esperaba una instancia de TipoEnvio.");
            }
            if (this.existeTipoPorNombre(tipo.nombre)) {
                console.log(`El tipo "${tipo.nombre}" ya existe, se omite.`);
                return;
            }
            this.lista.push(tipo);
            contadorInsertados++;
        });
        return contadorInsertados;
    }

    buscarTiposPorNombre(nombreAbuscar) {
        const nombreLimpio = nombreAbuscar.trim().toLowerCase();

        return this.lista.find(tipo =>
            tipo.nombre.toLowerCase() === nombreLimpio
        );
    }

    obtenerCadenaTiposMenu() {
        if (this.lista.length === 0) {
            return "No hay tipos de envío registrados.";
        }
        const ordenados = this.lista.toSorted((a, b) => b.precio - a.precio);

        return ordenados
            .map((tipo, index) => `${index + 1}. ${tipo.nombre} (${tipo.precio}€)`)
            .join("\n");
    }
}
