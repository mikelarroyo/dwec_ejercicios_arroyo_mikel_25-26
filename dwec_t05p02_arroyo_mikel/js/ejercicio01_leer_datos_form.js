class LeerDatosForm extends LeerDatos {

    leerTextoObligatorio(valor) {
        const v = valor.trim();
        return v.length > 0 ? v : null;
    }

    leerDNI(valor) {
        const v = valor.trim();
        return /^[0-9]{8}$/.test(v) ? v : null;
    }

    leerISBN(valor) {
        const v = valor.trim();
      
        return /^[0-9]{10}([0-9]{3})?$/.test(v) ? v : null;
    }

    leerNumeroPositivo(valor) {
        const n = Number(valor);
        return !isNaN(n) && n > 0 ? n : null;
    }

    leerRealPositivo(valor) {
        const n = Number(valor);
        // Validamos que sea número finito y mayor que 0
        return !isNaN(n) && Number.isFinite(n) && n > 0 ? n : null;
    }

    leerEnteroPositivo(valor) {
        const n = Number(valor);
        return Number.isInteger(n) && n > 0 ? n : null;
    }
}