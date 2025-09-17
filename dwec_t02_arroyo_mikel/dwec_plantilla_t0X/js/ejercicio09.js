console.log("T02 - Ejercicio 09");
/**Desarrolla un script que pida un número y a continuación muestre el siguiente menú:
 
Menú
----
1. Calcular si es múltiplo de 2.
2. Calcular si es múltiplo de 3.
3. Calcular si es múltiplo de 5.
0. Salir
 
El programa mostrará el resultado en función de la opción elegida. Deberás crear tres funciones para resolver cada una de las opciones. 
 
 */

let num1 = Number(prompt("Escoge un numero"))


function multiploDos(num1) {
    num1 % 2 == 0 ? alert("El numero es multiplo de 2") : alert("El numero no es multiplo de 2")

}
function multiploTres(num1) {
    num1 % 3 == 0 ? alert("El numero es multiplo de 3") : alert("El numero no es multiplo de 3")

}

function multiploCinco(num1) {
    num1 % 5 == 0 ? alert("El numero es multiplo de 5") : alert("El numero no es multiplo de 5")

}
let opcion;
do {

    opcion = Number(prompt(
        "Escoge de la lista:\n" +
        "1 - Comprobar múltiplo de 2\n" +
        "2 - Comprobar múltiplo de 3\n" +
        "3 - Comprobar múltiplo de 5\n" +
        "0 - Salir"
    ));

    switch (opcion) {
        case 1: multiploDos(num1)
            break;
        case 2: multiploTres(num1)
            break;
        case 3: multiploCinco(num1)
            break;
        default : alert("Opcion no válida")

    }



} while (opcion != 0);