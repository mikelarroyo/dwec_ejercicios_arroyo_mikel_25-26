// Variable global para el pedido de la Página 4
let pedidoActivo = null;

document.addEventListener("DOMContentLoaded", () => {
    const tienda = Tienda.getInstancia("Mi Librería DWEC");
    tienda.cargarDatosPrueba();

    // 1. GESTIÓN DE CATÁLOGO (Página 1)
    const tbodyLibros = document.querySelector("#tablaLibros tbody");
    if (tbodyLibros) {
        const inputBusqueda = document.getElementById("inputBusqueda");
        const btnBuscar = document.getElementById("btnBuscar");

        const ejecutarBusqueda = () => {
            const termino = inputBusqueda ? inputBusqueda.value : "";
            tbodyLibros.innerHTML = tienda.renderizarTablaCatalogo(termino);
        };

        ejecutarBusqueda();
        if (btnBuscar) btnBuscar.addEventListener("click", ejecutarBusqueda);
        if (inputBusqueda) {
            inputBusqueda.addEventListener("keypress", (e) => {
                if (e.key === "Enter") ejecutarBusqueda();
            });
        }
    }

    const formCliente = document.getElementById("formCliente");
    const tbodyClientes = document.querySelector("#tablaClientes tbody");
    if (formCliente || tbodyClientes) {
        const refrescarTablaClientes = () => {
            if (tbodyClientes) tbodyClientes.innerHTML = tienda.renderizarTablaClientes();
        };
        refrescarTablaClientes();

        if (formCliente) {
            formCliente.addEventListener("submit", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const inputDni = document.getElementById("dni");
                if (tienda.clientes.existeClientePorDNI(inputDni.value)) {
                    inputDni.setCustomValidity("El DNI ya existe.");
                } else {
                    inputDni.setCustomValidity("");
                }

                if (!formCliente.checkValidity()) {
                    formCliente.classList.add("was-validated");
                    return;
                }

                try {
                    const dni = parseInt(inputDni.value);
                    const nombre = document.getElementById("nombre").value;
                    const direccion = document.getElementById("direccion").value;

                    tienda.registrarNuevoCliente(dni, nombre, direccion);
                    formCliente.reset();
                    formCliente.classList.remove("was-validated");
                    refrescarTablaClientes();
                    alert("Cliente registrado con éxito");
                } catch (error) {
                    alert("Error: " + error.message);
                }
            });
        }
    }

    // 3. GESTIÓN DE LIBROS (Página 3)
    const formLibro = document.getElementById("formLibro");
    if (formLibro) {
        iniciarGestionLibros(tienda, formLibro);
    }

    // 4. GESTIÓN DE PEDIDOS (Página 4 - Acordeones)
    const btnBuscarC = document.getElementById("btnBuscarCliente");
    if (btnBuscarC) {
        iniciarGestionPedidos(tienda);
    }
});

