console.log("T03 - Ejercicio 14");
/**
 * Objeto Date
 
Crea un script que pida al usuario la fecha de su nacimiento
 (para saber su cumpleaños) y le indique su edad actual.

    
 */

 let nacimiento = prompt("Escribe tu fecha de nacimiento");

 let fechaNacimiento = new Date(nacimiento);

console.log (fechaNacimiento);

let hoy = new Date();
console.log(hoy);

let edad= hoy.getFullYear() - fechaNacimiento.getFullYear();
console.log("Edad calculada: ", edad);

let mes = hoy.getMonth() - fechaNacimiento.getMonth();
if (mes < 0 || (mes === 0 && hoy.getDate()< fechaNacimiento.getDate())){
    edad--;
}
console.log("Edad exacta" , edad);