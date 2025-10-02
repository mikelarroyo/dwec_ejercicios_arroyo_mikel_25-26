console.log("T03 - Ejercicio 01");


/**
Desarrolla un script que pregunte al usuario si quiere borrar el último elemento de un array o el primero, 
ambos, ninguno o deshacer al último estado. Se  empieza con un array inicial definido.
 //me pregunta una de las opciones, nosotros tenemos un array predefinido ya de antes.

menu con opciones: 
Si el usuario contesta que ninguno,: el script mostrará el array. //no hacer nda mostrara el array, al salir

Si el usuario contesta que quiere borrar el último o el primero, miro si puedo borrar primero si hay elementos o si no puedo.
el script mostrará el array sin el último elemento o sin el primero y volverá a preguntar si se quiere borrar el último elemento o el primero o ninguno. 

si me dice que borre el primero o el ultimo no se puede quedar undefined, y tengo que ver si hay alguna forma en js 
un metodo que lo haga. si me pone ambos, tengo que mirar si puedo borrar dos elementos, es decir tengo que verificarlo.

También se puede indicar ambos, en ese caso se elimina el primero y el último (si hay al menos dos elementos). 
Esto se repetirá mientras el usuario conteste que quiere borrar algún elemento o hasta que no queden más elementos en el array.

Es necesario guardar el estado del array antes de borrar por si el usuario contesta deshacer. Solo se guarda un estado.
para deshacer, tengo que saber si tengo que borrar los dos ultimos o los dos primeros :
soluciones;: una copia entera? NO QUEREMOS ESTO ya que no es eficiente.
utilizar variables para ver cuales son el inicio o el final, es decir almacenar lo borrado para luego poder volver ahi. luego donde esta el almacenado del deshacer de borra.
Asegúrate de que la eliminación no deje huecos en el array (undefined).

 */

const miArray = [2, 4, 6, 7, 10, 12];

elementoBorradoPrimero = null;
elementoBorradoUltimo = null;
tipoOperacion = null;

let opcion;



do {

    console.log(miArray);
    opcion = prompt(
        "Menu de operaciones, escoge una operación: \n" +
        "1 - Borrar primer elemento \n" +
        "2 - Borrar último elemento \n" +
        "3 - Borrar ambos \n" +
        "4 - Deshacer ultima operacion \n" +
        "5 - Salir y mostrar");

    switch (opcion) {

        case "1":
            if (miArray.length > 0) {
                elementoBorradoPrimero = miArray[0];
                elementoBorradoUltimo = null;
                tipoOperacion = "primero";


                miArray.shift();
                console.log("Primer elemento borrado \n" + miArray);
            } else {
                console.log("No se ha podido borrar el primero elemento")
            };
            break;
        case "2":
            if (miArray.length > 0) {
                elementoBorradoPrimero = null;
                elementoBorradoUltimo = miArray[miArray.length - 1];
                tipoOperacion = "ultimo";


                miArray.pop();
                console.log("Ultimo elemento borrado \n" + miArray);
            } else {
                console.log("No se ha podido borrar el ultimo elemento");
            }
            break;
        case "3":
            if (miArray.length >= 2) {
                elementoBorradoPrimero = miArray[0];
                elementoBorradoUltimo = miArray[miArray.length - 1];
                tipoOperacion = "ambos";
                miArray.pop();
                miArray.shift();
                console.log("Primero y ultimo borrados \n" + miArray);
            } else
                console.log("No se ha podido borrar ambos");
            break;
        case "4":
            if (tipoOperacion != null) {

                switch (tipoOperacion) {

                    case "primero":
                        miArray.unshift(elementoBorradoPrimero);
                        console.log("Operacion deshecha con éxito, primer elemento recuperado");
                        break;
                    case "ultimo":
                        miArray.push(elementoBorradoUltimo);
                        console.log("Operacion deshecha con éxisto, ambos elementos recuperados");
                        break;
                    case "ambos":
                        miArray.unshift(elementoBorradoPrimero);
                        miArray.push(elementoBorradoUltimo);
                        break;
                }

                elementoBorradoPrimero = null;
                elementoBorradoUltimo = null;
                tipoOperacion = null;

            } else {
                console.log("No hay nada que deshacer");

            }
            break;
        case "5":
            console.log("Saliendo del programa...")
            break;

        default:
            console.log("Error, operacion no valida");
    }

} while (opcion != 5 && miArray.length > 0);

console.log("TU array es: " + miArray);