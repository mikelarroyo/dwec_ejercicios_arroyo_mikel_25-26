// dwec_t05p02_arroyo_mikel/js/ejercicio01_dom.js

document.addEventListener("DOMContentLoaded", () => {
    const tienda = Tienda.getInstancia("Mi Librería DWEC");
    tienda.cargarDatosPrueba(); 

    const inputBusqueda = document.getElementById("inputBusqueda");
    
    // Renderizado inicial
    renderizarTabla(tienda.libros.listadoLibros);

    // Buscador en tiempo real
    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", (e) => {
            const termino = e.target.value.toLowerCase();
            const filtrados = tienda.libros.listadoLibros.filter(l => 
                l.titulo.toLowerCase().includes(termino)
            );
            renderizarTabla(filtrados);
        });
    }
});

function renderizarTabla(libros) {
    const tbody = document.querySelector("#tablaLibros tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (libros.length === 0) {
        tbody.innerHTML = "<tr><td colspan='8' class='text-center'>No hay coincidencias</td></tr>";
        return;
    }

    const librosOrdenados = libros.toSorted((a, b) => a.titulo.localeCompare(b.titulo));

    librosOrdenados.forEach(libro => {
        const fila = document.createElement("tr");
        const esEbook = libro instanceof Ebook;
        const tipoTexto = esEbook ? 'Ebook' : 'Papel';
        const stockTexto = !esEbook ? libro.stock : 'N/A';

        fila.innerHTML = `
            <td>${libro.isbn}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autores.map(a => a.nombreCompleto).join(", ")}</td>
            <td>${libro.genero}</td>
            <td>${libro.precio.toFixed(2)}€</td>
            <td>${tipoTexto}</td>
            <td>${stockTexto}</td>
            <td><button class="btn btn-info btn-sm" onclick="verDetalles(${libro.isbn})">Ver Detalles</button></td>
        `;
        tbody.appendChild(fila);
    });
} 


function verDetalles(isbn) {
    const tienda = Tienda.getInstancia();
    const libro = tienda.libros.listadoLibros.find(l => l.isbn == isbn);

    if (!libro) return;

    const modalContenido = document.getElementById("modalContenido");
    const modalTitulo = document.getElementById("modalTitulo");

    modalTitulo.innerText = libro.titulo;
    let html = `
        <p><strong>ISBN:</strong> ${libro.isbn}</p>
        <p><strong>Género:</strong> ${libro.genero}</p>
        <p><strong>Precio:</strong> ${libro.precio.toFixed(2)}€</p>
        <p><strong>Autores:</strong> ${libro.autores.map(a => a.nombreCompleto).join(", ")}</p>
        <hr>
    `;

    if (libro instanceof Ebook) {
        html += `
            <p><span class="badge bg-info">Formato Digital</span></p>
            <p><strong>Tamaño:</strong> ${libro.tamanioArchivo} MB</p>
            <p><strong>Formato:</strong> ${libro.formato}</p>
        `;
    } else if (libro instanceof LibroPapel) {
        html += `
            <p><span class="badge bg-warning text-dark">Formato Papel</span></p>
            <p><strong>Stock disponible:</strong> ${libro.stock}</p>
            <p><strong>Dimensiones:</strong> ${libro.dimensiones}</p>
            <p><strong>Peso:</strong> ${libro.peso} kg</p>
        `;
    }

    modalContenido.innerHTML = html;
    const elModal = document.getElementById('modalDetalles');
    const miModal = new bootstrap.Modal(elModal);
    miModal.show();
}