console.log("T03 - Ejercicio 03");
/**Desarrolla un script que cambie el orden de los elementos de un array, 
 * es decir que el primero será el último, el segundo será el penúltimo 
 * y así sucesivamente hasta que el último sea el primero.
 *  Lo harás definiendo dos funciones. 
 * La primera función lo resolverá de forma "manual" y la segunda lo resolverá usando 
 * uno de los métodos del objeto Array que permite cambiar el orden de forma directa. 
 * ¿Qué método es ese?
 */

const arr = [2,3,4,5,6,7];

function  manual(array){
     // recorremos desde el final hasta el principio y vamos haciendo push
    const copiaInvertida = [];
    for (let i = array.length -1; i>=0; i--){
        copiaInvertida.push(array[i]);
    }
    return copiaInvertida;

};
function metodo(array){
    return array.slice().reverser();

}

console.log ("Original: " , arr);
console.log ("Manual (copia invertida): " , manual(arr));
console.log ("Metodo (copia invertida): " , metodo(arr));
