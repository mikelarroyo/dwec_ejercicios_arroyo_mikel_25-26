const API_URL = "https://hp-api.onrender.com/api/characters";

document.addEventListener("DOMContentLoaded", async () => {
    gestionarCookies();

    const formulario = document.getElementById("form-busqueda");
    const input = document.getElementById("input-busqueda");
    const tablaBody = document.getElementById("cuerpo-tabla");
    const tablaContenedor = document.getElementById("tabla-resultados");
    const zonaErrores = document.getElementById("mensajes-error");
    const loader = document.getElementById("loader");
    const contenedorTarjetas = document.getElementById("contenedor-personajes");

    let datos = [];

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
        }

        datos = await respuesta.json();
        cargarSeccionBienvenida(datos, loader, contenedorTarjetas);

    } catch (error) {
        const mensaje = error instanceof TypeError
            ? "Error de red: no se pudo conectar con la API. Comprueba tu conexión."
            : `Error al cargar los datos: ${error.message}`;

        mostrarError(zonaErrores, mensaje);

        if (loader) {
            loader.innerHTML = '<p class="text-danger mt-2">No se pudieron cargar los datos.</p>';
        }
    }

    cargarFavoritos();
    inicializarMapa();

    input.addEventListener("input", () => {
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, false);
    });

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, true);
    });
});

// ── Cookies (Ejercicio 2 – sessionStorage) ────────────────────────────────────

const gestionarCookies = () => {
    const banner = document.getElementById("aviso-cookies");
    const btnAceptar = document.getElementById("btn-aceptar-cookies");
    if (!banner || !btnAceptar) return;

    if (!sessionStorage.getItem("cookiesAceptadas")) {
        banner.classList.remove("d-none");
    }

    btnAceptar.addEventListener("click", () => {
        sessionStorage.setItem("cookiesAceptadas", "true");
        banner.classList.add("d-none");
    });
};

// ── Errores ───────────────────────────────────────────────────────────────────

const mostrarError = (contenedor, mensaje) => {
    const div = document.createElement("div");
    div.className = "alert alert-danger alert-dismissible fade show mt-2";
    div.role = "alert";
    div.innerHTML = `${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>`;
    contenedor.appendChild(div);
};

// ── Buscador ──────────────────────────────────────────────────────────────────

const realizarBusqueda = (datos, input, tablaBody, tablaContenedor, zonaErrores, esSubmit) => {
    zonaErrores.innerHTML = "";
    tablaBody.innerHTML = "";
    tablaContenedor.hidden = true;

    const texto = input.value.trim().toLowerCase();

    if (texto === "") {
        if (esSubmit) {
            mostrarError(zonaErrores, "El campo de búsqueda no puede estar vacío.");
        }
        return;
    }

    if (datos.length === 0) {
        mostrarError(zonaErrores, "No hay datos disponibles. Comprueba tu conexión e intenta recargar la página.");
        return;
    }

    const filtrados = datos.filter((p) => p.name.toLowerCase().includes(texto));

    if (filtrados.length === 0) {
        mostrarError(zonaErrores, `No se encontraron personajes con el nombre "${texto}".`);
        return;
    }

    tablaContenedor.hidden = false;

    filtrados.forEach((p) => {
        const fila = document.createElement("tr");

        const celdaFoto = document.createElement("td");
        if (p.image) {
            const img = document.createElement("img");
            img.src = p.image;
            img.alt = p.name;
            img.width = 50;
            img.height = 50;
            img.style.objectFit = "cover";
            img.className = "img-thumbnail rounded";
            celdaFoto.appendChild(img);
        } else {
            celdaFoto.innerHTML = '<span class="text-muted small">Sin foto</span>';
        }

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = p.name;

        const celdaCasa = document.createElement("td");
        celdaCasa.textContent = p.house || "Sin casa";

        const celdaAccion = document.createElement("td");
        const btnFav = document.createElement("button");
        actualizarBotonFavorito(btnFav, p);
        btnFav.addEventListener("click", () => {
            toggleFavorito(p);
            actualizarBotonFavorito(btnFav, p);
            cargarFavoritos();
        });
        celdaAccion.appendChild(btnFav);

        fila.append(celdaFoto, celdaNombre, celdaCasa, celdaAccion);
        tablaBody.appendChild(fila);
    });
};

// ── Bienvenida ────────────────────────────────────────────────────────────────

