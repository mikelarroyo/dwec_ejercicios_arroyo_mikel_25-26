const API_URL = "https://hp-api.onrender.com/api/characters";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-busqueda-avanzada").addEventListener("submit", async (e) => {
        e.preventDefault();
        await buscarPorAnho();
    });
});

// ── Búsqueda y validación ─────────────────────────────────────────────────────

const buscarPorAnho = async () => {
    const anhoIni = document.getElementById("anho-inicio").value.trim();
    const anhoFin = document.getElementById("anho-fin").value.trim();
    const zonaErrores = document.getElementById("errores-avanzada");
    const resultados = document.getElementById("resultados-avanzada");

    zonaErrores.innerHTML = "";
    resultados.innerHTML = "";

    if (!anhoIni || !anhoFin) {
        mostrarError(zonaErrores, "Ambos campos (año inicial y año final) son obligatorios.");
        return;
    }

    const ini = parseInt(anhoIni, 10);
    const fin = parseInt(anhoFin, 10);

    if (isNaN(ini) || isNaN(fin)) {
        mostrarError(zonaErrores, "Los años deben ser valores numéricos válidos.");
        return;
    }

    if (ini > fin) {
        mostrarError(zonaErrores, "El año inicial no puede ser mayor que el año final.");
        return;
    }

    resultados.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Buscando...</span>
            </div>
            <p class="text-muted mt-2 small">Buscando personajes...</p>
        </div>
    `;

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        const datos = await res.json();

        const filtrados = datos.filter((p) => {
            const año = parseInt(p.yearOfBirth, 10);
            return !isNaN(año) && año >= ini && año <= fin;
        });

        resultados.innerHTML = "";

        if (filtrados.length === 0) {
            resultados.innerHTML = `
                <div class="alert alert-warning">
                    No se encontraron personajes con año de nacimiento entre
                    <strong>${ini}</strong> y <strong>${fin}</strong>.
                </div>
            `;
            return;
        }

        const totalEl = document.createElement("p");
        totalEl.className = "text-muted mb-3";
        totalEl.textContent = `${filtrados.length} personaje(s) encontrado(s).`;
        resultados.appendChild(totalEl);

        renderResultados(filtrados, resultados);

    } catch (error) {
        resultados.innerHTML = "";
        const mensaje = error instanceof TypeError
            ? "Error de red: no se pudo conectar con la API. Comprueba tu conexión."
            : `Error al obtener los datos: ${error.message}`;
        mostrarError(zonaErrores, mensaje);
    }
};

// ── Renderizado en acordeón ───────────────────────────────────────────────────

const CASAS_ORDEN = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

const renderResultados = (personajes, contenedor) => {
    const grupos = {};

    personajes.forEach((p) => {
        const casa = p.house || "Sin casa";
        if (!grupos[casa]) grupos[casa] = [];
        grupos[casa].push(p);
    });

    // Casas principales primero, luego las restantes (incluyendo "Sin casa")
    const casasOrdenadas = [
        ...CASAS_ORDEN.filter((c) => grupos[c]),
        ...Object.keys(grupos).filter((c) => !CASAS_ORDEN.includes(c)),
    ];

    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.id = "accordion-resultados";

    casasOrdenadas.forEach((casa, idx) => {
        const personajesDeCasa = grupos[casa];
        const vivos = personajesDeCasa.filter((p) => p.alive === true);
        const muertos = personajesDeCasa.filter((p) => p.alive !== true);

        const item = document.createElement("div");
        item.className = "accordion-item";
        item.innerHTML = `
            <h2 class="accordion-header" id="heading-${idx}">
                <button class="accordion-button collapsed fw-semibold" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapse-${idx}"
                    aria-expanded="false" aria-controls="collapse-${idx}">
                    ${casa}
                    <span class="badge bg-secondary ms-2 fw-normal">
                        ${personajesDeCasa.length} personaje(s)
                    </span>
                </button>
            </h2>
            <div id="collapse-${idx}" class="accordion-collapse collapse"
                aria-labelledby="heading-${idx}">
                <div class="accordion-body">
                    ${renderGrupoVidaMuerte(vivos, muertos)}
                </div>
            </div>
        `;

        accordion.appendChild(item);
    });

    contenedor.appendChild(accordion);
};

const renderGrupoVidaMuerte = (vivos, muertos) => `
    <h6 class="text-success mb-2">
        Vivos
        <span class="badge bg-success ms-1">${vivos.length}</span>
    </h6>
    ${vivos.length > 0 ? renderPersonajes(vivos) : '<p class="text-muted small mb-3">Ninguno en este rango.</p>'}
    <hr class="my-3">
    <h6 class="text-danger mb-2">
        Muertos
        <span class="badge bg-danger ms-1">${muertos.length}</span>
    </h6>
    ${muertos.length > 0 ? renderPersonajes(muertos) : '<p class="text-muted small">Ninguno en este rango.</p>'}
`;

const renderPersonajes = (lista) => `
    <div class="row g-2 mb-3">
        ${lista.map((p) => {
            const genero = p.gender === "male" ? "Masculino"
                : p.gender === "female" ? "Femenino"
                : "Desconocido";
            const estadoBadge = p.alive ? "bg-success" : "bg-danger";
            const estadoTexto = p.alive ? "Vivo" : "Muerto";
            return `
                <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                    <div class="card text-center h-100 shadow-sm">
                        ${p.image
                            ? `<img src="${p.image}" class="card-img-top"
                                   style="height:80px;object-fit:cover;" alt="${p.name}">`
                            : `<div class="bg-secondary d-flex align-items-center justify-content-center"
                                    style="height:80px;">
                                   <span class="text-white" style="font-size:.7rem;">Sin foto</span>
                               </div>`}
                        <div class="card-body p-2">
                            <p class="card-text fw-semibold mb-1" style="font-size:.8rem;">
                                ${p.name}
                            </p>
                            <p class="card-text text-muted mb-1" style="font-size:.75rem;">
                                ${genero}
                            </p>
                            <span class="badge ${estadoBadge}" style="font-size:.7rem;">
                                ${estadoTexto}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join("")}
    </div>
`;

// ── Utilidad ──────────────────────────────────────────────────────────────────

const mostrarError = (contenedor, mensaje) => {
    const div = document.createElement("div");
    div.className = "alert alert-danger alert-dismissible fade show";
    div.innerHTML = `${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    contenedor.appendChild(div);
};
