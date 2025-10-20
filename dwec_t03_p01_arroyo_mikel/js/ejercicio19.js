console.log("T03 - Ejercicio 19");
/**
 * Objeto RegExp

Determina en un folio qué hace este script. Después comprueba que has acertado, haciendo uso de un depurador:


 */

let a = ["Sung", "Luffy", "Goku", "Sakura", "Asta", "Kenshin", "Meliodas"]; //array de nombres 7 elementos perosnajes de anime
let b = new Date();  //b es una fecha
let c = a[b.getDay() % a.length]; //get day es el dia de la semana, en este caso es 6 . el 0 es domingo entonces hoy es jueves y es 4 [va a devolver un numero] es decir a[x] va a acceder a una posicion del array
let d = 0; // la d es 0
for (let i = 0; i < c.length; i++) { //la c es la posicion del array, entonces el c.length te va a devolvel los caracterres de la cadena que recibe desde c
    let e = Math.floor(Math.random() * c.length); //numero aleeatorio del 0 a a longitud de la cadena -1
    let f = c.charAt(e); //pilla el numero aleatorio de arriba el caracter de esa cadena
    if (i % 2 === 0) {//si es par entra
        f = f.toUpperCase(); //y la f de esa cadena la pone en amyuscula
        c = c.slice(0, i) + f + c.slice(i + 1); // 
    }
    if ("aeiou".includes(f.toLowerCase())) {
        d += Math.pow(2, i);
    }
    console.log(f);
}
console.log(d.toFixed(0));
console.log(c);
console.log(e);