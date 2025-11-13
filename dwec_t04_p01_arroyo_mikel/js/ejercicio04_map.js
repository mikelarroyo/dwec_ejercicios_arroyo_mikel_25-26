console.log("T04 - Ejercicio 04");


const personajes = [
    {
        nombre: "Spider-Man",
        nombreReal: "Peter Parker",
        profesionReal: "Fotógrafo",
        editorial: "Marvel",
        superpoder: "Agilidad sobrehumana, sentido arácnido, fuerza mejorada",
        debilidad: "Familia, responsabilidades",
        heroe: "héroe",
        edad: 28,
        numeroApariciones: 2500,
        equipo: "Los Vengadores",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-616"
    },
    {
        nombre: "Batman",
        nombreReal: "Bruce Wayne",
        profesionReal: "Empresario",
        editorial: "DC",
        superpoder: "Inteligencia superior, combate cuerpo a cuerpo",
        debilidad: "Humanidad, miedo a perder seres queridos",
        heroe: "héroe",
        edad: 35,
        numeroApariciones: 3000,
        equipo: "Liga de la Justicia",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Iron Man",
        nombreReal: "Tony Stark",
        profesionReal: "Ingeniero, Empresario",
        editorial: "Marvel",
        superpoder: "Armadura tecnológica avanzada, inteligencia superior",
        debilidad: "Alcoholismo, ego",
        heroe: "héroe",
        edad: 40,
        numeroApariciones: 2200,
        equipo: "Los Vengadores",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-616"
    },
    {
        nombre: "Joker",
        nombreReal: "Desconocido",
        profesionReal: "Criminal",
        editorial: "DC",
        superpoder: "Ingenio criminal, inmunidad a toxinas",
        debilidad: "Insanidad",
        heroe: "villano",
        edad: 45,
        numeroApariciones: 1000,
        equipo: "Injusticia",
        nacionalidad: "Desconocido",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Wonder Woman",
        nombreReal: "Diana Prince",
        profesionReal: "Embajadora, guerrera",
        editorial: "DC",
        superpoder: "Fuerza sobrehumana, vuelo, habilidades de combate",
        debilidad: "Cuerdas mágicas",
        heroe: "héroe",
        edad: 3000,
        numeroApariciones: 1200,
        equipo: "Liga de la Justicia",
        nacionalidad: "Themyscirana",
        especie: "Amazona",
        universo: "Tierra-1"
    },
    {
        nombre: "Thor",
        nombreReal: "Thor Odinson",
        profesionReal: "Dios del Trueno",
        editorial: "Marvel",
        superpoder: "Control del trueno, vuelo, fuerza sobrehumana",
        debilidad: "Humildad (cuando sin Mjolnir)",
        heroe: "héroe",
        edad: 1500,
        numeroApariciones: 1500,
        equipo: "Los Vengadores",
        nacionalidad: "Asgardiano",
        especie: "Dios",
        universo: "Tierra-616"
    },
    {
        nombre: "Loki",
        nombreReal: "Loki Laufeyson",
        profesionReal: "Dios de las mentiras",
        editorial: "Marvel",
        superpoder: "Ilusionismo, cambio de forma, magia",
        debilidad: "Celos hacia Thor",
        heroe: "antiheroe",
        edad: 1000,
        numeroApariciones: 900,
        equipo: "",
        nacionalidad: "Asgardiano",
        especie: "Gigante de Hielo",
        universo: "Tierra-616"
    },
    {
        nombre: "Flash",
        nombreReal: "Barry Allen",
        profesionReal: "Forense",
        editorial: "DC",
        superpoder: "Súper velocidad, viaje en el tiempo",
        debilidad: "Demasiada velocidad puede destruir el tiempo",
        heroe: "héroe",
        edad: 30,
        numeroApariciones: 1500,
        equipo: "Liga de la Justicia",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Thanos",
        nombreReal: "Thanos",
        profesionReal: "Tirano galáctico",
        editorial: "Marvel",
        superpoder: "Fuerza inmensa, inteligencia táctica, uso del Guantelete del Infinito",
        debilidad: "Arrogancia, obsesión con la muerte",
        heroe: "villano",
        edad: 1000,
        numeroApariciones: 500,
        equipo: "Orden Negra",
        nacionalidad: "Titán",
        especie: "Eterno-Deviant",
        universo: "Tierra-616"
    },
    {
        nombre: "Superman",
        nombreReal: "Clark Kent (Kal-El)",
        profesionReal: "Periodista",
        editorial: "DC",
        superpoder: "Fuerza sobrehumana, vuelo, visión de rayos X, invulnerabilidad",
        debilidad: "Kryptonita",
        heroe: "héroe",
        edad: 35,
        numeroApariciones: 3000,
        equipo: "Liga de la Justicia",
        nacionalidad: "Kryptoniano",
        especie: "Extraterrestre (Kryptoniano)",
        universo: "Tierra-1"
    }
];



// 1- Usa el método "map" para conseguir el nombre de todos los personajes.

function ejercicio1() {
    let nombres = personajes.map(elememtoArray => elememtoArray.nombre);
    
    console.log("Nombres de todos los personajes:");
    console.log(nombres);
}



// 2- Usa el método "map" para conseguir la profesión real,
// de todos los personajes de la "Tierra-1" del universo "DC".

function ejercicio2() {
    let profesionesDC = personajes.map(elementoArray => {
        if (elementoArray.universo === "Tierra-1" && elementoArray.editorial === "DC")
            return elementoArray.profesionReal;
    });

    console.log("Profesión real:");
    console.log(profesionesDC);
    
}



// 3- Usa map() para generar un nuevo array de objetos resumen,
// con las claves: { personaje: nombre, poderPrincipal: superpoder, edad: edad }.

function ejercicio3() {
    let resumen = personajes.map(elementoArray => {
        return {
            personaje: elementoArray.nombre,
            poderPrincipal: elementoArray.superpoder,
            edad: elementoArray.edad
        };
    });

    console.log("Array de objetos resumen:");
    console.log(resumen);
}



// 4- Usa "flatMap" para crear un array que contenga todos los superpoderes
// individuales de todos los personajes, separándolos por comas.
// (Por ejemplo: “fuerza”, “vuelo”, “visión de rayos X”, …)

function ejercicio4() {
    let todosLosPoderes = personajes.flatMap(personaje => personaje.superpoder.split(", "));

    let todosLosPoderesMap = personajes.map(personaje => personaje.superpoder.split(", "));

    console.log("Todos los superpoderes individuales con FLAT:");
    console.log(todosLosPoderes);
    console.log("Todos los superpoderes individuales map:");
    console.log(todosLosPoderesMap);

}


document.getElementById("btnEjer1").addEventListener("click", ejercicio1);
document.getElementById("btnEjer2").addEventListener("click", ejercicio2);
document.getElementById("btnEjer3").addEventListener("click", ejercicio3);
document.getElementById("btnEjer4").addEventListener("click", ejercicio4);
