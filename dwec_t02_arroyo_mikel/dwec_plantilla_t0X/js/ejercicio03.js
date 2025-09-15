console.log("T02 - Ejercicio 03");
/**Desarrolla un script que pida un año al usuario e indique si es bisiesto o no. Se debe verificar que el número introducido esté entre 0 y el año actual.

Después el script preguntará si es necesario comprobar otro año o salir.
Usa el depurador para ejecutar el script paso a paso y haz estas pruebas:
2024 → divisible por 4 → sí bisiesto.
2023 → no divisible por 4 → no bisiesto.
1900 → divisible por 100 pero no por 400 → no bisiesto.
2000 → divisible por 400 → sí bisiesto.
2100 → divisible por 100 pero no por 400 → no bisiesto.
2400 → divisible por 400 → sí bisiesto.

 */
let anio = parseInt(prompt("Escribe un año entre el 0 y el año actual"));
    if(anio>=0 && anio<=2025){
        if ((anio % 4 == 0 && anio % 100 !== 0) || (anio % 400 == 0)) {
            alert("El año es bisiesto");
            console.log("El año es bisiesto")
        } else {
            alert("El año no es bisiesto");
        }

    }
    else{
        alert("El numero no esta entre el 0 y el año actual")
    }


