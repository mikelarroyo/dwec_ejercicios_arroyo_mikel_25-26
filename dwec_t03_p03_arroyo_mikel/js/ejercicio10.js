console.log("T03 - Ejercicio 10");

const tabla = [
    ["Equipo", "PTS", "PJ", "PG", "PE", "PP"],
    ["Levante", 40, 14, 13, 1, 0],
    ["Malaga", 37, 14, 12, 1, 1],
    ["Eibar", 34, 14, 11, 1, 2],
    ["Cordoba", 27, 14, 8, 3, 3],
];

let entrada = -1;


function ordenarClasificacionPorPTS(tabla) {
    const cabecera = tabla[0];
    const filas = tabla.slice(1);
    filas.sort((a, b) => b[1] - a[1]); 
    tabla.length = 0; 
    tabla.push(cabecera, ...filas); 
}

function lider(matriz) {
    let candidatoNombre = matriz[1][0];
    let maxPts = Number(matriz[1][1]);

    for (let i = 2; i < matriz.length; i++) {
        if (Number(matriz[i][1]) > maxPts) {
            maxPts = Number(matriz[i][1]);
            candidatoNombre = matriz[i][0];
        }
    }
    return candidatoNombre;
}

function masGanados(matriz) {
    let candidatoNombre = matriz[1][0];
    let maxGanados = Number(matriz[1][3]);

    for (let i = 2; i < matriz.length; i++) {
        const fila = matriz[i];
        const pg = Number(fila[3]);
        if (pg > maxGanados) {
            maxGanados = pg;
            candidatoNombre = fila[0];
        }
    }
    return candidatoNombre;
}

function masPerdidos(matriz) {
    let candidatoNombre = matriz[1][0];
    let maxPerdidos = Number(matriz[1][5]);

    for (let i = 2; i < matriz.length; i++) {
        const fila = matriz[i];
        const pp = Number(fila[5]);
        if (pp > maxPerdidos) {
            maxPerdidos = pp;
            candidatoNombre = fila[0];
        }
    }
    return candidatoNombre;
}

function pedirDatos(tabla) {
    const nombre = prompt("Introduce nombre del equipo a ingresar: ");
    if (!nombre) {
        console.log("Entrada cancelada o nombre vacío. No se añade equipo");
        return null;
    }
    const ganados = Number(prompt("Introduce el nº de partidos ganados:"));
    if (isNaN(ganados) || ganados < 0) {
        console.log("Número inválido para partidos ganados.");
        return null;
    }
    const perdidos = Number(prompt("Introduce el nº de partidos perdidos:"));
    if (isNaN(perdidos) || perdidos < 0) {
        console.log("Número inválido para partidos perdidos.");
        return null;
    }
    const empatados = Number(prompt("Introduce el nº de partidos empatados:"));
    if (isNaN(empatados) || empatados < 0) {
        console.log("Número inválido para partidos empatados.");
        return null;
    }
    const pj = ganados + perdidos + empatados;
    const pts = ganados * 3 + empatados;

    const nuevaFila = [nombre, pts, pj, ganados, empatados, perdidos];
    tabla.push(nuevaFila);

    console.log("Equipo añadido", nuevaFila);

    ordenarClasificacionPorPTS(tabla);

    return nuevaFila;
}

function pedirDatosJornada(tabla) {
    console.log("\n-- Introducir nueva jornada---");

    for (let i = 1; i < tabla.length; i++) {
        const equipo = tabla[i][0];
        let resultado = prompt(`Resultado del ${equipo}: (G = GANADO, E = EMPATADO, P = PERDIDO)`);
        if (resultado === null) {
            console.log("Operación cancelada");
            return;
        }
        resultado = resultado.trim().toUpperCase();

        tabla[i][2] += 1;

        if (resultado === "G") {
            tabla[i][3] += 1;
            tabla[i][1] += 3;
        } else if (resultado === "E") {
            tabla[i][4] += 1;
            tabla[i][1] += 1;
        } else if (resultado === "P") {
            tabla[i][5] += 1;
        } else {
            console.log(`Entrada no válida para ${equipo}`);
            tabla[i][2] -= 1;
        }
    }

    ordenarClasificacionPorPTS(tabla);
}

function mostrarDatos(tabla) {
    console.table(tabla);
}

// MAIN
console.table(tabla);

do {
    entrada = prompt(
        "Selecciona una opción: \n" +
        "1-Mostrar líder\n" +
        "2-Mostrar equipo con más partidos perdidos\n" +
        "3-Mostrar equipos con más partidos ganados\n" +
        "4-Introducir nuevos datos de equipos\n" +
        "5-Mostrar Clasificación\n" +
        "6-Introducir una nueva jornada\n" +
        "0-Salir"
    );

    if (entrada === null) {
        console.log("\nEntrada cancelada. Saliendo...");
        break;
    }

    entrada = entrada.trim();

    switch (entrada) {
        case "1":
            console.log("\nLíder:", lider(tabla));
            break;
        case "2":
            console.log("\nEquipo con más PP:", masPerdidos(tabla));
            break;
        case "3":
            console.log("\nEquipo con más PG:", masGanados(tabla));
            break;
        case "4":
            console.log("\nDatos introducidos: ", pedirDatos(tabla));
            break;
        case "5":
            mostrarDatos(tabla);
            break;
        case "6":
            pedirDatosJornada(tabla);
            break;
        case "0":
            console.log("\nSaliendo...");
            break;
        default:
            console.log("\nOpción no válida.");
    }
} while (entrada !== "0");