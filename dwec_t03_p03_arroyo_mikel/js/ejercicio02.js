/**
Desarrolla un script que pida al usuario cuántos números va a introducir. 
Se comprobará que el número sea un número y que sea mayor que cero.
 En caso contrario se volverá a pedir el número de elementos hasta que el usuario introduzca un número mayor que cero.

Después el script le pedirá números al usuario uno a uno y los almacenará en un array.
 Finalmente el script dirá cuántos números son superiores a la media y el array original.
 
 Usa las siguientes funciones:
-    	pedirDatos() => Recibe: nada. Devuelve: array.
-    	calcularMedia() => Recibe: array. Devuelve: media.
-    	calcuarlSuperioresMedia() => Recibe: array y media. Devuelve: un array con los números superiores a la media.
-   	ordenarArray() => Recibe: array y orden (asc, desc). Devuelve: un array ordenado usando el método de "ordenación por inserción" programado por ti de forma manual.
-    	mostrarArray() => Recibe: array. Devuelve: nada.
-       mostrarArrayOrdenado() => Recibe: array. Devuelve: nada.


 */


(function () {

    console.log("T03 - Ejercicio 02");


    function pedirDatos() {
        let entrada;
        let cantidadNumeros;
        repetir=false;

        // pedir cantidad válida
        do {
            entrada = prompt("¿Cuántos números vas a introducir? (entero > 0)");
            if (entrada === null) {
                return null;
            }  // cancelado
            entrada = entrada.trim();
            cantidadNumeros = Number(entrada);
            if (!Number.isInteger(cantidadNumeros) || cantidadNumeros <= 0) {
                alert("Introduce un entero mayor que 0.");
                repetir = true;
            }
        } while (!Number.isInteger(cantidadNumeros) || cantidadNumeros <= 0);

        // pedir cantidadNumeros números y validamos
        const arr = [];
        for (let i = 0; i < cantidadNumeros; i++) {
            let valor;
            do {
                const texto = prompt(`Introduce el número ${i + 1} de ${cantidadNumeros}`);
                if (texto === null) return null; // cancelado
                valor = Number(texto.trim());
                if (Number.isNaN(valor)) {
                    alert("Introduce un número válido.");
                }
            } while (Number.isNaN(valor));
            arr.push(valor);
        }
        return arr;
    }

    function calcularMedia(array) {
        if (!array || array.length === 0) return 0;
        let suma = 0;
        for (let i = 0; i < array.length; i++) {
            suma += array[i]; // asume que array[i] es número
        }
        return suma / array.length;
    }

    function calcularSuperioresMedia(array, media) {
        const resultado = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] > media) resultado.push(array[i]);
        }
        return resultado;
    }

    // Ordenación por inserción que devuelve una COPIA ordenada

    function ordenarArray(array, orden) {
        if (orden !== "asc" && orden !== "desc") {
            console.log('Segundo argumento "orden" no válido; se usará "asc".');
            orden = "asc";
        }
        const copia = array.slice();
        for (let i = 1; i < copia.length; i++) {
            const clave = copia[i]; //copia clave del valor de la posicion i del array anterior
            let j = i - 1;
            if (orden === "asc") {
                // desplazar mayores a la derecha
                while (j >= 0 && copia[j] > clave) {
                    copia[j + 1] = copia[j];
                    j--;
                }
            } else {
                // desplazar menores a la derecha (orden descendente)
                while (j >= 0 && copia[j] < clave) {
                    copia[j + 1] = copia[j];
                    j--;
                }
            }
            copia[j + 1] = clave;
        }

        return copia;
    }

    function mostrarArray(array) {
        console.log("Array original:");
        for (let i = 0; i < array.length; i++) {
            console.log((i + 1) + ". " + array[i]);
        }
    }

    function mostrarArrayOrdenado(array) {
        const asc = ordenarArray(array, "asc");
        const desc = ordenarArray(array, "desc");
        console.log("Orden ascendente:");
        for (let i = 0; i < asc.length; i++) {
            console.log((i + 1) + ". " + asc[i]);
        }
        console.log("Orden descendente:");
        for (let i = 0; i < desc.length; i++) {
            console.log((i + 1) + ". " + desc[i]);
        }
    }


    const datos = pedirDatos();
    if (datos === null) {
        alert("Entrada cancelada por el usuario.");
        console.log("Entrada cancelada por el usuario.");
        return;
    }
    const media = calcularMedia(datos);
    const superiores = calcularSuperioresMedia(datos, media);
    mostrarArray(datos);
    alert("Media: " + media.toFixed(2) + "\nNº superiores a la media: " + superiores.length);
    console.log("Media:", media);
    console.log("Nº superiores a la media:", superiores.length, superiores);
    mostrarArrayOrdenado(datos);

})();



