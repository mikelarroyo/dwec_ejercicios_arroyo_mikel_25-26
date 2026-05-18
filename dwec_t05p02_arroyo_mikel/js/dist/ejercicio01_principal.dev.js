"use strict";

console.log("T04 - Ejercicio 01");
document.addEventListener('DOMContentLoaded', function () {
  var boton = document.getElementById('btn-comprar');

  if (boton) {
    boton.addEventListener('click', function () {
      main();
    });
  } else {
    main();
  }
});

function main() {
  try {
    var nombreTienda = "Mi Librería DWEC";
    var tienda = Tienda.getInstancia(nombreTienda);
    tienda.iniciar();
  } catch (error) {
    console.error("Error en la ejecución:", error.message);
  }
}