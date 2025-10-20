console.log("T03 - Ejercicio 13");

/**
 * ¿Cómo se resolvería el ejercicio anterior definiendo un 
 * nuevo método en el objeto Math que se llame "random2(lim_inf, lim_sup)"?

 */

Math.random2 = function(limit_inf, limit_sup){
return Math.floor(Math.random() * (limit_sup - limit_inf + 1)) + limit_inf;
};

let unidades= generar_numeros_entre_0_9();
let centenas= generar_numeros_entre_0_9();
let millar= generar_numeros_entre_0_9();
let decenasMillar= generar_numeros_entre_0_9();
let unidadesMillar= generar_numeros_entre_0_9();


let numeroPremiado= "" + decenasMillar + unidadesMillar + centenas + decenas + unidades;

console.log("El numero premiado es: " + numeroPremiado);
alert("El numero premiado es: " + numeroPremiado);