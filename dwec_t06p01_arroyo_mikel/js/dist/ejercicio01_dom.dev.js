"use strict";

var todosLosPersonajes = [];
document.addEventListener("DOMContentLoaded", function _callee() {
  var respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mostrarAvisoCookies();
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://hp-api.onrender.com/api/characters"));

        case 4:
          respuesta = _context.sent;

          if (respuesta.ok) {
            _context.next = 7;
            break;
          }

          throw new Error("Error HTTP ".concat(respuesta.status));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(respuesta.json());

        case 9:
          todosLosPersonajes = _context.sent;
          cargarBienvenida();
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          mostrarError("error-buscador", "No se pudo conectar con la API: ".concat(_context.t0.message));
          document.getElementById("loader-bienvenida").innerHTML = '<p class="text-danger">Error al cargar personajes. Comprueba tu conexión.</p>';

        case 17:
          configurarBuscador();
          actualizarSeccionFavoritos();
          iniciarMapa();
          configurarSeccionFrases();
          document.getElementById("btn-buscar-anio").addEventListener("click", buscarPorAnio);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}); // Cookies - Ejercicio 2, Función 1

function mostrarAvisoCookies() {
  if (sessionStorage.getItem("cookiesAceptadas") === "si") return;
  var banner = document.getElementById("aviso-cookies");
  banner.classList.remove("d-none");
  document.getElementById("btn-aceptar-cookies").addEventListener("click", function () {
    sessionStorage.setItem("cookiesAceptadas", "si");
    banner.classList.add("d-none");
  });
} // Buscador - Sección 1


function configurarBuscador() {
  var formulario = document.getElementById("form-busqueda");
  var inputBusqueda = document.getElementById("input-busqueda");
  inputBusqueda.addEventListener("input", function () {
    buscarPersonajes(false);
  });
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    buscarPersonajes(true);
  });
}

function buscarPersonajes(esSubmit) {
  var input = document.getElementById("input-busqueda");
  var zonaError = document.getElementById("error-buscador");
  var tabla = document.getElementById("tabla-buscador");
  var cuerpoTabla = document.getElementById("cuerpo-tabla-buscador");
  zonaError.innerHTML = "";
  cuerpoTabla.innerHTML = "";
  tabla.classList.add("d-none");
  var texto = input.value.trim().toLowerCase();

  if (texto === "") {
    if (esSubmit) mostrarError("error-buscador", "El campo de búsqueda no puede estar vacío.");
    return;
  }

  var resultados = todosLosPersonajes.filter(function (p) {
    return p.name.toLowerCase().includes(texto);
  });

  if (resultados.length === 0) {
    mostrarError("error-buscador", "No se encontraron personajes con ese nombre.");
    return;
  }

  tabla.classList.remove("d-none");
  resultados.forEach(function (personaje) {
    var fila = document.createElement("tr");
    var celdaFoto = document.createElement("td");

    if (personaje.image) {
      var img = document.createElement("img");
      img.src = personaje.image;
      img.alt = personaje.name;
      img.style.width = "50px";
      img.style.height = "65px";
      img.style.objectFit = "cover";
      celdaFoto.appendChild(img);
    } else {
      celdaFoto.textContent = "Sin foto";
    }

    var celdaNombre = document.createElement("td");
    celdaNombre.textContent = personaje.name;
    celdaNombre.className = "align-middle";
    var celdaCasa = document.createElement("td");
    celdaCasa.textContent = personaje.house || "Sin casa";
    celdaCasa.className = "align-middle";
    var celdaAccion = document.createElement("td");
    celdaAccion.className = "align-middle";
    var botonFav = document.createElement("button");
    botonFav.className = "btn btn-sm";
    var favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    var esFavorito = favoritos.some(function (f) {
      return f.id === personaje.id;
    });

    if (esFavorito) {
      botonFav.textContent = "En favoritos";
      botonFav.classList.add("btn-warning");
    } else {
      botonFav.textContent = "Marcar favorito";
      botonFav.classList.add("btn-outline-warning");
    }

    botonFav.addEventListener("click", function () {
      return toggleFavorito(personaje, botonFav);
    });
    celdaAccion.appendChild(botonFav);
    fila.appendChild(celdaFoto);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCasa);
    fila.appendChild(celdaAccion);
    cuerpoTabla.appendChild(fila);
  });
} // Bienvenida - Sección 2


