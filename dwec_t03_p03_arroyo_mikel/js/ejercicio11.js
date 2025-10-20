console.log("T03 - Ejercicio 10");

/**Crear un script que almacene el nombre de dos jugadores en dos variables 
 * y dos arrays de 5 elementos con los valores de 
 * "piedra, papel, tijera, lagarto, spock".
 *  Estos cinco datos se almacenan en un Set.
 *  Primero el script debe preguntar el nombre del jugador 1 y sus 5 jugadas,
 *  luego hará lo mismo con el jugador 2.

Suponemos que los nombres de los jugadores son únicos y son nickname de una aplicación de juegos.
 Usando esos nombres como Keys, creado un Map que almacene para cada jugador sus jugadas.

Al pedir el nombre de cada jugador, se comprobará previamente que está en el Map. 
En caso contrario, se le vuelve a pedir un nombre de jugador.
 Después, también se comprobará que el jugador siempre indique una jugada de forma correcta.
  En caso contrario, se le vuelve a pedir. 
  El usuario podrá introducir las jugadas usando un número de 
  menú o escribiendo directamente el texto de la jugada (tanto en mayúscula como minúscula):
piedra
papel
tijera
lagarto
spock

Después el script, debe comparar los valores de las listas uno a uno y determinará el ganador de cada tirada. 

Al finalizar las 5 rondas, mostrará quién ganó  y los puntos finales. Si hay empate también se contemplará.

Reglas
Tijeras cortan papel
Papel cubre piedra
Piedra aplasta lagarto
Lagarto envenena Spock
Spock destruye tijeras
Tijeras decapitan lagarto
Lagarto come papel
Papel desaprueba Spock
Spock vaporiza piedra
Piedra aplasta tijeras
 */


const jugadasValidas = new Set(["piedra", "papel", "tijera", "lagarto", "spock"]);
const menuJugadas = ["piedra", "papel", "tijera", "lagarto", "spock"];
const partidas = new Map();

function pedirNombre(numeroJugador, nombresUsados) {
    let nombre;

    do {
        nombre = (prompt("Introduce el nombre del jugador " + numeroJugador + ":") || "").trim();

        if (nombre === "") {
            alert("El nombre no puede estar vacío.");
        } else if (nombresUsados.has(nombre)) {
            alert("Ese nombre ya está en uso. Introduce otro.");
            nombre = ""; // vaciamos para que repita
        }

    } while (nombre === ""); // repite solo si no hay nombre válido

    return nombre;
}

// Convertir entrada a jugada válida
function normalizarJugada(entrada) {
  if (!entrada) return null;

  const texto = entrada.trim().toLowerCase();

  // Si el jugador escribió un número del 1 al 5
  const numero = parseInt(texto);
  if (numero >= 1 && numero <= 5) {
    return menuJugadas[numero - 1];
  }

  // Si escribió directamente el nombre de la jugada
  if (jugadasValidas.has(texto)) {
    return texto;
  }

  // Si no coincide con nada
  return null;
}

function pedirJugada(nombreJugador, numeroRonda) {
  const textoMenu =
    "Elige tu jugada (1-5 o escribe el nombre):\n" +
    "1) piedra\n2) papel\n3) tijera\n4) lagarto\n5) spock";

  let jugada;

  do {
    const entrada = prompt(`Jugador ${nombreJugador} - Ronda ${numeroRonda}\n${textoMenu}`);
    jugada = normalizarJugada(entrada);

    if (!jugada) {
      alert("Jugada no válida. Inténtalo otra vez.");
    }
  } while (!jugada);

  return jugada;
}

//reglas
const ganaA = {
  tijera: ["papel", "lagarto"],
  papel: ["piedra", "spock"],
  piedra: ["lagarto", "tijera"],
  lagarto: ["spock", "papel"],
  spock: ["tijera", "piedra"],
};

// Devuelve 0 = empate, 1 = gana jugador1, 2 = gana jugador2
function ganadorDeRonda(jugada1, jugada2) {
  if (jugada1 === jugada2) return 0;
  if (ganaA[jugada1].includes(jugada2)) return 1;
  return 2;
}

//pedir datos jugadores
const nombresUsados = new Set();

const nombreJugador1 = pedirNombre(1, nombresUsados);
nombresUsados.add(nombreJugador1);

const nombreJugador2 = pedirNombre(2, nombresUsados);
nombresUsados.add(nombreJugador2);

//pedir 5 jugadas a cada jugador

const jugadasJugador1 = [];
const jugadasJugador2 = [];

for (let ronda = 1; ronda <= 5; ronda++) {
  const jugada1 = pedirJugada(nombreJugador1, ronda);
  const jugada2 = pedirJugada(nombreJugador2, ronda);

  jugadasJugador1.push(jugada1);
  jugadasJugador2.push(jugada2);
}

partidas.set(nombreJugador1, jugadasJugador1);
partidas.set(nombreJugador2, jugadasJugador2);

//COMPARAR JUGADAS Y CONTAR PUNTOS

let puntos1 = 0;
let puntos2 = 0;
let textoResultado = "Resultados por ronda:\n";

for (let i = 0; i < 5; i++) {
  const j1 = jugadasJugador1[i];
  const j2 = jugadasJugador2[i];
  const ganador = ganadorDeRonda(j1, j2);

  if (ganador === 0) {
    textoResultado += `Ronda ${i + 1}: Empate (${nombreJugador1}: ${j1} | ${nombreJugador2}: ${j2})\n`;
  } else if (ganador === 1) {
    puntos1++;
    textoResultado += `Ronda ${i + 1}: Gana ${nombreJugador1} (${j1} vence a ${j2})\n`;
  } else {
    puntos2++;
    textoResultado += `Ronda ${i + 1}: Gana ${nombreJugador2} (${j2} vence a ${j1})\n`;
  }
}

//Mostrar Resultado final

let textoFinal = `\nPuntuación final:\n${nombreJugador1}: ${puntos1} | ${nombreJugador2}: ${puntos2}\n`;

if (puntos1 > puntos2) {
  textoFinal += `Ganador: ${nombreJugador1}`;
} else if (puntos2 > puntos1) {
  textoFinal += `Ganador: ${nombreJugador2}`;
} else {
  textoFinal += `Empate total`;
}

alert(textoResultado + "\n" + textoFinal);
console.log(partidas);
