"use strict";

document.addEventListener("DOMContentLoaded", function _callee() {
  var formulario, input, tablaBody, tablaContenedor, zonaErrores, loader, contenedorTarjetas, datos, respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          formulario = document.getElementById("form-busqueda");
          input = document.getElementById("input-busqueda");
          tablaBody = document.getElementById("cuerpo-tabla");
          tablaContenedor = document.getElementById("tabla-resultados");
          zonaErrores = document.getElementById("mensajes-error");
          loader = document.getElementById("loader");
          contenedorTarjetas = document.getElementById("contenedor-personajes");
          datos = [];
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(fetch("https://hp-api.onrender.com/api/characters"));

        case 11:
          respuesta = _context.sent;

          if (respuesta.ok) {
            _context.next = 14;
            break;
          }

          throw new Error("Error HTTP: ".concat(respuesta.status));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(respuesta.json());

        case 16:
          datos = _context.sent;
          cargarSeccionBienvenida(datos, loader, contenedorTarjetas);
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](8);
          mostrarError(zonaErrores, "Error cr\xEDtico: ".concat(_context.t0.message));

          if (loader) {
            loader.textContent = 'Error al cargar datos.';
          }

        case 24:
          input.addEventListener("input", function () {
            realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, false);
          });
          formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, true);
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 20]]);
});

var mostrarError = function mostrarError(contenedor, mensaje) {
  var div = document.createElement("div");
  div.style.color = "red";
  div.style.border = "1px solid red";
  div.style.padding = "10px";
  div.style.marginBottom = "10px";
  div.textContent = mensaje;
  contenedor.appendChild(div);
};

var realizarBusqueda = function realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, esSubmit) {
  zonaErrores.innerHTML = "";
  tablaBody.innerHTML = "";
  tablaContenedor.hidden = true;
  var texto = input.value.trim().toLowerCase();

  if (texto === "") {
    if (esSubmit) {
      mostrarError(zonaErrores, "El campo de búsqueda no puede estar vacío.");
    }

    return;
  }

  var filtrados = datos.filter(function (p) {
    return p.name.toLowerCase().includes(texto);
  });

  if (filtrados.length === 0) {
    mostrarError(zonaErrores, "No se han encontrado personajes.");
  } else {
    tablaContenedor.hidden = false;
    filtrados.forEach(function (p) {
      var fila = document.createElement("tr");
      var celdaFoto = document.createElement("td");

      if (p.image) {
        var imagen = document.createElement("img");
        imagen.src = p.image;
        imagen.style.width = "50px";
        imagen.alt = p.name;
        celdaFoto.appendChild(imagen);
      } else {
        celdaFoto.textContent = "Sin foto";
      }

      var celdaNombre = document.createElement("td");
      celdaNombre.textContent = p.name;
      var celdaCasa = document.createElement("td");
      celdaCasa.textContent = p.house || "Sin casa";
      var celdaAccion = document.createElement("td");
      var btnFav = document.createElement("button");
      btnFav.textContent = "Favorito";
      celdaAccion.appendChild(btnFav);
      fila.appendChild(celdaFoto);
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaCasa);
      fila.appendChild(celdaAccion);
      tablaBody.appendChild(fila);
    });
  }
};

var cargarSeccionBienvenida = function cargarSeccionBienvenida(todosLosPersonajes, loader, contenedor) {
  if (!contenedor) return;
  if (loader) loader.style.display = 'block';
  contenedor.innerHTML = '';
  setTimeout(function () {
    if (loader) loader.style.display = 'none';
    var casas = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
    casas.forEach(function (casa) {
      var grupo = todosLosPersonajes.filter(function (p) {
        return p.house === casa;
      });
      var aleatorios = grupo.sort(function () {
        return 0.5 - Math.random();
      }).slice(0, 2);
      aleatorios.forEach(function (p) {
        var foto = p.image ? p.image : 'https://via.placeholder.com/200';
        var tarjeta = "\n                    <div style=\"\n                        display: inline-block; \n                        width: 23%; \n                        margin: 1%; \n                        border: 1px solid #ddd; \n                        box-shadow: 2px 2px 5px rgba(0,0,0,0.1); \n                        padding: 15px; \n                        border-radius: 8px; \n                        vertical-align: top;\n                        box-sizing: border-box; \n                        background-color: white;\n                        font-family: sans-serif;\n                    \">\n                        <img src=\"".concat(foto, "\" style=\"width: 100%; height: 200px; object-fit: cover; border-radius: 4px;\">\n                        \n                        <h3 style=\"font-size: 1.2rem; margin: 15px 0 10px; color: #2e7d32; text-align: center;\">\n                            ").concat(p.name, "\n                        </h3>\n                        \n                        <div style=\"font-size: 0.9rem; color: #555; line-height: 1.6;\">\n                            <p style=\"margin: 0;\"><strong>Casa:</strong> ").concat(p.house, "</p>\n                            <p style=\"margin: 0;\"><strong>Especie:</strong> ").concat(p.species, "</p>\n                            <p style=\"margin: 0;\"><strong>Patronus:</strong> ").concat(p.patronus || 'Desconocido', "</p>\n                            <p style=\"margin: 0;\"><strong>A\xF1o:</strong> ").concat(p.yearOfBirth || 'Desconocido', "</p>\n                        </div>\n                    </div>\n                ");
        contenedor.innerHTML += tarjeta;
      });
    });
  }, 2000);
};