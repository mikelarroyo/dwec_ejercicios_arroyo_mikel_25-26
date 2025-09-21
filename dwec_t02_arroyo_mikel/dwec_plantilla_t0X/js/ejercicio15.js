/*
* Desarrolla una aplicación que permita calcular los salarios mensuales de los trabajadores de una empresa a partir de los siguientes datos:
* ...
*/

console.log("T02 - Ejercicio 15");

const TarifaManana = 45;
const TarifaTarde = 47;
const TarifaNoche = 50;

let totalAbonado = 0; // let, no const

function pedirNombreTrabajador() {
    let nombre = prompt("Introduce el nombre del trabajador: \n(Pulsa cancelar para saltar este trabajador)");
    if (nombre === null) {
        return null;
    }
    return nombre;
}

function pedirHorasValidas() {
    let horas;
    do {
        let entrada = prompt("Introduce nº de horas trabajadas (entero > 0):\n(Pulsa Cancelar para saltar este trabajador)");
        if (entrada === null) return null;
        horas = Number(entrada);
    } while (isNaN(horas) || horas <= 0 || !Number.isInteger(horas));
    return horas;
}

function pedirTurnoValido() {
    let turno;
    do {
        let entrada = prompt("Introduce el turno (m=mañana , t= tarde, n= noche):\n(Pulsa cancelar para saltar este trabajador)");
        if (entrada === null) return null;
        turno = entrada.toLowerCase(); // <- microajuste para aceptar M/T/N
    } while (turno !== "m" && turno !== "t" && turno !== "n");
    return turno;
}

function porcentajeDescuento(bruto) {
    if (bruto < 600) {
        return 0.08;
    } else if (bruto <= 1000) {
        return 0.10;
    } else {
        return 0.12;
    }
}

function tarifaPorTurno(turno) {
    if (turno === "m") return TarifaManana;
    if (turno === "t") return TarifaTarde;
    return TarifaNoche;
}

// ---- Bucle principal terminado ----
while (confirm("¿Quieres introducir un trabajador?")) {
  const nombre = pedirNombreTrabajador();
  if (nombre === null) {
    alert("Se ha cancelado el nombre. Se salta este trabajador.");
    console.log("Trabajador saltado: canceló el nombre.");
    continue;
  }

  const horas = pedirHorasValidas();
  if (horas === null) {
    alert("Se han cancelado las horas. Se salta este trabajador.");
    console.log("Trabajador saltado: canceló las horas.");
    continue;
  }

  const turno = pedirTurnoValido();
  if (turno === null) {
    alert("Se ha cancelado el turno. Se salta este trabajador.");
    console.log("Trabajador saltado: canceló el turno.");
    continue;
  }

  const tarifa = tarifaPorTurno(turno);
  const bruto = horas * tarifa;
  const descuento = bruto * porcentajeDescuento(bruto);
  const neto = bruto - descuento;

  totalAbonado += neto;

  const info = 
    "Trabajador: " + nombre + "\n" +
    "Horas: " + horas + "\n" +
    "Turno: " + turno.toUpperCase() + "\n" +
    "Tarifa: " + tarifa.toFixed(2) + " €/h\n" +
    "Salario bruto: " + bruto.toFixed(2) + " €\n" +
    "Descuento: " + descuento.toFixed(2) + " €\n" +
    "Salario neto: " + neto.toFixed(2) + " €";

  alert(info);
  console.log(info);
}

// ---- Totales ----
alert("Total de salarios abonados: " + totalAbonado.toFixed(2) + " €");
console.log("Total de salarios abonados: " + totalAbonado.toFixed(2) + " €");
