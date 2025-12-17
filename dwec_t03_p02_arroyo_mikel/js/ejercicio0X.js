const clienteVIP = {
    nombre: "Laura Gomez",
    puntosAcumulados: 1500,
    _nivel: "BRONCE" // Propiedad 'privada' simulada
};

// Definir propiedad 'nivel' que depende de los puntos
Object.defineProperty(clienteVIP, 'nivel', {
    get: function() {
        if (this.puntosAcumulados > 5000) return "ORO";
        if (this.puntosAcumulados > 1000) return "PLATA";
        return "BRONCE";
    },
    set: function(puntos) {
        // Al setear el nivel, en realidad sumamos puntos
        if (typeof puntos === 'number' && puntos > 0) {
            this.puntosAcumulados += puntos;
        }
    },
    enumerable: true,
    configurable: true
});