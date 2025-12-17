console.log("T02 - Ejercicio 08");


/**Desarrolla un script que pida dos números enteros. 
 * El programa determinará cuál es el menor y mostrará todos los número que hay entre ellos y cuantos hay.
 *  El script tendrá una función para calcular cual es el menor de los dos: calcular_menor

Usa console.table() para mostrar listas de números.
 */


let num1 = Number(prompt("Escribe un numero"))
let num2 = Number(prompt("Escrube otro numero"))

function calcular_menor(a,b){
    return a < b? a : b;
}

let menor = calcular_menor(num1,num2);
let mayor = num1 == menor? num2 : num1;

let contador = 0;
let obj= {};

for (let i = menor; i <= mayor; i++){
    obj[contador] = i;
    contador++;
}
console.table(obj);
console.log("Cantidad de numero: " + contador);
alert("cantidad de nuemeros: " + contador);

