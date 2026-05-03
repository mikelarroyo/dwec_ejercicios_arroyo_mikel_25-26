const API_CASA_URL = "https://hp-api.onrender.com/api/characters/house/";
const API_TODOS_URL = "https://hp-api.onrender.com/api/characters";
const API_PERSONAJE_URL = "https://hp-api.onrender.com/api/character/";
const KEY_FRASES = "hp_frases";

let personajeSeleccionado = null;
let modalInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    const selectCasa = document.getElementById("select-casa");
    const ordenFrases = document.getElementById("orden-frases");

    selectCasa.addEventListener("change", cargarPersonajesDeCasa);
    ordenFrases.addEventListener("change", renderFrasesGuardadas);

    configurarModal();
    renderFrasesGuardadas();
});

// ── Sección 1: cargar personajes de la casa seleccionada ──────────────────────

const cargarPersonajesDeCasa = async () => {
    const selectCasa = document.getElementById("select-casa");
    const lista = document.getElementById("lista-personajes");
    const loader = document.getElementById("loader-personajes");
    const errorDiv = document.getElementById("error-casa");
    const valor = selectCasa.value;

    lista.innerHTML = "";
    errorDiv.innerHTML = "";
    if (!valor) return;

    loader.classList.remove("d-none");

    try {
        let personajes;

        if (valor === "SIN_CASA") {
            const res = await fetch(API_TODOS_URL);
            if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
            const todos = await res.json();
            personajes = todos.filter((p) => !p.house);
        } else {
            const res = await fetch(API_CASA_URL + valor.toLowerCase());
            if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
            personajes = await res.json();
        }

        loader.classList.add("d-none");

        if (personajes.length === 0) {
            lista.innerHTML = '<p class="text-muted">No se encontraron personajes para esta casa.</p>';
            return;
        }

        personajes.forEach((p) => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    ${p.image
                        ? `<img src="${p.image}" class="card-img-top"
                               style="height:150px;object-fit:cover;" alt="${p.name}">`
                        : `<div class="bg-secondary d-flex align-items-center justify-content-center"
                               style="height:150px;">
                               <span class="text-white small">Sin foto</span>
                           </div>`}
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title mb-1">${p.name}</h6>
                        <p class="card-text small text-muted mb-3">${p.house || "Sin casa"}</p>
                        <button class="btn btn-sm btn-primary mt-auto btn-anadir-frases"
                            data-id="${p.id}">
                            Añadir frases
                        </button>
                    </div>
                </div>
            `;
            col.querySelector(".btn-anadir-frases").addEventListener("click", () => abrirModal(p.id));
            lista.appendChild(col);
        });

    } catch (error) {
        loader.classList.add("d-none");
        mostrarAlerta(errorDiv,
            error instanceof TypeError
                ? "Error de red al cargar los personajes. Comprueba tu conexión."
                : `Error al cargar personajes: ${error.message}`,
            "danger"
        );
    }
};

// ── Sección 2: modal con info del personaje y gestión de frases ───────────────

const abrirModal = async (personajeId) => {
    const infoDiv = document.getElementById("modal-info-personaje");
    const loaderModal = document.getElementById("modal-loader");
    const titulo = document.getElementById("modal-frases-titulo");
    const inputFrase = document.getElementById("input-nueva-frase");
    const errorFrase = document.getElementById("modal-error-frase");

    // Reset modal state
    infoDiv.innerHTML = "";
    infoDiv.appendChild(loaderModal);
    loaderModal.classList.remove("d-none");
    titulo.textContent = "Cargando personaje...";
    inputFrase.value = "";
    errorFrase.textContent = "";
    personajeSeleccionado = null;

    if (!modalInstance) {
        modalInstance = new bootstrap.Modal(document.getElementById("modal-frases"));
    }
    modalInstance.show();

    try {
        const res = await fetch(API_PERSONAJE_URL + personajeId);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

        const data = await res.json();
        const p = Array.isArray(data) ? data[0] : data;
        personajeSeleccionado = p;

        loaderModal.classList.add("d-none");
        titulo.textContent = `Frases de ${p.name}`;

        infoDiv.innerHTML = `
            ${p.image
                ? `<img src="${p.image}" width="80" height="80"
                       style="object-fit:cover;" class="img-thumbnail rounded"
                       alt="${p.name}">`
                : ""}
            <div>
                <strong class="fs-5">${p.name}</strong><br>
                <small class="text-muted">
                    ${p.house || "Sin casa"} &middot; ${p.species || ""}
                    ${p.yearOfBirth ? " &middot; Nacido en " + p.yearOfBirth : ""}
                </small>
            </div>
        `;

        renderFrasesEnModal(p.id);

    } catch (error) {
        loaderModal.classList.add("d-none");
        infoDiv.innerHTML = `
            <span class="text-danger">
                ${error instanceof TypeError
                    ? "Error de red al cargar los datos del personaje."
                    : `Error: ${error.message}`}
            </span>
        `;
    }
};

const configurarModal = () => {
    const btnGuardar = document.getElementById("btn-guardar-frase");
    const btnNueva = document.getElementById("btn-nueva-frase");
    const inputFrase = document.getElementById("input-nueva-frase");
    const errorFrase = document.getElementById("modal-error-frase");

    btnGuardar.addEventListener("click", () => {
        if (!personajeSeleccionado) return;

        const frase = inputFrase.value.trim();
        errorFrase.textContent = "";

        if (!frase) {
            errorFrase.textContent = "La frase no puede estar vacía ni contener solo espacios.";
            return;
        }

        const frasesExistentes = getFrasesPersonaje(personajeSeleccionado.id);
        const duplicada = frasesExistentes.some(
            (f) => f.frase.toLowerCase() === frase.toLowerCase()
        );

        if (duplicada) {
            errorFrase.textContent = "Esta frase ya está guardada para este personaje.";
            return;
        }

        guardarFrase(personajeSeleccionado.id, personajeSeleccionado.name, frase);
        inputFrase.value = "";
        renderFrasesEnModal(personajeSeleccionado.id);
        renderFrasesGuardadas();
    });

    // Permite añadir múltiples frases seguidas
    btnNueva.addEventListener("click", () => {
        inputFrase.value = "";
        errorFrase.textContent = "";
        inputFrase.focus();
    });

    // Guardar también con Enter
    inputFrase.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            btnGuardar.click();
        }
    });

    document.getElementById("modal-frases").addEventListener("hidden.bs.modal", () => {
        personajeSeleccionado = null;
        inputFrase.value = "";
        errorFrase.textContent = "";
    });
};

// ── localStorage: frases ──────────────────────────────────────────────────────

const todasLasFrases = () => JSON.parse(localStorage.getItem(KEY_FRASES)) || [];

const getFrasesPersonaje = (id) => todasLasFrases().filter((f) => f.personajeId === id);

const guardarFrase = (personajeId, personajeName, frase) => {
    const todas = todasLasFrases();
    todas.push({
        personajeId,
        personajeName,
        frase,
        fecha: new Date().toISOString(),
    });
    localStorage.setItem(KEY_FRASES, JSON.stringify(todas));
};

// ── Render frases en el modal ─────────────────────────────────────────────────

const renderFrasesEnModal = (personajeId) => {
    const div = document.getElementById("modal-frases-existentes");
    const frases = getFrasesPersonaje(personajeId);

    if (frases.length === 0) {
        div.innerHTML = '<p class="text-muted small">No hay frases guardadas para este personaje aún.</p>';
        return;
    }

    div.innerHTML = `
        <h6 class="text-muted mb-2">Frases guardadas (${frases.length}):</h6>
        <ul class="list-group list-group-flush mb-3">
            ${frases.map((f) => `
                <li class="list-group-item py-2 small">
                    <em>"${f.frase}"</em>
                    <span class="text-muted ms-2 fst-normal">
                        &mdash; ${new Date(f.fecha).toLocaleString("es-ES")}
                    </span>
                </li>
            `).join("")}
        </ul>
    `;
};

// ── Sección 3: listado general de frases guardadas ────────────────────────────

const renderFrasesGuardadas = () => {
    const contenedor = document.getElementById("contenedor-frases-guardadas");
    const orden = document.getElementById("orden-frases").value;

    const todas = todasLasFrases().sort((a, b) => {
        const diff = new Date(a.fecha) - new Date(b.fecha);
        return orden === "desc" ? -diff : diff;
    });

    if (todas.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-info">
                No hay frases guardadas. Selecciona una casa, elige un personaje y añade sus frases famosas.
            </div>
        `;
        return;
    }

    contenedor.innerHTML = `
        <ul class="list-group">
            ${todas.map((f) => `
                <li class="list-group-item">
                    <div class="d-flex justify-content-between flex-wrap gap-1">
                        <strong>${f.personajeName}</strong>
                        <small class="text-muted">
                            ${new Date(f.fecha).toLocaleString("es-ES")}
                        </small>
                    </div>
                    <p class="mb-0 mt-1 fst-italic">"${f.frase}"</p>
                </li>
            `).join("")}
        </ul>
    `;
};

// ── Utilidad ──────────────────────────────────────────────────────────────────

const mostrarAlerta = (contenedor, mensaje, tipo = "danger") => {
    contenedor.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
};
