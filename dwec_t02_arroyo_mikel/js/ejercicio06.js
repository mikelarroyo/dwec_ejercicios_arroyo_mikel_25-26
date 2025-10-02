console.log("T02 - Ejercicio 06");

/**Desarrolla un script que pida dos números enteros y los multiplique usando sumas sucesivas.
Se tiene que comprobar si el usuario ha introducido o no números válidos. 
//En el caso de que alguno de los números no sea válido, se le volverá a pedir el número hasta que lo introduzca correctamente.

Se pueden multiplicar números negativo.s
 */


let num1;
do{
num1= Number(prompt("escribe el primer numero entero"));

} while (isNaN(num1)|| !Number.isInteger(num1));

let num2;
do{
num2= Number(prompt("escribe el segundo numero entero"))

} while (isNaN(num2)|| !Number.isInteger(num2));
 

let resultado = 0;
if (num2 >=0){
    for (let i=0; i <num2; i++){
        resultado += num1;

    }
} else {
    for (let i=0; i > -num2; i++){
        resultado -= num1;
    }
}

alert(num1 + " x " + num2 + " = " + resultado);
console.log(num1 + " x " + num2 + " = " + resultado);