function iniciarGestionLibros(tienda, formLibro) {
    const autoresSelect = document.getElementById("autoresSelect");
    const tipoLibroSelect = document.getElementById("tipoLibro");
    const camposPapel = document.getElementById("camposPapel");
    const camposEbook = document.getElementById("camposEbook");

    const cargarAutores = () => {
        const lista = tienda.autores.listadoAutores;
        autoresSelect.innerHTML = lista
            .map(autor => `<option value="${autor.nombreCompleto}">${autor.nombreCompleto}</option>`)
            .join("");
    };
    cargarAutores();

    tipoLibroSelect.addEventListener("change", () => {
        const esPapel = tipoLibroSelect.value === "papel";
        camposPapel.classList.toggle("d-none", !esPapel);
        camposEbook.classList.toggle("d-none", esPapel);
    });

    formLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isbnInput = document.getElementById("isbn");
        const generoInput = document.getElementById("genero");

        if (tienda.libros.existeLibroPorIsbn(isbnInput.value)) {
            isbnInput.setCustomValidity("Este ISBN ya está registrado.");
        } else {
            isbnInput.setCustomValidity("");
        }

        const valorGenero = generoInput.value.toLowerCase().trim();
        if (!Libro.GENEROS_LITERARIOS.has(valorGenero)) {
            generoInput.setCustomValidity("Género no permitido.");
        } else {
            generoInput.setCustomValidity("");
        }

        if (!formLibro.checkValidity()) {
            formLibro.classList.add("was-validated");
            return;
        }

        try {
            const isbn = isbnInput.value;
            const titulo = document.getElementById("titulo").value;
            const genero = generoInput.value;
            const precio = parseFloat(document.getElementById("precio").value);
            const nombresAutores = Array.from(autoresSelect.selectedOptions).map(opt => opt.value);
            const autoresObj = nombresAutores.map(nombre => tienda.autores.buscarAutoresPorNombre(nombre));

            let nuevoLibro;
            if (tipoLibroSelect.value === "papel") {
                const stock = parseInt(document.getElementById("stock").value);
                const peso = parseFloat(document.getElementById("peso").value);
                const dimensiones = document.getElementById("dimensiones").value;
                nuevoLibro = new LibroPapel(isbn, titulo, autoresObj, genero, precio, peso, dimensiones, stock);
            } else {
                const tamanio = parseFloat(document.getElementById("tamanio").value);
                const formato = document.getElementById("formato").value;
                nuevoLibro = new Ebook(isbn, titulo, autoresObj, genero, precio, tamanio, formato);
            }

            tienda.libros.insertarLibros([nuevoLibro]);
            autoresObj.forEach(a => { if (a) a.insertarLibro(nuevoLibro); });

            alert(`Libro "${titulo}" guardado correctamente`);
            formLibro.reset();
            formLibro.classList.remove("was-validated");
            cargarAutores();
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

function iniciarGestionPedidos(tienda) {
    const btnBuscarC = document.getElementById("btnBuscarCliente");
    const inputDniC = document.getElementById("dniBusquedaPedido");
    const infoC = document.getElementById("infoClienteSeleccionado");
    const nombreC = document.getElementById("nombreClienteActivo");
    const btnDesmarcar = document.getElementById("btnDesmarcarCliente");

    // Función interna para llenar el combo de envíos
    const cargarComboEnvios = () => {
        const selectEnvio = document.getElementById("selectEnvio");
        if (selectEnvio) {
            const lista = tienda.tiposEnvios.lista;
            selectEnvio.innerHTML = '<option value="" selected disabled>Selecciona un envío...</option>' + 
                lista.map(t => `<option value="${t.nombre}">${t.nombre} (${t.precio.toFixed(2)}€)</option>`).join("");
        }
    };

    // Acordeón 1: Buscar Cliente
    btnBuscarC.addEventListener("click", () => {
        const cliente = tienda.clientes.buscarClientePorDNI(inputDniC.value);
        if (!cliente) {
            alert("El cliente no existe.");
            return;
        }

        pedidoActivo = new Pedido(cliente);
        nombreC.innerText = cliente.nombreCompleto;
        infoC.classList.remove("d-none");
        btnBuscarC.disabled = true;
        inputDniC.disabled = true;

        // Habilitar acordeones y cargar envíos
        document.getElementById("btnAcordeonLibros").disabled = false;
        document.getElementById("btnAcordeonEnvio").disabled = false;
        cargarComboEnvios(); 
    });

    btnDesmarcar.addEventListener("click", () => {
        pedidoActivo = null;
        infoC.classList.add("d-none");
        btnBuscarC.disabled = false;
        inputDniC.disabled = false;
        document.getElementById("btnAcordeonLibros").disabled = true;
        document.getElementById("btnAcordeonEnvio").disabled = true;
        document.getElementById("tbodyResumen").innerHTML = ""; // Limpiar tabla
    });

    // Acordeón 2: Libros
    const btnBuscarL = document.getElementById("btnBuscarLibroPedido");
    const inputIsbn = document.getElementById("isbnBusquedaPedido");
    const inputCant = document.getElementById("unidadesPedido");
    const btnAnadir = document.getElementById("btnAnadirLibro");

    btnBuscarL.addEventListener("click", () => {
        const libro = tienda.libros.buscarLibroPorIsbn(inputIsbn.value);
        if (!libro) {
            alert("El ISBN no existe.");
            btnAnadir.disabled = true;
            return;
        }

        document.getElementById("infoLibroEncontrado").innerText = `Libro: ${libro.titulo}`;
        btnAnadir.disabled = false;

        // Si es ebook, unidades bloqueadas a 1
        if (libro instanceof Ebook) {
            inputCant.value = 1;
            inputCant.disabled = true;
        } else {
            inputCant.disabled = false;
        }
    });

    btnAnadir.addEventListener("click", () => {
        const libro = tienda.libros.buscarLibroPorIsbn(inputIsbn.value);
        try {
            pedidoActivo.insertarLibro(libro, inputCant.value);
            actualizarResumenPedido();
            alert("Añadido al pedido");
        } catch (error) {
            alert(error.message);
        }
    });

    // Acordeón 3: Gestión de Envío (Validación de peso)
    const selectEnvio = document.getElementById("selectEnvio");
    if (selectEnvio) {
        selectEnvio.addEventListener("change", (e) => {
            const nombreEnvio = e.target.value;
            const tipo = tienda.tiposEnvios.buscarTiposPorNombre(nombreEnvio);
            
            try {
                // El método establecerTipoEnvio valida el peso total
                if (pedidoActivo.establecerTipoEnvio(tipo)) {
                    actualizarResumenPedido();
                }
            } catch (error) {
                alert("Error con el envío: " + error.message);
                e.target.value = ""; // Resetea selección si el peso supera el máximo
            }
        });
    }

    // Botón Pagar (Finalizar)
    const btnPagar = document.getElementById("btnPagarPedido");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            if (!pedidoActivo || !pedidoActivo.hayLibros()) {
                alert("No hay productos en el pedido.");
                return;
            }
            tienda.pedidos.insertarPedido([pedidoActivo]);
            alert("Pedido realizado con éxito. ¡Gracias por su compra!");
            location.reload(); // Recargamos para limpiar y cargar datos de prueba frescos
        });
    }
}

