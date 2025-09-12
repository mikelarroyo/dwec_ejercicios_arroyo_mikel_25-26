console.log("T02 - Ejercicio 01");

//Desarrolla un script que pida 3 números reales al

// usuario y calcule su media aritmética e indique 
// la calificación del alumno usando la siguiente 
// notación: SUSPENSO (Menos de 5),  
// APROBADO (entre 5 y 7),
//  NOTABLE (entre 7 y 8.5), 
// SOBRESALIENTE (entre 8,5 y 10).


let num1 = parseFloat(prompt("Número 1:"));
let num2 = parseFloat(prompt("Número 2:"));
let num3 = parseFloat(prompt("Número 3:"));

alert("Gracias por responder");

console.log("Los números elegidos son", num1, num2, num3);

let media = (num1 + num2 + num3) / 3; //poner espacio entre los operadores siempre es mas limpio
console.log("la media es " + media);
alert("la media es " + media);

if(media<5){
    alert("SUSPENSO")
    console.log("Calificación SUSPENSA")
}
else if(media>=5 && media<7){
    alert("APROBADO");
    console.log("Calificación ARPOBADO");
}
else if(media>=7&&media<8.5){
    alert("NOTABLE");
    console.log("Calificación NOTABLE");
}
else if(media>=8.5&&media<=10){
    alert("SOBRESALIENTE");
    console.log("Calificación SOBRESALIENTE");
}
else{
    alert("la media no se corresponde al baremo esperado");
     console.log("la media no se corresponde al baremo esperado");
}





