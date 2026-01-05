// dwec_t05p02_arroyo_mikel/js/ejercicio01_tienda.js

class Tienda {
    static instancia = null;

    static getInstancia(nombreTienda) {
        if (Tienda.instancia === null) {
            Tienda.instancia = new Tienda(nombreTienda);
        }
        return Tienda.instancia;
    }

    #nombre;
    #libros;
    #autores;
    #clientes;
    #pedidos;
    #tiposEnvios;

    constructor(nombreTienda) {
        if (Tienda.instancia !== null) {
            throw new Error("Use Tienda.getInstancia()");
        }
        this.#nombre = nombreTienda.trim();
        this.#libros = new Libros();
        this.#autores = new Autores();
        this.#clientes = new Clientes();
        this.#pedidos = new Pedidos();
        this.#tiposEnvios = new TiposEnvios();
    }

    get libros() { return this.#libros; }
    get autores() { return this.#autores; }
    get clientes() { return this.#clientes; }
    get pedidos() { return this.#pedidos; }
    get tiposEnvios() { return this.#tiposEnvios; }

    cargarDatosPrueba() {
        // 1. Autores
        const autor1 = new Autor("Gabriel García Márquez");
        const autor2 = new Autor("Ray Bradbury");
        this.#autores.insertarAutores([autor1, autor2]);

        // 2. Libros
        const libro1 = new LibroPapel(1001, "Cien años de soledad", [autor1], "novela", 18.5, 0.4, "20x15x3", 10);
        const libro2 = new Ebook(1002, "Fahrenheit 451", [autor2], "ciencia ficcion", 8.99, 3.0, "epub");
        const libro3 = new LibroPapel(1003, "Crónicas Marcianas", [autor2], "ciencia ficcion", 12.0, 0.3, "20x14x2", 2);
        this.#libros.insertarLibros([libro1, libro2, libro3]);

        // 3. Tipos de Envío (Punto 4 del enunciado)
        const envio1 = new TipoEnvio("Estándar", 5, 10, 5.50);
        const envio2 = new TipoEnvio("Urgente", 2, 5, 9.50);
        this.#tiposEnvios.insertarTipos([envio1, envio2]);

        // 4. Cliente
        const cliente1 = new Cliente(12345678, "Ana García", "Calle Mayor 1");
        this.#clientes.insertarClientes([cliente1]);

        // 5. Relaciones Libro-Autor
        autor1.insertarLibro(libro1);
        autor2.insertarLibro(libro2);
        autor2.insertarLibro(libro3);

        // 6. Pedido de prueba inicial
        try {
            const pedido1 = new Pedido(cliente1);
            pedido1.insertarLibro(libro1, 1);
            pedido1.insertarLibro(libro2, 1);
            pedido1.calcularTotal();
            this.#pedidos.insertarPedido([pedido1]);
        } catch (error) {
            console.error("Error al crear pedidos de prueba:", error.message);
        }
    }

    // Página 1: Catálogo (Bootstrap + buscador)
    renderizarTablaCatalogo(terminoBusqueda = "") {
        const librosFiltrados = this.libros.listadoLibros.filter((libro) =>
            libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        if (librosFiltrados.length === 0) {
            return `<tr><td colspan="8" class="text-center text-danger">No se han encontrado coincidencias.</td></tr>`;
        }

        // Ordenado por título por defecto
        const librosOrdenados = librosFiltrados.toSorted((a, b) => a.titulo.localeCompare(b.titulo));

        return librosOrdenados.map((libro) => {
            const esEbook = libro instanceof Ebook;
            const autoresTexto = libro.autores.map((a) => a.nombreCompleto).join(", ");

            return `
            <tr>
                <td>${libro.isbn}</td>
                <td>${libro.titulo}</td>
                <td>${autoresTexto}</td>
                <td>${libro.genero}</td>
                <td>${libro.precio.toFixed(2)}€</td>
                <td>${esEbook ? "Ebook" : "Papel"}</td>
                <td>${!esEbook ? libro.stock : "N/A"}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="verDetalles(${libro.isbn})">
                        Ver Detalles
                    </button>
                </td>
            </tr>`;
        }).join("");
    }

    obtenerDetallesLibroHTML(isbn) {
        const libro = this.libros.buscarLibroPorIsbn(isbn);
        if (!libro) return null;

        let html = `
            <p><strong>ISBN:</strong> ${libro.isbn}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>Precio:</strong> ${libro.precio.toFixed(2)}€</p>
            <p><strong>Autores:</strong> ${libro.autores.map(a => a.nombreCompleto).join(", ")}</p>
            <hr>
        `;

        if (libro instanceof Ebook) {
            html += `
                <p><span class="badge bg-info">Ebook</span></p>
                <p><strong>Tamaño:</strong> ${libro.tamanioArchivo} MB</p>
                <p><strong>Formato:</strong> ${libro.formato}</p>`;
        } else if (libro instanceof LibroPapel) {
            html += `
                <p><span class="badge bg-warning text-dark">Libro Físico</span></p>
                <p><strong>Stock:</strong> ${libro.stock}</p>
                <p><strong>Dimensiones:</strong> ${libro.dimensiones}</p>
                <p><strong>Peso:</strong> ${libro.peso} kg</p>`;
        }

        return { titulo: libro.titulo, cuerpo: html };
    }

    // Página 2: Clientes (Ordenados de más nuevo a más antiguo)
    renderizarTablaClientes() {
        const lista = this.clientes.listadoClientes;
        if (lista.length === 0) return "<tr><td colspan='5' class='text-center'>No hay clientes registrados.</td></tr>";

        // Invertimos el array para mostrar los más nuevos primero
        return [...lista].reverse().map(cliente => `
            <tr>
                <td>${cliente.dni}</td>
                <td>${cliente.nombreCompleto}</td>
                <td>${cliente.direccion}</td>
                <td><span class="badge bg-secondary">${cliente.pedidosCliente.length}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-info" onclick="verPedidosCliente('${cliente.dni}')">
                        Ver Pedidos
                    </button>
                </td>
            </tr>`).join("");
    }

    obtenerPedidosClienteHTML(dni) {
        const cliente = this.clientes.buscarClientePorDNI(dni);
        if (!cliente) return null;

        const htmlCards = cliente.pedidosCliente.map(pedido => {
            const total = pedido.precioTotalConEnvioConIVA || 0;
            return `
            <div class="col">
                <div class="card h-100 border-info shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title text-primary">Pedido #${pedido.id}</h5>
                        <p class="card-text mb-1"><small class="text-muted">Fecha: ${pedido.fecha.toLocaleDateString()}</small></p>
                        <p class="card-text"><strong>Total: ${total.toFixed(2)}€</strong></p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <span class="badge ${pedido.abierto ? 'bg-success' : 'bg-danger'}">
                            ${pedido.abierto ? 'Activo' : 'Cerrado'}
                        </span>
                    </div>
                </div>
            </div>`;
        }).join("");

        return {
            nombre: cliente.nombreCompleto,
            htmlCards: htmlCards || "<div class='col-12'><div class='alert alert-light text-center'>Este cliente aún no ha realizado pedidos.</div></div>"
        };
    }

    registrarNuevoCliente(dni, nombre, direccion) {
        if (this.clientes.existeClientePorDNI(dni)) {
            throw new Error("El DNI ya existe en el sistema.");
        }
        const nuevo = new Cliente(parseInt(dni), nombre, direccion);
        this.clientes.insertarClientes([nuevo]);
        return true;
    }
}