function cargarBienvenida() {
  var loader = document.getElementById("loader-bienvenida");
  var contenedor = document.getElementById("contenedor-bienvenida");
  setTimeout(function () {
    loader.classList.add("d-none");
    var casas = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    var html = "";
    casas.forEach(function (casa) {
      var personajesDeCasa = todosLosPersonajes.filter(function (p) {
        return p.house === casa;
      });
      var aleatorios = personajesDeCasa.sort(function () {
        return 0.5 - Math.random();
      }).slice(0, 2);
      aleatorios.forEach(function (p) {
        var foto = p.image || "https://placehold.co/200x200?text=Sin+foto";
        html += "\n                    <div class=\"col-12 col-sm-6 col-lg-3\">\n                        <div class=\"card h-100 shadow-sm\">\n                            <img src=\"".concat(foto, "\" class=\"card-img-top\" alt=\"").concat(p.name, "\" style=\"height: 200px; object-fit: cover;\">\n                            <div class=\"card-body\">\n                                <h5 class=\"card-title\">").concat(p.name, "</h5>\n                                <p class=\"card-text mb-1\"><strong>Casa:</strong> ").concat(p.house, "</p>\n                                <p class=\"card-text mb-1\"><strong>Especie:</strong> ").concat(p.species || "Desconocida", "</p>\n                                <p class=\"card-text mb-1\"><strong>Patronus:</strong> ").concat(p.patronus || "Desconocido", "</p>\n                                <p class=\"card-text mb-1\"><strong>A\xF1o nac.:</strong> ").concat(p.yearOfBirth || "Desconocido", "</p>\n                            </div>\n                        </div>\n                    </div>\n                ");
      });
    });
    contenedor.innerHTML = html;
  }, 2000);
} // Favoritos - Sección 3


