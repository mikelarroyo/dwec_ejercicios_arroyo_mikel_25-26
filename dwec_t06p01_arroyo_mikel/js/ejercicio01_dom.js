let todosLosPersonajes = [];


document.addEventListener("DOMContentLoaded", async () => {

    mostrarAvisoCookies();

    try {
        const respuesta = await fetch("https://hp-api.onrender.com/api/characters");
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
        todosLosPersonajes = await respuesta.json();
        cargarBienvenida();
    } catch (error) {
        mostrarError("error-buscador", `No se pudo conectar con la API: ${error.message}`);
        document.getElementById("loader-bienvenida").innerHTML =
            '<p class="text-danger">Error al cargar personajes. Comprueba tu conexión.</p>';
    }

    configurarBuscador();
    actualizarSeccionFavoritos();
    iniciarMapa();
    configurarSeccionFrases();
    document.getElementById("btn-buscar-anio").addEventListener("click", buscarPorAnio);
});


// Cookies - Ejercicio 2, Función 1
function mostrarAvisoCookies() {
    if (sessionStorage.getItem("cookiesAceptadas") === "si") return;

    const banner = document.getElementById("aviso-cookies");
    banner.classList.remove("d-none");

    document.getElementById("btn-aceptar-cookies").addEventListener("click", () => {
        sessionStorage.setItem("cookiesAceptadas", "si");
        banner.classList.add("d-none");
    });
}


// Buscador - Sección 1
function configurarBuscador() {
    const formulario = document.getElementById("form-busqueda");
    const inputBusqueda = document.getElementById("input-busqueda");

    inputBusqueda.addEventListener("input", () => {
        buscarPersonajes(false);
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        buscarPersonajes(true);
    });
}

function buscarPersonajes(esSubmit) {
    const input = document.getElementById("input-busqueda");
    const zonaError = document.getElementById("error-buscador");
    const tabla = document.getElementById("tabla-buscador");
    const cuerpoTabla = document.getElementById("cuerpo-tabla-buscador");

    zonaError.innerHTML = "";
    cuerpoTabla.innerHTML = "";
    tabla.classList.add("d-none");

    const texto = input.value.trim().toLowerCase();

    if (texto === "") {
        if (esSubmit) mostrarError("error-buscador", "El campo de búsqueda no puede estar vacío.");
        return;
    }

    const resultados = todosLosPersonajes.filter(p => p.name.toLowerCase().includes(texto));

    if (resultados.length === 0) {
        mostrarError("error-buscador", "No se encontraron personajes con ese nombre.");
        return;
    }

    tabla.classList.remove("d-none");

    resultados.forEach(personaje => {
        const fila = document.createElement("tr");

        const celdaFoto = document.createElement("td");
        if (personaje.image) {
            const img = document.createElement("img");
            img.src = personaje.image;
            img.alt = personaje.name;
            img.style.width = "50px";
            img.style.height = "65px";
            img.style.objectFit = "cover";
            celdaFoto.appendChild(img);
        } else {
            celdaFoto.textContent = "Sin foto";
        }

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = personaje.name;
        celdaNombre.className = "align-middle";

        const celdaCasa = document.createElement("td");
        celdaCasa.textContent = personaje.house || "Sin casa";
        celdaCasa.className = "align-middle";

        const celdaAccion = document.createElement("td");
        celdaAccion.className = "align-middle";

        const botonFav = document.createElement("button");
        botonFav.className = "btn btn-sm";

        const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        const esFavorito = favoritos.some(f => f.id === personaje.id);

        if (esFavorito) {
            botonFav.textContent = "En favoritos";
            botonFav.classList.add("btn-warning");
        } else {
            botonFav.textContent = "Marcar como favorito";
            botonFav.classList.add("btn-outline-warning");
        }

        botonFav.addEventListener("click", () => toggleFavorito(personaje, botonFav));

        celdaAccion.appendChild(botonFav);
        fila.appendChild(celdaFoto);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCasa);
        fila.appendChild(celdaAccion);
        cuerpoTabla.appendChild(fila);
    });
}