function actualizarResumenPedido() {
    const tbody = document.getElementById("tbodyResumen");
    if (!tbody || !pedidoActivo) return;

    // Calculamos totales internos del objeto Pedido
    pedidoActivo.calcularTotal();

    // Generamos las filas de la tabla dinámicamente
    let htmlFilas = "";
    
    // Recorremos el Map de libros del pedido
    pedidoActivo.librosPedido.forEach((item) => {
        const libro = item.libro;
        const unidades = item.unidades;
        const subtotalFila = libro.precio * unidades;

        htmlFilas += `
            <tr>
                <td>${libro.titulo}</td>
                <td>${unidades}</td>
                <td>${libro.precio.toFixed(2)}€</td>
                <td>${subtotalFila.toFixed(2)}€</td>
            </tr>`;
    });

    tbody.innerHTML = htmlFilas;

    // Actualizamos los campos de texto con los cálculos del objeto Pedido
    const subtotal = pedidoActivo.precioTotalConEnvioSinIVA;
    const totalConIva = pedidoActivo.precioTotalConEnvioConIVA;
    const cuotaIva = totalConIva - subtotal;

    document.getElementById("resumenSubtotal").innerText = subtotal.toFixed(2);
    document.getElementById("resumenIva").innerText = cuotaIva.toFixed(2);
    document.getElementById("resumenTotal").innerText = totalConIva.toFixed(2);
}

// Funciones para modales (Página 1)
function verDetalles(isbn) {
    const tienda = Tienda.getInstancia();
    const info = tienda.obtenerDetallesLibroHTML(isbn);
    if (info) {
        document.getElementById("modalTitulo").innerText = info.titulo;
        document.getElementById("modalContenido").innerHTML = info.cuerpo;
        new bootstrap.Modal(document.getElementById("modalDetalles")).show();
    }
}

function verPedidosCliente(dni) {
    const tienda = Tienda.getInstancia();
    const infoPedidos = tienda.obtenerPedidosClienteHTML(dni);
    const panel = document.getElementById("panelPedidos");
    if (infoPedidos && panel) {
        document.getElementById("nombreClientePedido").innerText = infoPedidos.nombre;
        document.getElementById("contenedorCards").innerHTML = infoPedidos.htmlCards;
        panel.classList.remove("d-none");
    }
}