function toggleFavorito(personaje, boton) {
  var favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
  var yaEsFavorito = favoritos.some(function (f) {
    return f.id === personaje.id;
  });

  if (yaEsFavorito) {
    favoritos = favoritos.filter(function (f) {
      return f.id !== personaje.id;
    });
    boton.textContent = "Marcar favorito";
    boton.classList.replace("btn-warning", "btn-outline-warning");
  } else {
    favoritos.push({
      id: personaje.id,
      name: personaje.name,
      house: personaje.house,
      species: personaje.species,
      image: personaje.image
    });
    boton.textContent = "En favoritos";
    boton.classList.replace("btn-outline-warning", "btn-warning");
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  actualizarSeccionFavoritos();
}

function actualizarSeccionFavoritos() {
  var contenedor = document.getElementById("lista-favoritos");
  var favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

  if (favoritos.length === 0) {
    contenedor.innerHTML = '<p class="text-muted text-center">No tienes personajes favoritos todavía.</p>';
    return;
  }

  var html = '<ul class="list-group">';
  favoritos.forEach(function (p) {
    var foto = p.image || "https://placehold.co/50x65?text=?";
    html += "\n            <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n                <div class=\"d-flex align-items-center gap-3\">\n                    <img src=\"".concat(foto, "\" width=\"50\" height=\"65\" style=\"object-fit: cover; border-radius: 4px;\" alt=\"").concat(p.name, "\">\n                    <div>\n                        <strong>").concat(p.name, "</strong><br>\n                        <small class=\"text-muted\">").concat(p.house || "Sin casa", " \xB7 ").concat(p.species || "Desconocido", "</small>\n                    </div>\n                </div>\n                <button class=\"btn btn-sm btn-danger\" onclick=\"eliminarFavorito('").concat(p.id, "')\">Eliminar</button>\n            </li>\n        ");
  });
  html += "</ul>";
  contenedor.innerHTML = html;
}

function eliminarFavorito(id) {
  var favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
  favoritos = favoritos.filter(function (f) {
    return f.id !== id;
  });
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  actualizarSeccionFavoritos();
} // Mapa y geolocalización - Sección 4


function iniciarMapa() {
  // CAMBIA estas coordenadas por las de tu IES
  var latIES = 43.3128;
  var lngIES = -1.9749;
  var mapa = L.map("mapa").setView([latIES, lngIES], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(mapa);
  L.marker([latIES, lngIES]).addTo(mapa).bindPopup("<strong>IES</strong><br>Centro educativo").openPopup();
  var msgGeo = document.getElementById("msg-geolocalizacion");

  if (!navigator.geolocation) {
    msgGeo.textContent = "Tu navegador no soporta geolocalización.";
    return;
  }

  navigator.geolocation.getCurrentPosition(function (posicion) {
    var lat = posicion.coords.latitude;
    var lng = posicion.coords.longitude;
    L.marker([lat, lng]).addTo(mapa).bindPopup("Tu ubicación");
    msgGeo.textContent = "Tu ubicaci\xF3n detectada: ".concat(lat.toFixed(4), ", ").concat(lng.toFixed(4));
  }, function () {
    msgGeo.textContent = "No se pudo obtener tu ubicación (permiso denegado o no disponible).";
  });
} // Frases por personaje - Sección 5


function configurarSeccionFrases() {
  document.getElementById("select-casa").addEventListener("change", function (e) {
    mostrarPersonajesPorCasa(e.target.value);
  });
  document.getElementById("orden-frases").addEventListener("change", function () {
    actualizarListadoFrases();
  });
  actualizarListadoFrases();
}

function mostrarPersonajesPorCasa(casa) {
  var contenedor = document.getElementById("lista-personajes-frases");

  if (!casa) {
    contenedor.innerHTML = "";
    return;
  }

  var personajes;

  if (casa === "sin-casa") {
    personajes = todosLosPersonajes.filter(function (p) {
      return !p.house;
    });
  } else {
    personajes = todosLosPersonajes.filter(function (p) {
      return p.house === casa;
    });
  }

  if (personajes.length === 0) {
    contenedor.innerHTML = '<p class="text-muted">No hay personajes para esta casa.</p>';
    return;
  }

  var html = '<ul class="list-group">';
  personajes.forEach(function (p) {
    html += "\n            <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n                <span>".concat(p.name, "</span>\n                <button class=\"btn btn-sm btn-primary\"\n                    onclick=\"abrirModalFrases('").concat(p.id, "', '").concat(p.house || "sin-casa", "')\">\n                    A\xF1adir frases\n                </button>\n            </li>\n        ");
  });
  html += "</ul>";
  contenedor.innerHTML = html;
}

function abrirModalFrases(personajeId, casaPersonaje) {
  var cuerpoModal, btnGuardar, btnNueva, modal, url, respuesta, listaPersonajes, personaje, foto;
  return regeneratorRuntime.async(function abrirModalFrases$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cuerpoModal = document.getElementById("cuerpo-modal-frases");
          btnGuardar = document.getElementById("btn-guardar-frase");
          btnNueva = document.getElementById("btn-nueva-frase");
          cuerpoModal.innerHTML = "\n        <div class=\"text-center py-4\">\n            <div class=\"spinner-border text-primary\" role=\"status\"></div>\n            <p class=\"mt-2\">Cargando datos del personaje...</p>\n        </div>\n    ";
          modal = new bootstrap.Modal(document.getElementById("modal-frases"));
          modal.show();
          _context2.prev = 6;

          if (casaPersonaje === "sin-casa") {
            url = "https://hp-api.onrender.com/api/characters";
          } else {
            url = "https://hp-api.onrender.com/api/characters/house/".concat(casaPersonaje.toLowerCase());
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(fetch(url));

        case 10:
          respuesta = _context2.sent;

          if (respuesta.ok) {
            _context2.next = 13;
            break;
          }

          throw new Error("Error HTTP ".concat(respuesta.status));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(respuesta.json());

        case 15:
          listaPersonajes = _context2.sent;
          personaje = listaPersonajes.find(function (p) {
            return p.id === personajeId;
          });

          if (personaje) {
            _context2.next = 19;
            break;
          }

          throw new Error("Personaje no encontrado en la API");

        case 19:
          foto = personaje.image || "https://placehold.co/90x110?text=?";
          cuerpoModal.innerHTML = "\n            <div class=\"d-flex gap-3 mb-4\">\n                <img src=\"".concat(foto, "\" width=\"90\" height=\"110\" style=\"object-fit: cover; border-radius: 8px;\" alt=\"").concat(personaje.name, "\">\n                <div>\n                    <h5 class=\"mb-1\">").concat(personaje.name, "</h5>\n                    <p class=\"mb-1 text-muted small\">Casa: ").concat(personaje.house || "Sin casa", "</p>\n                    <p class=\"mb-1 text-muted small\">Especie: ").concat(personaje.species || "Desconocida", "</p>\n                    <p class=\"mb-0 text-muted small\">A\xF1o nac.: ").concat(personaje.yearOfBirth || "Desconocido", "</p>\n                </div>\n            </div>\n            <div id=\"frases-del-personaje\" class=\"mb-3\"></div>\n            <div>\n                <label class=\"form-label fw-bold\">Escribe una frase famosa:</label>\n                <textarea id=\"input-frase\" class=\"form-control\" rows=\"3\" placeholder=\"Escribe aqu\xED la frase...\"></textarea>\n                <div id=\"error-frase\" class=\"text-danger mt-1 small\"></div>\n            </div>\n        ");
          mostrarFrasesEnModal(personajeId, personaje.name);

          btnGuardar.onclick = function () {
            return guardarFrase(personajeId, personaje.name);
          };

          btnNueva.onclick = function () {
            document.getElementById("input-frase").value = "";
            document.getElementById("error-frase").textContent = "";
            document.getElementById("input-frase").focus();
          };

          _context2.next = 29;
          break;

        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](6);
          cuerpoModal.innerHTML = "<div class=\"alert alert-danger\">Error al cargar el personaje: ".concat(_context2.t0.message, "</div>");

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 26]]);
}

