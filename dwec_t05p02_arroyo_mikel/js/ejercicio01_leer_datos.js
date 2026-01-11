console.log("T04 - Ejercicio 01");

class LeerDatos {
    // Métodos abstractos (No se modifican)
    leerEntero(mensaje_o_id) {
        throw new Error("Método abstracto: leerEntero() debe ser implementado.");
    }

    leerEnteroHasta(mensaje_o_id) {
        throw new Error(
            "Método abstracto: leerEnteroHasta() debe ser implementado."
        );
    }

    leerReal(mensaje_o_id) {
        throw new Error("Método abstracto: leerReal() debe ser implementado.");
    }

    leerEnteroEntre(mensaje_o_id, min, max) {
        throw new Error(
            "Método abstracto: leerEnteroEntre() debe ser implementado."
        );
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        throw new Error(
            "Método abstracto: leerEnteroEntreHasta() debe ser implementado."
        );
    }

    leerCadena(mensaje_o_id, longitud, patron) {
        throw new Error("Método abstracto: leerCadena() debe ser implementado.");
    }

    leerCadenaHasta(mensaje_o_id, longitud, patron) {
        throw new Error(
            "Método abstracto: leerCadenaHasta() debe ser implementado."
        );
    }
}

class LeerDatosPrompt extends LeerDatos {



    leerEntero(mensaje_o_id) {
        const texto = prompt(mensaje_o_id);

        if (texto === null) {
            throw new Error("Entrada cancelada por el usuario.");
        }

        const num = Number(texto);

        // 2. Comprobación de validación
        if (!Util.validarEntero(num)) {
            throw new Error("Debe introducir un número entero.");
        }
        return num;
    }

    leerReal(mensaje_o_id) {
        const texto = prompt(mensaje_o_id);

        // 1. Comprobación de cancelación (null)
        if (texto === null) {
            throw new Error("Entrada cancelada por el usuario.");
        }

        const num = Number(texto);

        // 2. Comprobación de validación
        if (!Util.validarReal(num)) {
            throw new Error("Debe introducir un número real.");
        }
        return num;
    }

    leerEnteroEntre(mensaje_o_id, min, max) {
        // Llama a leerEntero, que ya maneja la cancelación y validación de entero
        const num = this.leerEntero(mensaje_o_id);

        if (num < min || num > max) {
            throw new Error(`El número debe estar entre ${min} y ${max}.`);
        }
        return num;
    }

    /**
     * Lee una cadena. Longitud mínima es 1 por defecto.
     */
    leerCadena(mensaje_o_id, longitud, patron) {
        const texto = prompt(mensaje_o_id);

        // 1. Comprobación de cancelación (null)
        if (texto === null) {
            throw new Error("Entrada cancelada por el usuario.");
        }

        const clean = texto.trim();
        // Determinar la longitud mínima (1 por defecto si no se proporciona)
        const longitudMinima = (longitud !== undefined && longitud !== null) ? Number(longitud) : 1;

        // 2. Validación de longitud mínima
        if (clean.length < longitudMinima) {
            throw new Error(`La cadena debe tener al menos ${longitudMinima} caracteres.`);
        }

        // 3. Validación de patrón (solo si se proporciona)
        if (patron instanceof RegExp && !patron.test(clean)) {
            throw new Error("La cadena no cumple el formato requerido.");
        }

        return clean;
    }

    // --- MÉTODOS REPETITIVOS (Usan do...while y try...catch) ---

    leerEnteroHasta(mensaje_o_id) {
        let resultado = null;
        let valido = false;

        do {
            try {
                // Llama al método base. Si es válido, asigna y establece valido=true.
                resultado = this.leerEntero(mensaje_o_id);
                valido = true;
            } catch (error) {
                // Propagamos cancelación inmediatamente
                if (error.message.includes("cancelada")) {
                    throw error;
                }
                // Si es por validación, mostramos mensaje y el bucle repite
                console.log(`Error de validación: ${error.message}. Vuelva a intentar.`);
            }
        } while (!valido);

        return resultado;
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let resultado = null;
        let valido = false;

        do {
            try {
                // Llama al método base. Si es válido, asigna y establece valido=true.
                resultado = this.leerEnteroEntre(mensaje_o_id, min, max);
                valido = true;
            } catch (error) {
                if (error.message.includes("cancelada")) {
                    throw error;
                }
                console.log(`Error de validación: ${error.message}. Vuelva a intentar.`);
            }
        } while (!valido);

        return resultado;
    }

    leerCadenaHasta(mensaje_o_id, longitud, patron) {
        let resultado = null;
        let valido = false;

        do {
            try {
                // Llama al método base. Si es válido, asigna y establece valido=true.
                resultado = this.leerCadena(mensaje_o_id, longitud, patron);
                valido = true;
            } catch (error) {
                if (error.message.includes("cancelada")) {
                    throw error;
                }
                console.log(`Error de validación: ${error.message}. Vuelva a intentar.`);
            }
        } while (!valido);

        return resultado;
    }

    leerMoneda(mensaje_o_id, simbolo="€") {
    let entrada = prompt(mensaje_o_id);
    if (entrada === null) throw new Error("Entrada cancelada.");

    entrada = entrada.trim();
    const regex = new RegExp(`^\\d+(\\.\\d{1,2})?\\s*\\${simbolo}$`);

    if (!regex.test(entrada)) throw new Error("Formato de moneda no válido.");

    return entrada;
}   

    leerListaSeparadaPorComas(mensaje_o_id) {
    let entrada = prompt(mensaje_o_id);
    if (entrada === null) throw new Error("Entrada cancelada.");

    let lista = entrada.split(",").map(x => x.trim());
    if (lista.some(x => x.length === 0)) throw new Error("Elementos vacíos no permitidos.");

    return lista; // devuelve ARRAY
}   
    leerEnteroPar(mensaje_o_id) {
    let num = this.leerEntero(mensaje_o_id);
    if (num % 2 !== 0) throw new Error("Debe ser un número par.");

    return num;
}







}