// Bienvenida - Sección 2
function cargarBienvenida() {
    const loader = document.getElementById("loader-bienvenida");
    const contenedor = document.getElementById("contenedor-bienvenida");

    setTimeout(() => {
        loader.classList.add("d-none");

        const casas = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
        let html = "";

        casas.forEach(casa => {
            const personajesDeCasa = todosLosPersonajes.filter(p => p.house === casa);
            const aleatorios = personajesDeCasa.sort(() => 0.5 - Math.random()).slice(0, 2);

            aleatorios.forEach(p => {
                const foto = p.image || "https://placehold.co/200x200?text=Sin+foto";
                html += `
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card h-100 shadow-sm">
                            <img src="${foto}" class="card-img-top" alt="${p.name}" style="height: 200px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${p.name}</h5>
                                <p class="card-text mb-1"><strong>Casa:</strong> ${p.house}</p>
                                <p class="card-text mb-1"><strong>Especie:</strong> ${p.species || "Desconocida"}</p>
                                <p class="card-text mb-1"><strong>Patronus:</strong> ${p.patronus || "Desconocido"}</p>
                                <p class="card-text mb-1"><strong>Año nac.:</strong> ${p.yearOfBirth || "Desconocido"}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        });

        contenedor.innerHTML = html;

    }, 2000);
}


// Favoritos - Sección 3
function toggleFavorito(personaje, boton) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const yaEsFavorito = favoritos.some(f => f.id === personaje.id);

    if (yaEsFavorito) {
        favoritos = favoritos.filter(f => f.id !== personaje.id);
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
    const contenedor = document.getElementById("lista-favoritos");
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

    if (favoritos.length === 0) {
        contenedor.innerHTML = '<p class="text-muted text-center">No tienes personajes favoritos todavía.</p>';
        return;
    }

    let html = '<ul class="list-group">';
    favoritos.forEach(p => {
        const foto = p.image || "https://placehold.co/50x65?text=?";
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-3">
                    <img src="${foto}" width="50" height="65" style="object-fit: cover; border-radius: 4px;" alt="${p.name}">
                    <div>
                        <strong>${p.name}</strong><br>
                        <small class="text-muted">${p.house || "Sin casa"} · ${p.species || "Desconocido"}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="eliminarFavorito('${p.id}')">Eliminar</button>
            </li>
        `;
    });
    html += "</ul>";
    contenedor.innerHTML = html;
}

function eliminarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    favoritos = favoritos.filter(f => f.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    actualizarSeccionFavoritos();
}


// Mapa y geolocalización - Sección 4
function iniciarMapa() {
    // IES Gregorio Prieto — Avda. de los Estudiantes S/N, Valdepeñas (Ciudad Real)
    const latIES = 38.7733;
    const lngIES = -3.3968;

    const mapa = L.map("mapa").setView([latIES, lngIES], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(mapa);

    L.marker([latIES, lngIES])
        .addTo(mapa)
        .bindPopup("<strong>IES Gregorio Prieto</strong><br>Valdepeñas, Ciudad Real")
        .openPopup();

    const msgGeo = document.getElementById("msg-geolocalizacion");

    if (!navigator.geolocation) {
        msgGeo.textContent = "Tu navegador no soporta geolocalización.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (posicion) => {
            const lat = posicion.coords.latitude;
            const lng = posicion.coords.longitude;
            L.marker([lat, lng]).addTo(mapa).bindPopup("Tu ubicación");
            msgGeo.textContent = `Tu ubicación detectada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        },
        () => {
            msgGeo.textContent = "No se pudo obtener tu ubicación (permiso denegado o no disponible).";
        }
    );
}


// Frases por personaje - Sección 5
function configurarSeccionFrases() {
    document.getElementById("select-casa").addEventListener("change", (e) => {
        mostrarPersonajesPorCasa(e.target.value);
    });
    document.getElementById("orden-frases").addEventListener("change", () => {
        actualizarListadoFrases();
    });
    actualizarListadoFrases();
}

function mostrarPersonajesPorCasa(casa) {
    const contenedor = document.getElementById("lista-personajes-frases");

    if (!casa) {
        contenedor.innerHTML = "";
        return;
    }

    let personajes;
    if (casa === "sin-casa") {
        personajes = todosLosPersonajes.filter(p => !p.house);
    } else {
        personajes = todosLosPersonajes.filter(p => p.house === casa);
    }

    if (personajes.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">No hay personajes para esta casa.</p>';
        return;
    }

    let html = '<ul class="list-group">';
    personajes.forEach(p => {
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${p.name}</span>
                <button class="btn btn-sm btn-primary"
                    onclick="abrirModalFrases('${p.id}', '${p.house || "sin-casa"}')">
                    Añadir frases
                </button>
            </li>
        `;
    });
    html += "</ul>";
    contenedor.innerHTML = html;
}

async function abrirModalFrases(personajeId, casaPersonaje) {
    const cuerpoModal = document.getElementById("cuerpo-modal-frases");
    const btnGuardar = document.getElementById("btn-guardar-frase");
    const btnNueva = document.getElementById("btn-nueva-frase");

    cuerpoModal.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2">Cargando datos del personaje...</p>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById("modal-frases"));
    modal.show();

    try {
        let url;
        if (casaPersonaje === "sin-casa") {
            url = "https://hp-api.onrender.com/api/characters";
        } else {
            url = `https://hp-api.onrender.com/api/characters/house/${casaPersonaje.toLowerCase()}`;
        }

        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

        const listaPersonajes = await respuesta.json();
        const personaje = listaPersonajes.find(p => p.id === personajeId);
        if (!personaje) throw new Error("Personaje no encontrado en la API");

        const foto = personaje.image || "https://placehold.co/90x110?text=?";

        cuerpoModal.innerHTML = `
            <div class="d-flex gap-3 mb-4">
                <img src="${foto}" width="90" height="110" style="object-fit: cover; border-radius: 8px;" alt="${personaje.name}">
                <div>
                    <h5 class="mb-1">${personaje.name}</h5>
                    <p class="mb-1 text-muted small">Casa: ${personaje.house || "Sin casa"}</p>
                    <p class="mb-1 text-muted small">Especie: ${personaje.species || "Desconocida"}</p>
                    <p class="mb-0 text-muted small">Año nac.: ${personaje.yearOfBirth || "Desconocido"}</p>
                </div>
            </div>
            <div id="frases-del-personaje" class="mb-3"></div>
            <div>
                <label class="form-label fw-bold">Escribe una frase famosa:</label>
                <textarea id="input-frase" class="form-control" rows="3" placeholder="Escribe aquí la frase..."></textarea>
                <div id="error-frase" class="text-danger mt-1 small"></div>
            </div>
        `;

        mostrarFrasesEnModal(personajeId, personaje.name);

        btnGuardar.onclick = () => guardarFrase(personajeId, personaje.name);
        btnNueva.onclick = () => {
            document.getElementById("input-frase").value = "";
            document.getElementById("error-frase").textContent = "";
            document.getElementById("input-frase").focus();
        };

    } catch (error) {
        cuerpoModal.innerHTML = `<div class="alert alert-danger">Error al cargar el personaje: ${error.message}</div>`;
    }
}

function mostrarFrasesEnModal(personajeId, nombrePersonaje) {
    const contenedor = document.getElementById("frases-del-personaje");
    if (!contenedor) return;

    const todasLasFrases = JSON.parse(localStorage.getItem("frases") || "[]");
    const frasesDelPersonaje = todasLasFrases.filter(f => f.personajeId === personajeId);

    if (frasesDelPersonaje.length === 0) {
        contenedor.innerHTML = '<p class="text-muted small">No hay frases guardadas para este personaje.</p>';
        return;
    }

    let html = `<p class="fw-bold small">Frases guardadas de ${nombrePersonaje}:</p>`;
    html += '<ul class="list-group list-group-flush mb-2">';
    frasesDelPersonaje.forEach(f => {
        const fecha = new Date(f.fecha).toLocaleString("es-ES");
        html += `
            <li class="list-group-item px-0">
                <p class="mb-1 fst-italic">"${f.frase}"</p>
                <small class="text-muted">Guardada el ${fecha}</small>
            </li>
        `;
    });
    html += "</ul>";
    contenedor.innerHTML = html;
}

function guardarFrase(personajeId, nombrePersonaje) {
    const inputFrase = document.getElementById("input-frase");
    const errorFrase = document.getElementById("error-frase");
    const frase = inputFrase.value.trim();

    if (!frase) {
        errorFrase.textContent = "La frase no puede estar vacía.";
        return;
    }

    const todasLasFrases = JSON.parse(localStorage.getItem("frases") || "[]");

    const duplicada = todasLasFrases.some(
        f => f.personajeId === personajeId && f.frase.toLowerCase() === frase.toLowerCase()
    );
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
    const contenedor = document.getElementById("listado-frases-guardadas");
    const orden = document.getElementById("orden-frases").value;
    let frases = JSON.parse(localStorage.getItem("frases") || "[]");

    if (frases.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">No hay frases guardadas todavía.</p>';
        return;
    }

    frases.sort((a, b) => {
        const diferencia = new Date(a.fecha) - new Date(b.fecha);
        return orden === "desc" ? -diferencia : diferencia;
    });

    let html = '<ul class="list-group">';
    frases.forEach(f => {
        const fecha = new Date(f.fecha).toLocaleString("es-ES");
        html += `
            <li class="list-group-item">
                <div class="d-flex justify-content-between">
                    <strong>${f.personajeNombre}</strong>
                    <small class="text-muted">${fecha}</small>
                </div>
                <p class="mb-0 mt-1 fst-italic">"${f.frase}"</p>
            </li>
        `;
    });
    html += "</ul>";
    contenedor.innerHTML = html;
}


// Búsqueda avanzada por año - Sección 6
function buscarPorAnio() {
    const inputInicio = document.getElementById("anio-inicio");
    const inputFin = document.getElementById("anio-fin");
    const zonaError = document.getElementById("error-busqueda-avanzada");
    const zonaResultados = document.getElementById("resultados-busqueda-avanzada");

    zonaError.innerHTML = "";
    zonaResultados.innerHTML = "";

    const anioInicio = parseInt(inputInicio.value);
    const anioFin = parseInt(inputFin.value);

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

    const filtrados = todosLosPersonajes.filter(p =>
        p.yearOfBirth >= anioInicio && p.yearOfBirth <= anioFin
    );

    if (filtrados.length === 0) {
        zonaResultados.innerHTML = '<div class="alert alert-info">No se encontraron personajes en ese rango de años.</div>';
        return;
    }

    const grupos = {};
    filtrados.forEach(p => {
        const casa = p.house || "Sin casa";
        if (!grupos[casa]) grupos[casa] = { vivos: [], muertos: [] };
        if (p.alive) {
            grupos[casa].vivos.push(p);
        } else {
            grupos[casa].muertos.push(p);
        }
    });

    let html = '<div class="accordion" id="acordeon-avanzado">';
    let indice = 0;

    for (let casa in grupos) {
        const subgrupos = grupos[casa];
        const total = subgrupos.vivos.length + subgrupos.muertos.length;
        const primerAbierto = indice === 0;

        html += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${primerAbierto ? "" : "collapsed"}" type="button"
                        data-bs-toggle="collapse" data-bs-target="#grupo-${indice}">
                        ${casa} — ${total} personaje(s)
                    </button>
                </h2>
                <div id="grupo-${indice}" class="accordion-collapse collapse ${primerAbierto ? "show" : ""}">
                    <div class="accordion-body">
                        ${crearGrupoEstado("Vivos", subgrupos.vivos)}
                        ${crearGrupoEstado("Muertos", subgrupos.muertos)}
                    </div>
                </div>
            </div>
        `;
        indice++;
    }

    html += "</div>";
    zonaResultados.innerHTML = html;
}

function crearGrupoEstado(titulo, personajes) {
    if (personajes.length === 0) return "";

    let html = `<h6 class="fw-bold mt-2 mb-2">${titulo} (${personajes.length})</h6>`;
    html += '<div class="row g-2 mb-3">';
    personajes.forEach(p => {
        const foto = p.image || "https://placehold.co/100x130?text=?";
        const estadoClase = p.alive ? "text-success" : "text-danger";
        const estadoTexto = p.alive ? "Vivo" : "Muerto";
        html += `
            <div class="col-6 col-sm-4 col-md-3">
                <div class="card h-100">
                    <img src="${foto}" class="card-img-top" alt="${p.name}" style="height: 130px; object-fit: cover;">
                    <div class="card-body p-2">
                        <p class="fw-bold small mb-1">${p.name}</p>
                        <p class="small mb-0">Género: ${p.gender || "—"}</p>
                        <p class="small mb-0">Estado: <span class="${estadoClase}">${estadoTexto}</span></p>
                    </div>
                </div>
            </div>
        `;
    });
    html += "</div>";
    return html;
}


// Función auxiliar para mostrar errores con Bootstrap
function mostrarError(contenedorId, mensaje) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    contenedor.innerHTML = `<div class="alert alert-danger">${mensaje}</div>`;
}