function mostrarFrasesEnModal(personajeId, nombrePersonaje) {
  var contenedor = document.getElementById("frases-del-personaje");
  if (!contenedor) return;
  var todasLasFrases = JSON.parse(localStorage.getItem("frases") || "[]");
  var frasesDelPersonaje = todasLasFrases.filter(function (f) {
    return f.personajeId === personajeId;
  });

  if (frasesDelPersonaje.length === 0) {
    contenedor.innerHTML = '<p class="text-muted small">No hay frases guardadas para este personaje.</p>';
    return;
  }

  var html = "<p class=\"fw-bold small\">Frases guardadas de ".concat(nombrePersonaje, ":</p>");
  html += '<ul class="list-group list-group-flush mb-2">';
  frasesDelPersonaje.forEach(function (f) {
    var fecha = new Date(f.fecha).toLocaleString("es-ES");
    html += "\n            <li class=\"list-group-item px-0\">\n                <p class=\"mb-1 fst-italic\">\"".concat(f.frase, "\"</p>\n                <small class=\"text-muted\">Guardada el ").concat(fecha, "</small>\n            </li>\n        ");
  });
  html += "</ul>";
  contenedor.innerHTML = html;
}

function guardarFrase(personajeId, nombrePersonaje) {
  var inputFrase = document.getElementById("input-frase");
  var errorFrase = document.getElementById("error-frase");
  var frase = inputFrase.value.trim();

  if (!frase) {
    errorFrase.textContent = "La frase no puede estar vacía.";
    return;
  }

  var todasLasFrases = JSON.parse(localStorage.getItem("frases") || "[]");
  var duplicada = todasLasFrases.some(function (f) {
    return f.personajeId === personajeId && f.frase.toLowerCase() === frase.toLowerCase();
  });

  if (duplicada) {
    errorFrase.textContent = "Esta frase ya está guardada para este personaje.";
    return;
  }

  todasLasFrases.push({
    personajeId: personajeId,
    personajeNombre: nombrePersonaje,
    frase: frase,
    fecha: new Date().toISOString()
  });
  localStorage.setItem("frases", JSON.stringify(todasLasFrases));
  inputFrase.value = "";
  errorFrase.textContent = "";
  mostrarFrasesEnModal(personajeId, nombrePersonaje);
  actualizarListadoFrases();
}

function actualizarListadoFrases() {
  var contenedor = document.getElementById("listado-frases-guardadas");
  var orden = document.getElementById("orden-frases").value;
  var frases = JSON.parse(localStorage.getItem("frases") || "[]");

  if (frases.length === 0) {
    contenedor.innerHTML = '<p class="text-muted">No hay frases guardadas todavía.</p>';
    return;
  }

  frases.sort(function (a, b) {
    var diferencia = new Date(a.fecha) - new Date(b.fecha);
    return orden === "desc" ? -diferencia : diferencia;
  });
  var html = '<ul class="list-group">';
  frases.forEach(function (f) {
    var fecha = new Date(f.fecha).toLocaleString("es-ES");
    html += "\n            <li class=\"list-group-item\">\n                <div class=\"d-flex justify-content-between\">\n                    <strong>".concat(f.personajeNombre, "</strong>\n                    <small class=\"text-muted\">").concat(fecha, "</small>\n                </div>\n                <p class=\"mb-0 mt-1 fst-italic\">\"").concat(f.frase, "\"</p>\n            </li>\n        ");
  });
  html += "</ul>";
  contenedor.innerHTML = html;
} // Búsqueda avanzada por año - Sección 6


