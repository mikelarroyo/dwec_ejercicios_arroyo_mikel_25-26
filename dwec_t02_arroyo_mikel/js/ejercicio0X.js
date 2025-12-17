const calcularMedia = function(listaNumeros) {
    if (listaNumeros.length === 0) return 0;
    
    // Uso de reduce para sumar
    const suma = listaNumeros.reduce((acum, actual) => acum + actual, 0);
    return suma / listaNumeros.length;
};


// Operador Spread (...) para pasar el array como argumentos individuales
const calcularMaximo = (listaNumeros) => Math.max(...listaNumeros);

const calcularMinimo = (listaNumeros) => Math.min(...listaNumeros);


function calcularDesviacion(listaNumeros, media) {
    // Retorna un nuevo array con la diferencia
    return listaNumeros.map(num => num - media);
}