const cargarSeccionBienvenida = (todos, loader, contenedor) => {
    if (!contenedor) return;
    if (loader) loader.style.display = "block";
    contenedor.innerHTML = "";

    setTimeout(() => {
        if (loader) loader.style.display = "none";

        const casas = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
        let html = "";

        casas.forEach((casa) => {
            const grupo = todos.filter((p) => p.house === casa);
            const aleatorios = grupo.sort(() => 0.5 - Math.random()).slice(0, 2);

            aleatorios.forEach((p) => {
                const foto = p.image || "https://placehold.co/300x200?text=Sin+foto";
                html += `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="card h-100 shadow-sm">
                            <img src="${foto}"
                                class="card-img-top"
                                style="height:200px;object-fit:cover;"
                                alt="${p.name}">
                            <div class="card-body">
                                <h5 class="card-title text-success">${p.name}</h5>
                                <ul class="list-unstyled small mb-0">
                                    <li><strong>Casa:</strong> ${p.house || "Sin casa"}</li>
                                    <li><strong>Especie:</strong> ${p.species || "Desconocida"}</li>
                                    <li><strong>Patronus:</strong> ${p.patronus || "Desconocido"}</li>
                                    <li><strong>Año:</strong> ${p.yearOfBirth || "Desconocido"}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });
        });

        contenedor.innerHTML = html;
    }, 2000);
};

// ── Favoritos (Ejercicio 2 – localStorage) ────────────────────────────────────

const getFavoritos = () => JSON.parse(localStorage.getItem("hp_favoritos")) || [];

const saveFavoritos = (favs) => localStorage.setItem("hp_favoritos", JSON.stringify(favs));

const esFavorito = (id) => getFavoritos().some((f) => f.id === id);

const actualizarBotonFavorito = (btn, personaje) => {
    if (esFavorito(personaje.id)) {
        btn.textContent = "★ Quitar favorito";
        btn.className = "btn btn-sm btn-warning";
    } else {
        btn.textContent = "☆ Marcar como favorito";
        btn.className = "btn btn-sm btn-outline-warning";
    }
};

const toggleFavorito = (personaje) => {
    let favs = getFavoritos();
    if (esFavorito(personaje.id)) {
        favs = favs.filter((f) => f.id !== personaje.id);
    } else {
        favs.push({
            id: personaje.id,
            name: personaje.name,
            house: personaje.house || "Sin casa",
            species: personaje.species || "",
            image: personaje.image || "",
        });
    }
    saveFavoritos(favs);
};

const cargarFavoritos = () => {
    const contenedor = document.getElementById("lista-favoritos");
    if (!contenedor) return;

    const favs = getFavoritos();
    contenedor.innerHTML = "";

    if (favs.length === 0) {
        contenedor.innerHTML = `
            <p class="text-muted text-center">
                No tienes personajes favoritos aún. Búscalos y márcalos con
                <strong>☆ Marcar como favorito</strong>.
            </p>`;
        return;
    }

    const lista = document.createElement("ul");
    lista.className = "list-group";

    favs.forEach((p) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2";

        const infoDiv = document.createElement("div");
        infoDiv.className = "d-flex align-items-center gap-3";
        infoDiv.innerHTML = `
            ${p.image
                ? `<img src="${p.image}" width="50" height="50"
                       style="object-fit:cover;" class="img-thumbnail rounded"
                       alt="${p.name}">`
                : ""}
            <div>
                <strong>${p.name}</strong><br>
                <small class="text-muted">${p.house} · ${p.species}</small>
            </div>
        `;

        const btnQuitar = document.createElement("button");
        btnQuitar.className = "btn btn-sm btn-outline-danger";
        btnQuitar.textContent = "Quitar";
        btnQuitar.addEventListener("click", () => {
            saveFavoritos(getFavoritos().filter((f) => f.id !== p.id));
            cargarFavoritos();
        });

        item.append(infoDiv, btnQuitar);
        lista.appendChild(item);
    });

    contenedor.appendChild(lista);
};

// ── Mapa (Ejercicio 2 – Leaflet + Geolocation API) ───────────────────────────

const inicializarMapa = () => {
    const contenedorMapa = document.getElementById("mapa");
    if (!contenedorMapa || typeof L === "undefined") return;

    // Actualiza estas coordenadas con las del IES
    const latIES = 43.2630;
    const lngIES = -2.9350;

    const mapa = L.map("mapa").setView([latIES, lngIES], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(mapa);

    L.marker([latIES, lngIES])
        .addTo(mapa)
        .bindPopup("<strong>IES</strong><br>Centro educativo")
        .openPopup();

    const msgGeo = document.getElementById("msg-geolocalizacion");

    if (!navigator.geolocation) {
        if (msgGeo) msgGeo.textContent = "Tu navegador no soporta geolocalización.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            L.marker([latitude, longitude])
                .addTo(mapa)
                .bindPopup("Tu ubicación actual");
            if (msgGeo) msgGeo.textContent = "Se ha detectado tu ubicación aproximada.";
        },
        (err) => {
            if (!msgGeo) return;
            if (err.code === 1) msgGeo.textContent = "Has denegado el acceso a tu ubicación.";
            else if (err.code === 2) msgGeo.textContent = "No se pudo determinar tu posición.";
            else if (err.code === 3) msgGeo.textContent = "Se agotó el tiempo para obtener tu ubicación.";
            else msgGeo.textContent = "No se pudo obtener tu ubicación.";
        }
    );
};
