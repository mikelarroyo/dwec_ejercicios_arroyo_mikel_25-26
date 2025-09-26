console.log("T03 - Ejercicio 15");
/**
 * Repite el ejercicio verificando si la fecha es 
 * correcta sin usar expresiones regulares 
 * (la fecha solo será correcta con este formato: DD/MM/YYYY)
 */

let nacimiento = prompt("Introduce una fecha (DD/MM/YYYY)");

if (!nacimiento.includes("/")) {
    alert("Formato inválido. Usa DD/MM/YYYY");
} else {
    let partes = nacimiento.split("/");
    if (partes.length !== 3) {
        alert("Formato inválido. Usa DD/MM/YYYY");
    } else {
        let dia = parseInt(partes[0], 10);
        let mes = parseInt(partes[1], 10);
        let anio = parseInt(partes[2], 10);

        let fecha = new Date(anio, mes - 1, dia);

        if (
            fecha.getFullYear() === anio &&
            fecha.getMonth() + 1 === mes &&
            fecha.getDate() === dia
        ) {
            alert("La fecha es válida");
            console.log("La fecha es válida");

            // ---- Calcular la edad usando la fecha validada ----
            let hoy = new Date();
            console.log("Hoy:", hoy);

            let edad = hoy.getFullYear() - fecha.getFullYear();
            let diferenciaMes = hoy.getMonth() - fecha.getMonth();

            if (
                diferenciaMes < 0 ||
                (diferenciaMes === 0 && hoy.getDate() < fecha.getDate())
            ) {
                edad--;
            }

            console.log("Edad exacta:", edad);
            alert("Edad exacta: " + edad + " años");
        } else {
            alert("La fecha es inválida");
            console.log("La fecha es inválida");
        }
    }
}
