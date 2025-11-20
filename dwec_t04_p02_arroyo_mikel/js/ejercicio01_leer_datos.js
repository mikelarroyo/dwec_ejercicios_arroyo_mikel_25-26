console.log("T04 - Ejercicio 01");

class LeerDatos {
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
        const num = Number(texto);

        if (!Util.validarEntero(num)) {
            throw new Error("Debe introducir un número entero.");
        }
        return num;
    }

    leerReal(mensaje_o_id) {
        const texto = prompt(mensaje_o_id);
        const num = Number(texto);

        if (!Util.validarReal(num)) {
            throw new Error("Debe introducir un número real.");
        }
        return num;
    }

    leerEnteroEntre(mensaje_o_id, min, max) {
        const num = this.leerEntero(mensaje_o_id);

        if (num < min || num > max) {
            throw new Error(`El número debe estar entre ${min} y ${max}.`);
        }
        return num;
    }

    leerCadena(mensaje_o_id, longitud, patron) {
    const texto = prompt(mensaje_o_id);

    if (typeof texto !== "string") {
        throw new Error("Debe introducir una cadena.");
    }

    const clean = texto.trim();

    if (clean.length < longitud) {
        throw new Error(`La cadena debe tener al menos ${longitud} caracteres.`);
    }

    if (!patron.test(clean)) {
        throw new Error("La cadena no cumple el formato requerido.");
    }

    return clean;
}

    leerEnteroHasta(mensaje_o_id) {
        let intentos = 0;
        let num;

        do {
            const texto = prompt(mensaje_o_id);
            num = Number(texto);
            intentos++;
        } while (!Util.validarEntero(num) && intentos < 10);

        if (!Util.validarEntero(num)) {
            throw new Error(
                "Máximo de intentos alcanzado. No se introdujo un entero válido."
            );
        }

        return num;
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let intentos = 0;
        let num;

        do {
            const texto = prompt(mensaje_o_id);
            num = Number(texto);
            intentos++;
        } while (
            (!Util.validarEntero(num) || num < min || num > max) &&
            intentos < 10
        );

        if (!Util.validarEntero(num) || num < min || num > max) {
            throw new Error(
                `Máximo de intentos alcanzado. No se introdujo un entero entre ${min} y ${max}.`
            );
        }

        return num;
    }

    leerCadenaHasta(mensaje_o_id) {
    try {
        return this.leerCadena(mensaje_o_id);
    } catch (e) {
        console.log(e.message);
        return this.leerCadenaHasta(mensaje_o_id);
    }
}

}
