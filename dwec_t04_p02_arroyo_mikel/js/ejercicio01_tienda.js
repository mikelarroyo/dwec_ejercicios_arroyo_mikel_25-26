console.log("T04 - Ejercicio 01: Tienda");

class Tienda {
    // ===========================================
    // 1. PROPIEDADES ESTÁTICAS (SINGLETON Y CONSTANTES)
    // ===========================================
    static instancia = null; // Propiedad estática para la instancia única [cite: 754]
    static IVA = 0.21; // Constante IVA [cite: 675]
    static MESES_PROMOCION = new Set([10, 11]); // Meses de promoción (Nov=10, Dic=11 en JS Date.getMonth())

    // ===== Método estático Singleton =====
    static getInstancia(nombreTienda) {
        if (Tienda.instancia === null) { 
            Tienda.instancia = new Tienda(nombreTienda);
        }
        return Tienda.instancia;
    }

    // ===========================================
    // 2. ATRIBUTOS PRIVADOS
    // ===========================================
    #nombre;
    #libros;       // Objeto Libros
    #autores;      // Objeto Autores
    #tiposEnvios;  // Objeto TiposEnvios
    #clientes;     // Objeto Clientes
    #pedidos;      // Objeto Pedidos
    #lector;       // Objeto LeerDatosPrompt (Strategy Pattern) [cite: 672]

    // ===========================================
    // 3. CONSTRUCTOR (Uso restringido por Singleton)
    // ===========================================
    constructor(nombreTienda) {
        // Evitar instanciación directa
        if (Tienda.instancia !== null) {
            throw new Error("Use Tienda.getInstancia() en lugar de new Tienda()");
        }

        if (typeof nombreTienda !== 'string' || nombreTienda.trim().length === 0) {
            throw new Error("El nombre de la tienda es inválido.");
        }

        this.#nombre = nombreTienda.trim();

        // Inicialización de colecciones [cite: 866-871]
        this.#libros = new Libros();
        this.#autores = new Autores();
        this.#clientes = new Clientes();
        this.#pedidos = new Pedidos();
        this.#tiposEnvios = new TiposEnvios();
        this.#lector = new LeerDatosPrompt();
        
        console.log(`Tienda '${this.#nombre}' inicializada.`);
    }

