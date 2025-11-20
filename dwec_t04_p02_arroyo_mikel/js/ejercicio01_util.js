console.log("T04 - Ejercicio 01");

class Util {
    static validarEntero(valor) {
        if (valor === null || valor === undefined || valor === "") return false;
        const num = Number(valor);
        return Number.isInteger(num);
    }

    static validarReal(valor) {
        if (valor === null || valor === undefined || valor === "") return false;

        const num = Number(valor);
        return Number.isFinite(num);
    }

    static validarCadenaFecha(valor) {
        if (typeof valor !== "string") return false;

        valor = valor.trim();
        if (valor === "") return false;

        const partes = valor.split("-");
        if (partes.length !== 3) return false;

        let dia, mes, anio;

        // Formato YYYY-M-D o YYYY-MM-DD

        if (partes[0].length === 4) {
            anio = Number(partes[0]);
            mes = Number(partes[1]);
            dia = Number(partes[2]);

            // Formato D-M-YYYY o DD-MM-YYYY
        } else if (partes[2].length === 4) {
            dia = Number(partes[0]);
            mes = Number(partes[1]);
            anio = Number(partes[2]);
        } else {
            return false;
        }

        if (
            !Number.isInteger(dia) ||
            !Number.isInteger(mes) ||
            !Number.isInteger(anio)
        ) {
            return false;
        }

        const fecha = new Date(anio, mes - 1, dia);

        return (
            fecha.getFullYear() === anio &&
            fecha.getMonth() === mes - 1 &&
            fecha.getDate() === dia
        );
    }

    static validarFecha(valor) {
        if (valor instanceof Date) {
            return !Number.isNaN(valor.getTime());
        }

        if (typeof valor === "string") {
            return this.validarCadenaFecha(valor);
        }

        return false;
    }

    static validarTitulo(titulo) {
        return typeof titulo === "string" && titulo.trim().length >= 1;
    }

    static validarNombrePersona(nombre) {
        if (typeof nombre !== "string") return false;
        const limpio = nombre.trim();
        if (limpio.length < 3) return false;
        const patron = /^[a-zA-Z\s]+$/;
        return patron.test(limpio);
    }

    static validarDireccion(valor) {
        if (typeof valor !== "string") return false;
        const limpio = valor.trim();
        if (limpio.length < 5) return false;
        const patron = /^[A-Za-z0-9\s\.,\-ºª]+$/;
        return patron.test(limpio);
    }

    static esPositivoMayorQueCero(valor) {
        const num = Number(valor);
        return Number.isFinite(num) && num > 0;
    }

    static validarPrecio(precio) {
        return this.validarReal(precio) && this.esPositivoMayorQueCero(precio);
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return (
            this.validarReal(tamanoArchivo) &&
            this.esPositivoMayorQueCero(tamanoArchivo)
        );
    }

    static validarPeso(peso) {
        return this.validarReal(peso) && this.esPositivoMayorQueCero(peso);
    }
    static validarStock(stock) {
        return this.validarEntero(stock) && this.esPositivoMayorQueCero(stock);
    }
    static validarDiasEnvio(dias) {
        return this.validarEntero(dias) && this.esPositivoMayorQueCero(dias);
    }
    static validarDimensiones(dimensiones) {
        if (typeof dimensiones !== "string") return false;

        const limpio = dimensiones.toLowerCase().replace("cm", "").trim();
        const partes = limpio.split("x");

        if (partes.length !== 3) return false;

        return partes.every((par) => this.esPositivoMayorQueCero(par));
    }
    static esMesPromocion(fecha, array_meses_promocion) {

        if (!Array.isArray(array_meses_promocion)) return false;

        
        if (!this.validarFecha(fecha)) return false;

        let d;

        if (typeof fecha === "string") {

            const partes = fecha.split("-");
            let dia, mes, anio;


            if (partes[0].length === 4) {
                anio = Number(partes[0]);
                mes = Number(partes[1]);
                dia = Number(partes[2]);
            }

            else {
                dia = Number(partes[0]);
                mes = Number(partes[1]);
                anio = Number(partes[2]);
            }

            d = new Date(anio, mes - 1, dia);
        }


        else {
            d = fecha;
        }


        const mes = d.getMonth() + 1;

        return array_meses_promocion.includes(mes);
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
    if (!Array.isArray(setFormatosValidos)) return false;
    if (typeof formatoLeido !== "string") return false;
    const f = formatoLeido.toLowerCase();
    return setFormatosValidos.includes(f);
}
    static validarGenero(generoLeido, setGenerosValidos) {
    if (!Array.isArray(setGenerosValidos)) return false;
    if (typeof generoLeido !== "string") return false;
    const g = generoLeido.toLowerCase();
    return setGenerosValidos.includes(g);
}   




}
