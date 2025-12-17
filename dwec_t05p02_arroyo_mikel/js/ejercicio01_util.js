console.log("T04 - Ejercicio 01");

class Util {
    static validarEntero(valor) {
        if (valor === null || valor === undefined || String(valor).trim() === "") return false;
        const numero = Number(valor);
        return Number.isInteger(numero);
    }

    static validarReal(valor) {
        if (valor === null || valor === undefined || String(valor).trim() === "") return false;
        const numero = Number(valor);
        return Number.isFinite(numero);
    }

    static esPositivoMayorQueCero(valor) {
        const num = Number(valor);
        return Util.validarReal(num) && num > 0;
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

        // Crea el objeto Date. El mes es 0-indexado (mes - 1)
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
            return Util.validarCadenaFecha(valor);
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
        // Añade áéíóúÁÉÍÓÚñÑ para aceptar caracteres españoles
        const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return patron.test(limpio);
    }

    static validarDireccion(direccion) {
        if (typeof direccion !== "string") return false;
        const limpio = direccion.trim();
        if (limpio.length < 5) return false;
        const patron = /^[A-Za-z0-9\s\.,\-ºª]+$/;
        return patron.test(limpio);
    }

    static validarPrecio(precio) {
        return Util.validarReal(precio) && Util.esPositivoMayorQueCero(precio);
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return Util.validarReal(tamanoArchivo) && Util.esPositivoMayorQueCero(tamanoArchivo);
    }

    static validarPeso(peso) {
        return Util.validarReal(peso) && Util.esPositivoMayorQueCero(peso);
    }
    
    static validarStock(stock) {
        // Stock puede ser 0 (sin stock), así que usa >= 0
        const num = Number(stock);
        return Util.validarEntero(num) && num >= 0;
    }
    
    static validarDiasEnvio(dias) {
        return Util.validarEntero(dias) && Util.esPositivoMayorQueCero(dias);
    }

    static validarDimensiones(cadenaDimensiones) {
        if (typeof cadenaDimensiones !== "string") return false;

        const limpio = cadenaDimensiones.toLowerCase().replace("cm", "").trim();
        const partes = limpio.split("x");

        if (partes.length !== 3) return false;

        return partes.every((par) => Util.esPositivoMayorQueCero(par));
    }

    static esMesPromocion(fecha, array_meses_promocion) {

        if (!Array.isArray(array_meses_promocion)) return false;
        if (!Util.validarFecha(fecha)) return false;

        let d;

        if (typeof fecha === "string") {

            const partes = fecha.split("-");
            let dia, mes_num, anio;
            if (partes[0].length === 4) { 
                anio = Number(partes[0]);
                mes_num = Number(partes[1]);
                dia = Number(partes[2]);
            } else { // D-M-YYYY
                dia = Number(partes[0]);
                mes_num = Number(partes[1]);
                anio = Number(partes[2]);
            }

            d = new Date(anio, mes_num - 1, dia);
        }
        else {
            d = fecha;
        }

        const mes_actual = d.getMonth() + 1; // Mes 1-12

        return array_meses_promocion.includes(mes_actual);
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
        if (!(setFormatosValidos instanceof Set)) return false;
        if (typeof formatoLeido !== "string") return false;
        
        const f = formatoLeido.toLowerCase().trim();
        return setFormatosValidos.has(f);
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        if (!(setGenerosValidos instanceof Set)) return false;
        if (typeof generoLeido !== "string") return false;
        
        const g = generoLeido.toLowerCase().trim();
        return setGenerosValidos.has(g);
    }

    static validarPorcentaje(porcentaje) {
        const num = Number(porcentaje);
        return Util.validarReal(num) && num >= 0 && num <= 100;
    }
    
    static convertirEntero(valor) {
        const num = Number(valor);
        if (!Util.validarEntero(num)) {
            return null; 
        }
        return num;
    }
    
    static convertirReal(valor) {
        const num = Number(valor);
        if (!Util.validarReal(num)) {
            return null; 
        }
        return num;
    }

    static IVA = 1.21;  // No 0.21
}