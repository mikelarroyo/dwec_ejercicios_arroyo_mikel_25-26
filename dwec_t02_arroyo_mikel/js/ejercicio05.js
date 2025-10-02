console.log("T02 - Ejercicio 05");

//Desarrolla un script que pida cinco números y muestre los que sean mayores que la media. Sin usar arrays. Suponemos que siempre se introducen números.
//El mensaje de salida será: "Los siguientes números introducidos son superiores a la media (VALORMEDIA): NUM1, NUMX…."


let num1= Number(prompt("Escoge numero 1: "));
let num2= Number(prompt("Escoge numero 2: "));
let num3= Number(prompt("Escoge numero 3: "));
let num4= Number(prompt("Escoge numero 4: "));
let num5= Number(prompt("Escoge numero 5: "));

if (Number.isInteger(num1)&& Number.isInteger(num2)&& Number.isInteger(num3)&&Number.isInteger(num4)&&Number.isInteger(num5)){

    let VALORMEDIA= (num1 + num2 + num3 + num4 + num5) / 5;
    let resultado = "Los siguientes números introducidos son superiores a la media (" + VALORMEDIA + "): ";
    
    
    
    if(num1>VALORMEDIA) resultado += num1 + " "; 
    if(num2>VALORMEDIA) resultado += num2 + " ";
    if(num3>VALORMEDIA) resultado += num3 + " ";
    if(num4>VALORMEDIA) resultado += num4 + " ";
    if(num5>VALORMEDIA) resultado += num5 + " ";

    alert(resultado);
    
}else {
    alert("no has introducido 5 numeros")
}
