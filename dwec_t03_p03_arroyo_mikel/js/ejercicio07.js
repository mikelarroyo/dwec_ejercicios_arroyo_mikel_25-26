/**
 * Desarrolla un script que pida el número de filas y columnas de una matriz. 
 * 
 * Dichos valores deben ser mayores de 0 y confiamos en que el usuario los introduce
 *  de forma correcta. Después se pedirán los valores de dicha matriz.
 *  Finalmente se mostrarán los datos por pantalla. Usa las siguientes funciones:
-    	pedirDatos() -Recibe: filas y columnas. Devuelve: matriz.
-    	mostrarDatos() - Recibe: matriz. Devuelve: nada
*/

console.log("T03 - Ejercicio 07");



function pedirDatos(filas,columnas){
    const matriz = [];

    for (let i = 0; i< filas; i++){
        matriz[i] = [];
        for(let j= 0; j< columnas; j++){
            const valor = prompt (`Introduce el valor para la posición [${i}][${j}]:`);
            matriz[i][j]= valor;
        }
    }
    return matriz;

}
function mostrarDatos(matriz) {
    let resultado = "Matriz:\n\n";
    
    for (let i = 0; i < matriz.length; i++) {
        let fila = "";
        for (let j = 0; j < matriz[i].length; j++) {
            fila += `[${matriz[i][j]}] `;
        }
        resultado += fila + "\n";
    }
    
    alert(resultado);
}

const filas = parseInt(prompt("Introduce el número de filas de la matriz:"));
const columnas = parseInt(prompt("Introduce el número de columnas de la matriz:"));

if (filas > 0 && columnas > 0) {
    const matriz = pedirDatos(filas, columnas);
    mostrarDatos(matriz);
} else {
    alert("Error: El número de filas y columnas debe ser mayor que 0.");
}