    // === Getters para acceso a colecciones (necesario para métodos de Tienda) ===
    get nombre() { return this.#nombre; }
    get libros() { return this.#libros; }
    get autores() { return this.#autores; }
    get clientes() { return this.#clientes; }
    get pedidos() { return this.#pedidos; }
    get tiposEnvios() { return this.#tiposEnvios; }
    get lector() { return this.#lector; }


    // ===========================================
    // 4. MÉTODOS DE UTILIDAD Y FLUJO
    // ===========================================

    cargarDatosPrueba() {
        console.log("\n--- 1. Cargando Datos de Prueba ---"); // [cite: 678]

        // Inicializar Autores
        const autor1 = new Autor("Gabriel García Márquez");
        const autor2 = new Autor("Ray Bradbury");
        this.#autores.insertarAutores([autor1, autor2]);

        // Inicializar Libros (vincular a autores)
        const libro1 = new LibroPapel(1001, "Cien años de soledad", [autor1], "novela", 18.50, 0.4, "20x15x3", 10);
        autor1.insertarLibro(libro1);
        const libro2 = new Ebook(1002, "Fahrenheit 451", [autor2], "ciencia ficcion", 8.99, 3.0, "epub");
        autor2.insertarLibro(libro2);
        const libro3 = new LibroPapel(1003, "Crónicas Marcianas", [autor2], "ciencia ficcion", 12.00, 0.3, "20x14x2", 2); // Stock bajo
        autor2.insertarLibro(libro3);
        this.#libros.insertarLibros([libro1, libro2, libro3]);
        
        // Inicializar Tipos de Envío
        const tipo1 = new TipoEnvio("Estándar", 5, 2.0, 5.50);
        const tipo2 = new TipoEnvio("Express", 2, 0.5, 12.99);
        this.#tiposEnvios.insertarTipos([tipo1, tipo2]);

        // Inicializar Clientes
        const cliente1 = new Cliente(12345678, "Ana García", "Falsa 123");
        this.#clientes.insertarClientes([cliente1]);

        console.log(`Datos cargados: ${this.#libros.listadoLibros.length} libros, ${this.#autores.listadoAutores.length} autores.`);
    }

    mostrarMenu() {
        return (
            `\n--- Menú Principal ${this.#nombre} ---\n` +
            `1. Mostrar Catálogo de Libros Disponibles.\n` + // [cite: 718]
            `2. Insertar Libros o Modificar Libro por ISBN.\n` + // [cite: 720]
            `3. Actualizar Stock de Libros (Incrementar).\n` + // [cite: 722]
            `4. Ver Notificaciones Stock Libros Bajo Mínimo.\n` + // [cite: 723]
            `5. Insertar Nuevo Cliente.\n` + // [cite: 724]
            `6. Mostrar Pedidos Abiertos de un Cliente por DNI.\n` + // [cite: 725]
            `7. Borrar Cliente por DNI.\n` + // [cite: 726]
            `8. Hacer Pedido por Cliente (por DNI).\n` + // [cite: 727]
            `9. Mostrar Pedido por ID de Pedido.\n` + // [cite: 739]
            `10. Mostrar Estadísticas.\n` + // [cite: 740]
            `11. Salir.\n` + // [cite: 747]
            `Opción: `
        );
    }

    pedirOpcionMenu() {
        try {
            // Usa el lector para obtener una opción válida entre 1 y 11
            const opcion = this.#lector.leerEnteroEntreHasta(this.mostrarMenu(), 1, 11);
            return opcion;
        } catch (error) {
            console.log(`[MENU] Operación cancelada: ${error.message}`);
            return 11; // Salir si se cancela la entrada
        }
    }

    iniciar() {
        this.cargarDatosPrueba(); // [cite: 679]
        let opcion = 0;

        do {
            opcion = this.pedirOpcionMenu();

            try {
                switch (opcion) {
                    case 1:
                        this.mostrarCatalogoLibrosDisponibles();
                        break;
                    case 2:
                        this.insertarOModificarLibro();
                        break;
                    case 3:
                        this.actualizarStockLibros();
                        break;
                    case 4:
                        this.notificacionesStockLibrosMinimo();
                        break;
                    case 5:
                        this.pedirYcrearCliente();
                        break;
                    case 6:
                        this.mostrarPedidosAbiertoCliente();
                        break;
                    case 7:
                        this.borrarCliente();
                        break;
                    case 8:
                        this.hacerPedidoPorCliente();
                        break;
                    case 9:
                        this.mostrarPedidoPorID();
                        break;
                    case 10:
                        this.mostrarEstadisticas();
                        break;
                    case 11:
                        console.log("Saliendo del sistema...");
                        break;
                    default:
                        console.log("Opción no válida.");
                }
            } catch (error) {
                // Gestión de errores a nivel de aplicación (try...catch en main()) [cite: 38]
                console.error(`\n--- ERROR DE EJECUCIÓN (Opción ${opcion}) ---`);
                console.error(`Detalle: ${error.message}`);
            }

        } while (opcion !== 11);
    }

    // ===========================================
    // 5. MÉTODOS DE LÓGICA DE NEGOCIO (OPCIONES DE MENÚ)
    // ===========================================

    // Opción 1 [cite: 718]
    mostrarCatalogoLibrosDisponibles() {
        console.log("\n--- Catálogo de Libros Disponibles ---");
        // Se asume que este método de Libros lista todos los libros
        const listaLibros = this.#libros.obtenerCadenaLibrosMenu(); 
        console.log(listaLibros);
    }

    // Opción 2: Insertar o modificar libro por ISBN [cite: 720]
    insertarOModificarLibro() {
        console.log("\n--- Insertar o Modificar Libro ---");
        try {
            const isbnAmodificar = this.#lector.leerEnteroHasta("Introduce el ISBN a buscar (entero positivo):");
            const libroExistente = this.#libros.buscarLibroPorIsbn(isbnAmodificar);

            if (libroExistente) {
                console.log(`Libro encontrado: ${libroExistente.titulo}. Procediendo a modificar...`);
                const mapaInfo = {};
                
                // Pedir nuevo título
                let nuevoTitulo = this.#lector.leerCadenaHasta("Nuevo Título (dejar vacío para no cambiar):", 0);
                if (nuevoTitulo) {
                    mapaInfo.titulo = nuevoTitulo;
                }
                
                // Pedir nuevo precio
                let nuevoPrecio = this.#lector.leerReal("Nuevo Precio (dejar 0 para no cambiar):");
                if (nuevoPrecio > 0) {
                    mapaInfo.precio = nuevoPrecio;
                }

                if (Object.keys(mapaInfo).length > 0) {
                    // Uso de la función polimórfica modificarLibro(mapaInfo) [cite: 454]
                    if (this.#libros.modificarLibroPorIsbn(isbnAmodificar, mapaInfo)) { 
                        console.log("Libro modificado con éxito.");
                        console.log(this.#libros.buscarLibroPorIsbn(isbnAmodificar).mostrarDatosLibro());
                    } else {
                        console.log("No se pudo modificar el libro.");
                    }
                } else {
                    console.log("No se introdujo ninguna modificación. Cancelado.");
                }
            } else {
                console.log("Libro no encontrado. Procediendo a crear uno nuevo...");
                this.pedirYcrearLibro(isbnAmodificar); 
            }

        } catch (error) {
            console.error(`Error en la operación: ${error.message}`);
        }
    }
    
    // Método auxiliar para la creación de un libro [cite: 682]
    pedirYcrearLibro(isbnPrevio = null) {
        let isbn = isbnPrevio;
        try {
            if (isbn === null) {
                do {
                    isbn = this.#lector.leerEnteroHasta("Introduce ISBN del libro (entero > 0):");
                    if (this.#libros.existeLibroPorIsbn(isbn)) {
                        console.log(`Advertencia: El ISBN ${isbn} ya existe. Intente con otro.`);
                        isbn = null;
                    }
                } while (isbn === null);
            }
            
            const titulo = this.#lector.leerCadenaHasta("Título:", 1);
            const genero = this.#lector.leerCadenaHasta("Género (ej: Novela):", 1);
            const precio = this.#lector.leerReal("Precio sin IVA (real > 0):");

            const tipoLibro = this.#lector.leerEnteroEntreHasta("Tipo de libro: 1) Papel, 2) Ebook", 1, 2);

            // Buscar o crear Autor [cite: 691, 692]
            const nombreAutor = this.#lector.leerCadenaHasta("Nombre Completo del Autor:", 3);
            let autor = this.#autores.listadoAutores.find(a => a.nombreCompleto.toLowerCase() === nombreAutor.toLowerCase());
            if (!autor) {
                autor = new Autor(nombreAutor);
                this.#autores.insertarAutores([autor]);
                console.log(`Autor '${autor.nombreCompleto}' creado y añadido.`);
            }
            const autoresArray = [autor];
            
            let nuevoLibro;

            if (tipoLibro === 1) { // LibroPapel
                const peso = this.#lector.leerReal("Peso en kg (ej: 0.5):");
                const dimensiones = this.#lector.leerCadenaHasta("Dimensiones (ej: 20x15x3):", 5);
                const stock = this.#lector.leerEnteroHasta("Stock Inicial (entero >= 0):");
                
                // 2ª capa de validación en constructor/setters [cite: 693]
                nuevoLibro = new LibroPapel(isbn, titulo, autoresArray, genero, precio, peso, dimensiones, stock);
            
            } else { // Ebook
                const tamano = this.#lector.leerReal("Tamaño de Archivo en MB (real > 0):");
                const formato = this.#lector.leerCadenaHasta("Formato (pdf/epub/mobi):", 3);
                nuevoLibro = new Ebook(isbn, titulo, autoresArray, genero, precio, tamano, formato);
            }

            // Vínculo y almacenamiento final [cite: 694]
            this.#libros.insertarLibros([nuevoLibro]);
            autor.insertarLibro(nuevoLibro); 
            console.log(`Libro '${nuevoLibro.titulo}' (ISBN ${isbn}) creado y añadido.`);
            return nuevoLibro;

        } catch (error) {
            // Captura errores de la 2ª capa de validación o fallos en el flujo
            console.error(`Error en la creación del libro: ${error.message}.`);
            return null;
        }
    }


    // Opción 3 [cite: 702]
    actualizarStockLibros() {
        console.log("\n--- Actualizar Stock de Libros (Incrementar) ---");
        try {
            const isbn = this.#lector.leerEnteroHasta("Introduce el ISBN del libro en papel a actualizar:");
            const libro = this.#libros.buscarLibroPorIsbn(isbn);

            if (!libro) {
                console.log(`Libro con ISBN ${isbn} no encontrado.`);
                return;
            }
            if (!(libro instanceof LibroPapel)) {
                console.log(`El libro "${libro.titulo}" no es un libro en papel. Stock no aplicable.`);
                return;
            }

            console.log(`Stock actual de "${libro.titulo}": ${libro.stock}`);
            const unidades = this.#lector.leerEnteroHasta("Unidades a añadir (entero positivo):");
            
            libro.ampliarStock(unidades); // Usa el método de la clase LibroPapel [cite: 436]
            
            console.log(`Stock actualizado. Nuevo stock: ${libro.stock}`);

        } catch (error) {
            console.error(`Error al actualizar stock: ${error.message}`);
        }
    }
    
    // Opción 4 [cite: 703]
    notificacionesStockLibrosMinimo() {
        console.log("\n--- Notificaciones de Stock Bajo Mínimo ---");
        let notificaciones = 0;
        
        this.#libros.listadoLibros.forEach(libro => {
            if (libro instanceof LibroPapel) {
                if (libro.avisoStockMinimo()) {
                    console.log(`⚠️ ALERTA: "${libro.titulo}" (ISBN ${libro.isbn}) tiene stock bajo: ${libro.stock} unidad(es).`);
                    notificaciones++;
                }
            }
        });

        if (notificaciones === 0) {
            console.log("No hay libros en papel con stock bajo o agotado.");
        }
    }

    // Opción 5 [cite: 724]
    pedirYcrearCliente() {
        console.log("\n--- Insertar Nuevo Cliente ---");
        try {
            // 1. Pedir DNI y validar unicidad
            let dni = null;
            do {
                // 1ª capa de validación en el lector
                dni = this.#lector.leerEnteroHasta("Introduce DNI del Cliente (entero positivo):");
                if (this.#clientes.existeClientePorDNI(dni)) {
                    console.log(`Advertencia: El DNI ${dni} ya está registrado.`);
                    dni = null;
                }
            } while (dni === null);

            // 2. Pedir datos restantes
            const nombre = this.#lector.leerCadenaHasta("Nombre Completo:", 3);
            const direccion = this.#lector.leerCadenaHasta("Dirección:", 5);

            // 3. Crear y insertar cliente
            const nuevoCliente = new Cliente(dni, nombre, direccion); // 2ª capa de validación en constructor
            this.#clientes.insertarClientes([nuevoCliente]);
            console.log(`Cliente ${nuevoCliente.nombreCompleto} (DNI ${dni}) registrado con éxito.`);

        } catch (error) {
            console.error(`Error en la creación del cliente: ${error.message}.`);
        }
    }

    // Opción 6 [cite: 725]
    mostrarPedidosAbiertoCliente() {
        console.log("\n--- Pedidos Abiertos de un Cliente ---");
        try {
            const dni = this.#lector.leerEnteroHasta("Introduce DNI del cliente:");
            const cliente = this.#clientes.buscarClientePorDNI(dni);

            if (!cliente) {
                console.log(`Cliente con DNI ${dni} no encontrado.`);
                return;
            }

            // Uso del método de la clase Cliente [cite: 574]
            console.log(cliente.mostrarPedidosClienteAbierto());

        } catch (error) {
            console.error(`Error al mostrar pedidos: ${error.message}`);
        }
    }
    
    // Opción 7 [cite: 726]
    borrarCliente() {
        console.log("\n--- Borrar Cliente por DNI ---");
        try {
            const dni = this.#lector.leerEnteroHasta("Introduce DNI del cliente a borrar:");
            const cliente = this.#clientes.buscarClientePorDNI(dni);

            if (!cliente) {
                console.log(`Cliente con DNI ${dni} no encontrado.`);
                return;
            }

            const confirmacion = prompt(`¿Está seguro de que desea borrar a ${cliente.nombreCompleto} y todos sus pedidos? (S/N)`);
            if (confirmacion && confirmacion.toUpperCase() === 'S') {
                // Borrar pedidos asociados a ese cliente [cite: 592]
                const pedidosAborrar = this.#pedidos.listarTodos().filter(p => p.cliente.dni === dni);
                this.#pedidos.borrarPedidos(pedidosAborrar);
                
                if (this.#clientes.borrarClientePorDNI(dni)) {
                    console.log(`Cliente ${cliente.nombreCompleto} y sus ${pedidosAborrar.length} pedidos han sido borrados.`);
                } else {
                    console.log("No se pudo borrar al cliente.");
                }
            } else {
                console.log("Operación de borrado cancelada.");
            }
        } catch (error) {
            console.error(`Error al intentar borrar cliente: ${error.message}`);
        }
    }

    // Opción 8 [cite: 727]
    hacerPedidoPorCliente() {
        let nuevoPedido = null;
        try {
            const dni = this.#lector.leerEnteroHasta("Introduce DNI del cliente para el pedido:");
            const cliente = this.#clientes.buscarClientePorDNI(dni);

            if (!cliente) {
                console.log(`Cliente con DNI ${dni} no encontrado. Debe registrarse primero.`);
                return;
            }
            
            // 1. Crear nuevo pedido
            nuevoPedido = new Pedido(cliente); // Se añade automáticamente al cliente [cite: 641]
            this.#pedidos.insertarPedido([nuevoPedido]);
            console.log(`Pedido #${nuevoPedido.id} creado para ${cliente.nombreCompleto}.`);

            // 2. Llenar el pedido [cite: 729]
            let seguirComprando = true;
            while (seguirComprando) {
                console.log("\n--- SELECCIÓN DE LIBRO ---");
                this.mostrarCatalogoLibrosDisponibles();

                const isbnInput = this.#lector.leerEnteroHasta("Introduce el ISBN del libro a añadir (0 para finalizar):");
                if (isbnInput === 0) {
                    seguirComprando = false;
                    continue;
                }

                const libroSeleccionado = this.#libros.buscarLibroPorIsbn(isbnInput);
                if (!libroSeleccionado) {
                    console.log("ISBN no válido o libro no encontrado.");
                    continue;
                }
                
                if (!libroSeleccionado.comprobarDisponibilidad()) {
                    console.log(`El libro "${libroSeleccionado.titulo}" no está disponible.`);
                    continue;
                }

                let unidades = 1;
                if (libroSeleccionado instanceof LibroPapel) {
                    unidades = this.#lector.leerEnteroHasta(`Unidades (Stock: ${libroSeleccionado.stock}):`);
                } else {
                    unidades = 1; // Ebook solo 1 unidad
                }

                // Inserción del libro (con validación de unidades/Ebook) [cite: 621]
                nuevoPedido.insertarLibro(libroSeleccionado, unidades);
                console.log(`Añadido: ${unidades}x "${libroSeleccionado.titulo}".`);
            }
            
            if (!nuevoPedido.hayLibros()) {
                console.log("Pedido vacío. Cancelando pedido.");
                this.#pedidos.borrarPedidos([nuevoPedido]);
                return;
            }

            // 3. Selección de envío [cite: 731]
            if (this.verificarLibrosPapel(nuevoPedido)) {
                console.log("\n--- SELECCIÓN DE ENVÍO ---");
                const listaTipos = this.#tiposEnvios.obtenerCadenaTiposMenu();
                console.log(listaTipos);

                const nombreTipo = this.#lector.leerCadenaHasta("Introduce el nombre del tipo de envío:", 1);
                const tipoEnvio = this.#tiposEnvios.buscarTiposPorNombre(nombreTipo);

                if (tipoEnvio) {
                    // Establecer el tipo de envío (valida peso) [cite: 623, 625]
                    nuevoPedido.establecerTipoEnvio(tipoEnvio);
                    console.log(`Tipo de envío establecido: ${tipoEnvio.nombre}`);
                } else {
                    console.log("Tipo de envío no válido. Se usará envío por defecto (si aplica).");
                }
            } else {
                console.log("El pedido solo contiene Ebooks. No se aplica gasto de envío.");
                nuevoPedido.establecerTipoEnvio(null);
            }
            
            // 4. Aplicar descuento y mostrar resumen [cite: 737, 738]
            nuevoPedido.calcularTotal(); 
            
            const descuentoPropio = this.#lector.leerReal("¿Desea aplicar un descuento adicional? (0-100%):");
            if (descuentoPropio > 0) {
                nuevoPedido.aplicarDescuento(descuentoPropio);
            }
            
            console.log("\n--- RESUMEN FINAL DEL PEDIDO ---");
            console.log(nuevoPedido.mostrarDatosPedido());
            
            // 5. Cerrar pedido
            this.#pedidos.cerrarPedidoPorId(nuevoPedido.id);
            console.log(`Pedido #${nuevoPedido.id} cerrado y completado.`);

        } catch (error) {
            console.error(`\n--- ERROR EN EL PEDIDO ---`);
            console.error(`Detalle: ${error.message}`);
            // Intentar borrar el pedido si falla
            if (nuevoPedido && nuevoPedido.abierto) {
                 this.#pedidos.borrarPedidos([nuevoPedido]);
                 console.log(`Pedido #${nuevoPedido.id} cancelado y eliminado de la lista de pedidos.`);
            }
        }
    }

    // Auxiliar: comprueba si hay libros en papel en el pedido
    verificarLibrosPapel(pedido) {
        let hayPapel = false;
        for (const item of pedido.librosPedido.values()) {
            if (item.libro instanceof LibroPapel) {
                hayPapel = true;
                break;
            }
        }
        return hayPapel;
    }

    // Opción 9 [cite: 739]
    mostrarPedidoPorID() {
        console.log("\n--- Mostrar Pedido por ID ---");
        try {
            const id = this.#lector.leerEnteroHasta("Introduce el ID del pedido:");
            const pedido = this.#pedidos.buscarPedidoPorId(id);

            if (pedido) {
                console.log(pedido.mostrarDatosPedido());
            } else {
                console.log(`Pedido con ID ${id} no encontrado.`);
            }

        } catch (error) {
            console.error(`Error al mostrar pedido: ${error.message}`);
        }
    }

    // Opción 10 [cite: 740]
    mostrarEstadisticas() {
        console.log("\n--- Estadísticas de la Tienda ---");
        
        const pedidosCerrados = this.#pedidos.listarTodos().filter(p => !p.abierto);
        if (pedidosCerrados.length === 0) {
             console.log("No hay suficientes pedidos cerrados para mostrar estadísticas.");
             return;
        }

        // 1. Número total de pedidos abiertos (filter) [cite: 745]
        const pedidosAbiertos = this.#pedidos.listarTodos().filter(p => p.abierto).length;
        console.log(`Pedidos abiertos: ${pedidosAbiertos}`);


        // 2. Importe total facturado (sumando todos los pedidos cerrados) (filter y reduce) [cite: 746]
        const facturado = pedidosCerrados
            .reduce((total, p) => {
                p.calcularTotal(); // Recalcular por si acaso
                return total + p.precioTotalConEnvioConIVA;
            }, 0);
        console.log(`Importe total facturado (IVA incluido): ${facturado.toFixed(2)} €`);
        

        // 3. Libro más vendido (unidades) [cite: 741]
        const resumenVentas = new Map();
        pedidosCerrados.forEach(pedido => {
            for (const item of pedido.librosPedido.values()) {
                const isbn = item.libro.isbn;
                let total = resumenVentas.get(isbn) || { libro: item.libro, unidades: 0 };
                total.unidades += item.unidades;
                resumenVentas.set(isbn, total);
            }
        });
        const libroMasVendido = [...resumenVentas.values()].reduce((max, venta) => 
            (venta.unidades > max.unidades ? venta : max), {unidades: -1});

        console.log(`Libro más vendido: ${libroMasVendido.libro ? `${libroMasVendido.libro.titulo} (${libroMasVendido.unidades} uds)` : 'N/D'}`);

        
        // 4. Cliente que más pedidos ha realizado (contando pedidos) [cite: 743]
        const conteoPedidos = pedidosCerrados.reduce((mapa, pedido) => 
            mapa.set(pedido.cliente.dni, (mapa.get(pedido.cliente.dni) || 0) + 1), new Map());
        
        let maxPedidos = 0;
        let dniMasPedidos = 0;
        for (const [dni, count] of conteoPedidos.entries()) {
            if (count > maxPedidos) {
                maxPedidos = count;
                dniMasPedidos = dni;
            }
        }
        const clienteMasPedidos = this.#clientes.buscarClientePorDNI(dniMasPedidos);
        console.log(`Cliente con más pedidos: ${clienteMasPedidos ? `${clienteMasPedidos.nombreCompleto} (${maxPedidos} pedidos)` : 'N/D'}`);
        
        // 5. Tipo de envío más utilizado [cite: 746]
        const conteoEnvios = pedidosCerrados
            .filter(p => p.tipoEnvioPedido) // Solo con envío
            .reduce((mapa, pedido) => 
                mapa.set(pedido.tipoEnvioPedido.nombre, (mapa.get(pedido.tipoEnvioPedido.nombre) || 0) + 1), new Map());

        let maxEnvios = 0;
        let nombreEnvioMasUsado = 'N/D';
        for (const [nombre, count] of conteoEnvios.entries()) {
            if (count > maxEnvios) {
                maxEnvios = count;
                nombreEnvioMasUsado = nombre;
            }
        }
        console.log(`Tipo de envío más utilizado: ${nombreEnvioMasUsado} (${maxEnvios} veces)`);
    }
}