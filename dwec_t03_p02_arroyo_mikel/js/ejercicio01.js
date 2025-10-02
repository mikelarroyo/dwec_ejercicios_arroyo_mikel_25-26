console.log("T03 - Ejercicio 01");


/**
 * Crea una función llamada oraculo que reciba un número variable de argumentos (edad, nivel de poder, número de batallas, etc.). 
 * Pueden pasar el número que quieran y si no reciben ninguno el valor por defecto recibido será 0.

La función debe hacer uso de otras funciones y una lógica básica:

Usar el objeto arguments para recorrer todos los valores, sabiendo que si no recibe nada, el valor recibido por defecto es 0.
Función 1 - Tradicional: Verificar que todos los argumentos sean números. 
Si alguno no lo es, mostrar un error en consola y devolver undefined. 
Si se recibe una cadena numérica tipo "45" se convertirá en número. 
Si recibe un cadena tipo "juan", dará el error indicado.
Función 2 - Anónima: Calcular la media de los argumentos
Función 3 - Flecha: Calcular el máximo
Función 4 - Flecha: Mínimo
Función 5 - Tradicional: Calcular la desviación respecto de la media (cada valor menos la media).
Función 6 - Anónima: Según el valor de la media, devolver un mensaje:
< 30: "Tu destino es entrenar más duro. Tus estadísticas están por debajo del mínimo requerido."
30 - 60: "Estás en el camino del héroe. El valor máximo alcanzado fue X y el mínimo Y."
> 60: "Eres un maestro legendario. Tus desviaciones son: [...]."

Finalmente crea una función autoinvocada que haga uso de esta función oraculo. La IIFE no debe llamar a oraculo una sola vez, sino varias veces con distintos conjuntos de datos.
 */


// Función 1 - Tradicional: Verificar números
function comprobarNumeros(numeros) {
   for (let i = 0; i < numeros.length; i++) {
      if (typeof numeros[i] === "string" && !isNaN(numeros[i])) {
         numeros[i] = Number(numeros[i]);
      }
      else if (typeof numeros[i] !== "number") {
         console.log("Error: " + numeros[i] + " no es un número");
         return undefined;
      }
   }
   return numeros;
}

// PRUEBA Función 1ç
/** 
console.log("=== PRUEBA Función 1 - comprobarNumeros ===");
console.log("Números normales [10, 20, 30]:", comprobarNumeros([10, 20, 30]));
console.log("Con cadenas numéricas [10, '20', 30]:", comprobarNumeros([10, "20", 30]));
console.log("Con cadena inválida [10, 'juan', 30]:", comprobarNumeros([10, "juan", 30]));
console.log("");
*/

// Función 2 - Anónima: calcular media
let calcularMedia = function (numeros) {
   let suma = 0;
   for (let i = 0; i < numeros.length; i++) {
      suma = suma + numeros[i];
   }
   return suma / numeros.length;
};

// PRUEBA Función 2

console.log("=== PRUEBA Función 2 - calcularMedia ===");
console.log("Media de [10, 20, 30]:", calcularMedia([10, 20, 30]));
console.log("Media de [5, 15, 25]:", calcularMedia([5, 15, 25]));
console.log("");

// Función 3 - Flecha: calcular el máximo
let calcularMaximo = (numeros) => Math.max(...numeros);

// PRUEBA Función 3
/** 
console.log("=== PRUEBA Función 3 - calcularMaximo ===");
console.log("Máximo de [10, 20, 30]:", calcularMaximo([10, 20, 30]));
console.log("Máximo de [5, 50, 15]:", calcularMaximo([5, 50, 15]));
console.log("");
*/

// Función 4 - Flecha: calcular el mínimo
let calcularMinimo = numeros => Math.min(...numeros);

// PRUEBA Función 4
/** 
console.log("=== PRUEBA Función 4 - calcularMinimo ===");
console.log("Mínimo de [10, 20, 30]:", calcularMinimo([10, 20, 30]));
console.log("Mínimo de [5, 50, 15]:", calcularMinimo([5, 50, 15]));
console.log("");
*/

// Función 5 - Tradicional: Calcular desviaciones
function desviaciones(numeros) {
   let media = calcularMedia(numeros);
   let desviaciones = [];

   for (let i = 0; i < numeros.length; i++) {
      let calculoDesviacion = numeros[i] - media;
      desviaciones.push(calculoDesviacion);
   }
   return desviaciones;
}

// PRUEBA Función 5
/** 
console.log("=== PRUEBA Función 5 - desviaciones ===");
console.log("Desviaciones de [10, 20, 30]:", desviaciones([10, 20, 30]));
console.log("Desviaciones de [5, 15, 25]:", desviaciones([5, 15, 25]));
console.log("");
*/

// Función 6 - Anónima: Generar mensaje
let generarMensaje = function (numeros) {
   let media = calcularMedia(numeros);
   let maximo = calcularMaximo(numeros);
   let minimo = calcularMinimo(numeros);
   let lasDesviaciones = desviaciones(numeros);

   if (media < 30) {
      return "Tu destino es entrenar más duro. Tus estadísticas están por debajo del mínimo requerido.";
   } else if (media >= 30 && media <= 60) {
      return "Estás en el camino del héroe. El valor máximo alcanzado fue " + maximo + " y el mínimo " + minimo + ".";
   } else {
      return "Eres un maestro legendario. Tus desviaciones son: [" + lasDesviaciones.join(", ") + "].";
   }
};

// PRUEBA Función 6
/**
console.log("=== PRUEBA Función 6 - generarMensaje ===");
console.log("Media baja [5, 10, 15]:", generarMensaje([5, 10, 15]));
console.log("Media media [30, 40, 50]:", generarMensaje([30, 40, 50]));
console.log("Media alta [70, 80, 90]:", generarMensaje([70, 80, 90]));
*/

// FUNCIÓN PRINCIPAL ORÁCULO
function oraculo() {
   let misNumeros = [];
   if (arguments.length === 0) {
      console.log("No me pasaron nada, uso 0");
      misNumeros = [0];
   } else {
      for (let i = 0; i < arguments.length; i++) {
         misNumeros.push(arguments[i]);
      }
   }

   let numerosValidados = comprobarNumeros(misNumeros);
   if (numerosValidados === undefined) {
      return undefined;
   }
   misNumeros = numerosValidados;

   let laMedia = calcularMedia(misNumeros);
   let elMaximo = calcularMaximo(misNumeros);
   let elMinimo = calcularMinimo(misNumeros);
   let lasDesviaciones = desviaciones(misNumeros);
   let mensaje = generarMensaje(misNumeros);

   console.log("RESULTADO DEL ORÁCULO");
   console.log("Números:", misNumeros);
   console.log("Media:", laMedia);
   console.log("Máximo:", elMaximo);
   console.log("Mínimo:", elMinimo);
   console.log("Desviaciones:", lasDesviaciones);
   console.log("Mensaje:", mensaje);
   console.log("===============================");
}

//Autoinvocada
(function () {
   console.log(" FUNCIÓN AUTOINVOCADA ");

   console.log("Consulta 1 - Guerrero principiante:");
   oraculo(10, 20, 30);

   console.log("Consulta 2 - Estadísticas bajas:");
   oraculo(5, 10, 15);

   console.log("Consulta 3 - Maestro legendario:");
   oraculo(70, 80, 90);

   console.log("Consulta 4 - Con cadenas numéricas:");
   oraculo("45", 30, "25");

   console.log("Consulta 5 - Palabras : ");
   oraculo("20", "20", "hola");

   console.log("Consulta 5 - Sin argumentos:");
   oraculo();
})();