function buscarPorAnio() {
  var inputInicio = document.getElementById("anio-inicio");
  var inputFin = document.getElementById("anio-fin");
  var zonaError = document.getElementById("error-busqueda-avanzada");
  var zonaResultados = document.getElementById("resultados-busqueda-avanzada");
  zonaError.innerHTML = "";
  zonaResultados.innerHTML = "";
  var anioInicio = parseInt(inputInicio.value);
  var anioFin = parseInt(inputFin.value);

  if (!inputInicio.value || !inputFin.value) {
    mostrarError("error-busqueda-avanzada", "Debes rellenar ambos campos de año.");
    return;
  }

  if (isNaN(anioInicio) || isNaN(anioFin)) {
    mostrarError("error-busqueda-avanzada", "Introduce años numéricos válidos.");
    return;
  }

  if (anioInicio > anioFin) {
    mostrarError("error-busqueda-avanzada", "El año inicial no puede ser mayor que el año final.");
    return;
  }

  var filtrados = todosLosPersonajes.filter(function (p) {
    return p.yearOfBirth >= anioInicio && p.yearOfBirth <= anioFin;
  });

  if (filtrados.length === 0) {
    zonaResultados.innerHTML = '<div class="alert alert-info">No se encontraron personajes en ese rango de años.</div>';
    return;
  }

  var grupos = {};
  filtrados.forEach(function (p) {
    var casa = p.house || "Sin casa";
    if (!grupos[casa]) grupos[casa] = {
      vivos: [],
      muertos: []
    };

    if (p.alive) {
      grupos[casa].vivos.push(p);
    } else {
      grupos[casa].muertos.push(p);
    }
  });
  var html = '<div class="accordion" id="acordeon-avanzado">';
  var indice = 0;

  for (var casa in grupos) {
    var subgrupos = grupos[casa];
    var total = subgrupos.vivos.length + subgrupos.muertos.length;
    var primerAbierto = indice === 0;
    html += "\n            <div class=\"accordion-item\">\n                <h2 class=\"accordion-header\">\n                    <button class=\"accordion-button ".concat(primerAbierto ? "" : "collapsed", "\" type=\"button\"\n                        data-bs-toggle=\"collapse\" data-bs-target=\"#grupo-").concat(indice, "\">\n                        ").concat(casa, " \u2014 ").concat(total, " personaje(s)\n                    </button>\n                </h2>\n                <div id=\"grupo-").concat(indice, "\" class=\"accordion-collapse collapse ").concat(primerAbierto ? "show" : "", "\">\n                    <div class=\"accordion-body\">\n                        ").concat(crearGrupoEstado("Vivos", subgrupos.vivos), "\n                        ").concat(crearGrupoEstado("Muertos", subgrupos.muertos), "\n                    </div>\n                </div>\n            </div>\n        ");
    indice++;
  }

  html += "</div>";
  zonaResultados.innerHTML = html;
}

function crearGrupoEstado(titulo, personajes) {
  if (personajes.length === 0) return "";
  var html = "<h6 class=\"fw-bold mt-2 mb-2\">".concat(titulo, " (").concat(personajes.length, ")</h6>");
  html += '<div class="row g-2 mb-3">';
  personajes.forEach(function (p) {
    var foto = p.image || "https://placehold.co/100x130?text=?";
    var estadoClase = p.alive ? "text-success" : "text-danger";
    var estadoTexto = p.alive ? "Vivo" : "Muerto";
    html += "\n            <div class=\"col-6 col-sm-4 col-md-3\">\n                <div class=\"card h-100\">\n                    <img src=\"".concat(foto, "\" class=\"card-img-top\" alt=\"").concat(p.name, "\" style=\"height: 130px; object-fit: cover;\">\n                    <div class=\"card-body p-2\">\n                        <p class=\"fw-bold small mb-1\">").concat(p.name, "</p>\n                        <p class=\"small mb-0\">G\xE9nero: ").concat(p.gender || "—", "</p>\n                        <p class=\"small mb-0\">Estado: <span class=\"").concat(estadoClase, "\">").concat(estadoTexto, "</span></p>\n                    </div>\n                </div>\n            </div>\n        ");
  });
  html += "</div>";
  return html;
} // Función auxiliar para mostrar errores con Bootstrap


function mostrarError(contenedorId, mensaje) {
  var contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  contenedor.innerHTML = "<div class=\"alert alert-danger\">".concat(mensaje, "</div>");
}