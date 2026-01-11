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
        const autor1 = new Autor("Gabriel Garcia Marquez");
        const autor2 = new Autor("Ray Bradbury");
        const autor3 = new Autor("Isaac Asimov");
        const autor4 = new Autor("Joanne Kathleen Rowling");
        const autor5 = new Autor("George RR Martin");
        const autor6 = new Autor("John Ronald Reuel Tolkien");
        const autor7 = new Autor("Agatha Christie");
        const autor8 = new Autor("Stephen King");
        const autor9 = new Autor("Ken Follett");
        const autor10 = new Autor("Julia Navarro");

        this.#autores.insertarAutores([autor1, autor2, autor3, autor4, autor5, autor6, autor7, autor8, autor9, autor10]);

        // 2. Libros
        const libro1 = new LibroPapel(1001, "Cien años de soledad", [autor1], "novela", 18.5, 0.4, "20x15x3", 10);
        const libro2 = new Ebook(1002, "Fahrenheit 451", [autor2], "novela", 8.99, 3.0, "epub");
        const libro3 = new LibroPapel(1003, "Cronicas Marcianas", [autor2], "ciencia ficcion", 12.0, 0.3, "20x14x2", 2);
        const libro4 = new Ebook(1004, "Fundacion", [autor3], "ciencia ficcion", 9.5, 2.5, "pdf");
        const libro5 = new LibroPapel(1005, "Harry Potter", [autor4], "fantasia", 15.0, 0.5, "22x16x4", 5);
        const libro6 = new Ebook(1006, "Juego de Tronos", [autor5], "fantasia", 11.99, 4.0, "mobi");
        const libro7 = new LibroPapel(1007, "El Hobbit", [autor6], "fantasia", 14.0, 0.45, "21x15x3", 8);
        const libro8 = new Ebook(1008, "Orient Express", [autor7], "novela", 7.5, 1.5, "epub");
        const libro9 = new LibroPapel(1009, "El resplandor", [autor8], "terror", 13.0, 0.35, "20x14x2", 4);
        const libro10 = new LibroPapel(1010, "Los pilares de la Tierra", [autor9], "historico", 25.0, 1.2, "25x18x6", 3);

        this.#libros.insertarLibros([libro1, libro2, libro3, libro4, libro5, libro6, libro7, libro8, libro9, libro10]);

        // 3. Tipos de Envío
        const envio1 = new TipoEnvio("Estándar", 5, 10, 5.50);
        const envio2 = new TipoEnvio("Urgente", 2, 5, 9.50);
        this.#tiposEnvios.insertarTipos([envio1, envio2]);

        // 4. Clientes
        const cliente1 = new Cliente(11111111, "Ana Garcia", "Calle Mayor 1");
        const cliente2 = new Cliente(22222222, "Luis Perez", "Avenida del Sol 5");
        const cliente3 = new Cliente(33333333, "Marta Lopez", "Plaza Nueva 3");
        const cliente4 = new Cliente(44444444, "Carlos Sanchez", "Calle Luna 7");
        const cliente5 = new Cliente(55555555, "Sofia Fernandez", "Avenida Estrella 9");
        const cliente6 = new Cliente(66666666, "Mikel Arroyo", "Gran Via 1");
        const cliente7 = new Cliente(77777777, "Lucia Ruiz", "Calle Estafeta 4");
        const cliente8 = new Cliente(88888888, "David Osuna", "Calle Larios 2");
        const cliente9 = new Cliente(99999999, "Elena Cano", "Rua Nova 10");
        const cliente10 = new Cliente(10101010, "Pedro Sanz", "Calle Real 20");

        this.#clientes.insertarClientes([
            cliente1, cliente2, cliente3, cliente4, cliente5,
            cliente6, cliente7, cliente8, cliente9, cliente10
        ]);

        // 5. Historial de Pedidos
        const pedido1 = new Pedido(cliente1);
        pedido1.insertarLibro(libro1, 1);
        pedido1.establecerTipoEnvio(envio1);
        pedido1.calcularTotal();
        pedido1.abierto = false;

        const pedido2 = new Pedido(cliente1);
        pedido2.insertarLibro(libro2, 1);
        pedido2.calcularTotal();
        pedido2.abierto = false;

        const pedido3 = new Pedido(cliente6);
        pedido3.insertarLibro(libro5, 2);
        pedido3.establecerTipoEnvio(envio2);
        pedido3.calcularTotal();
        pedido3.abierto = false;

        const pedido4 = new Pedido(cliente6);
        pedido4.insertarLibro(libro10, 1);
        pedido4.insertarLibro(libro4, 1);
        pedido4.establecerTipoEnvio(envio1);
        pedido4.calcularTotal();

        const pedido5 = new Pedido(cliente6);
        pedido5.insertarLibro(libro9, 1);
        pedido5.aplicarDescuento(15);
        pedido5.calcularTotal();
        pedido5.abierto = false;

        const pedido6 = new Pedido(cliente2);
        pedido6.insertarLibro(libro7, 1);
        pedido6.establecerTipoEnvio(envio1);
        pedido6.calcularTotal();
        pedido6.abierto = false;

        this.#pedidos.insertarPedido([pedido1, pedido2, pedido3, pedido4, pedido5, pedido6]);
    }

    // Página 1: Catálogo
    renderizarTablaCatalogo(terminoBusqueda = "") {
        const librosFiltrados = this.libros.listadoLibros.filter((libro) =>
            libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        if (librosFiltrados.length === 0) {
            return `<tr><td colspan="8" class="text-center text-danger">No se han encontrado coincidencias.</td></tr>`;
        }

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
                    <button class="btn btn-info btn-sm btn-detalles" data-isbn="${libro.isbn}">
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

    // Página 2: Clientes
    renderizarTablaClientes() {
        const lista = this.clientes.listadoClientes;
        if (lista.length === 0) return "<tr><td colspan='5' class='text-center'>No hay clientes registrados.</td></tr>";

        return [...lista].reverse().map(cliente => `
            <tr>
                <td>${cliente.dni}</td>
                <td>${cliente.nombreCompleto}</td>
                <td>${cliente.direccion}</td>
                <td><span class="badge bg-secondary">${cliente.pedidosCliente.length}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-info btn-pedidos" data-dni="${cliente.dni}">
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
            const fechaFormat = pedido.fecha.toLocaleDateString();
            const horaFormat = pedido.fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return `
        <div class="col">
            <div class="card h-100 border-info shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-primary">Compra ${fechaFormat}</h5>
                    <p class="card-text mb-1">
                        <small class="text-muted">Hora: ${horaFormat}</small>
                    </p>
                    <p class="card-text"><strong>Total: ${total.toFixed(2)}€</strong></p>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <span class="badge ${pedido.abierto ? 'bg-success' : 'bg-danger'}">
                        ${pedido.abierto ? 'En curso' : 'Completado'}
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

    obtenerResumenPedidoDatos(pedido) {
        if (!pedido) return null;
        pedido.calcularTotal();
        const htmlFilas = Array.from(pedido.librosPedido.values()).map(item => {
            const totalLinea = item.libro.precio * item.unidades;
            return `
                <tr>
                    <td>${item.libro.titulo}</td>
                    <td>${item.unidades}</td>
                    <td>${item.libro.precio.toFixed(2)}€</td>
                    <td>${totalLinea.toFixed(2)}€</td>
                </tr>`;
        }).join("");
        return {
            htmlFilas: htmlFilas,
            subtotal: pedido.precioTotalConEnvioSinIVA.toFixed(2),
            iva: (pedido.precioTotalConEnvioConIVA - pedido.precioTotalConEnvioSinIVA).toFixed(2),
            total: pedido.precioTotalConEnvioConIVA.toFixed(2)
        };
    }
}