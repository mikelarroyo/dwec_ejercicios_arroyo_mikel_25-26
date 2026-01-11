let pedidoActivo = null;

document.addEventListener("DOMContentLoaded", () => {
    const tienda = Tienda.getInstancia("Mi Librería DWEC");
    tienda.cargarDatosPrueba();
    const lector = new LeerDatosForm();

    //pagina 1
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

        tbodyLibros.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-detalles");
            if (btn) {
                const isbn = btn.dataset.isbn;
                const info = tienda.obtenerDetallesLibroHTML(isbn);
                if (info) {
                    document.getElementById("modalTitulo").innerText = info.titulo;
                    document.getElementById("modalContenido").innerHTML = info.cuerpo;
                    new bootstrap.Modal(document.getElementById("modalDetalles")).show();
                }
            }
        });
    }

    //pagina 2
    const formCliente = document.getElementById("formCliente");
    if (formCliente) {
        const tbodyClientes = document.querySelector("#tablaClientes tbody");

        const refrescarTablaClientes = () => {
            if (tbodyClientes) tbodyClientes.innerHTML = tienda.renderizarTablaClientes();
        };
        refrescarTablaClientes();

        if (tbodyClientes) {
            tbodyClientes.addEventListener("click", (e) => {
                const btn = e.target.closest(".btn-pedidos");
                if (btn) {
                    const dni = btn.dataset.dni;
                    const infoPedidos = tienda.obtenerPedidosClienteHTML(dni);
                    const panel = document.getElementById("panelPedidos");
                    if (infoPedidos && panel) {
                        document.getElementById("nombreClientePedido").innerText = infoPedidos.nombre;
                        document.getElementById("contenedorCards").innerHTML = infoPedidos.htmlCards;
                        panel.classList.remove("d-none");
                    }
                }
            });
        }

        formCliente.addEventListener("submit", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const inputDni = document.getElementById("dni");
            if (tienda.clientes.existeClientePorDNI(inputDni.value)) {
                inputDni.setCustomValidity("El DNI ya existe.");
            } else {
                inputDni.setCustomValidity("");
            }

            if (formCliente.checkValidity()) {
                try {
                    const dni = lector.leerDNI(inputDni.value);
                    const nombre = lector.leerTextoObligatorio(document.getElementById("nombre").value);
                    const direccion = lector.leerTextoObligatorio(document.getElementById("direccion").value);

                    if (dni && nombre && direccion) {
                        tienda.registrarNuevoCliente(dni, nombre, direccion);
                        alert("Cliente registrado con éxito.");
                        formCliente.reset();
                        formCliente.classList.remove("was-validated");
                        refrescarTablaClientes();
                    }
                } catch (error) {
                    alert("Error: " + error.message);
                }
            } else {
                formCliente.classList.add("was-validated");
            }
        });
    }

    // ======================================================
    // PÁGINAS 3 Y 4 (Gestión separada)
    // ======================================================
    const formLibro = document.getElementById("formLibro");
    if (formLibro) {
        iniciarGestionLibros(tienda, formLibro, lector);
    }

    const btnBuscarC = document.getElementById("btnBuscarCliente");
    if (btnBuscarC) {
        iniciarGestionPedidos(tienda, lector);
    }
});

// FUNCIONES AUXILIARES

function iniciarGestionLibros(tienda, formLibro, lector) {
    console.log("--> Iniciando gestión de libros...");
    const selectGenero = document.getElementById("genero");
    const selectAutores = document.getElementById("autoresSelect");

    if (selectGenero) {

        const generosSet = Libro.GENEROS_LITERARIOS || Libro.GENEROS || new Set(["novela", "ciencia ficcion", "fantasia"]);

        let html = '<option value="" selected disabled>Selecciona un género...</option>';
        generosSet.forEach(g => {
            const texto = g.charAt(0).toUpperCase() + g.slice(1);
            html += `<option value="${g}">${texto}</option>`;
        });
        selectGenero.innerHTML = html;
    }

    // B) Autores: Función para recargar la lista
    const cargarAutores = () => {
        if (selectAutores) {
            const ordenados = [...tienda.autores.listadoAutores].sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
            selectAutores.innerHTML = ordenados.map(a =>
                `<option value="${a.nombreCompleto}">${a.nombreCompleto}</option>`
            ).join("");
        }
    };
    cargarAutores();

    const selectTipo = document.getElementById("tipoLibro");
    const divPapel = document.getElementById("camposPapel");
    const divEbook = document.getElementById("camposEbook");

    const radioExistente = document.getElementById("modoExistente");
    const radioNuevo = document.getElementById("modoNuevo");
    const divAutorSelect = document.getElementById("divAutorSelect");
    const divAutorNuevo = document.getElementById("divAutorNuevo");
    const inputNuevoAutor = document.getElementById("nuevoAutorNombre");

    const actualizarTipo = () => {
        const esPapel = (selectTipo.value === "papel");
        if (esPapel) {
            divPapel.classList.remove("d-none");
            divEbook.classList.add("d-none");
            document.getElementById("peso").required = true;
            document.getElementById("dimensiones").required = true;
            document.getElementById("stock").required = true;
            document.getElementById("tamanio").required = false;
        } else {
            divPapel.classList.add("d-none");
            divEbook.classList.remove("d-none");
            // Ajustamos required
            document.getElementById("peso").required = false;
            document.getElementById("dimensiones").required = false;
            document.getElementById("stock").required = false;
            document.getElementById("tamanio").required = true;
        }
    };
    selectTipo.addEventListener("change", actualizarTipo);
    actualizarTipo();

    const actualizarModoAutor = () => {
        const esNuevo = radioNuevo.checked;
        if (esNuevo) {
            divAutorSelect.classList.add("d-none");
            divAutorNuevo.classList.remove("d-none");
            selectAutores.required = false;
            inputNuevoAutor.required = true;
        } else {
            divAutorSelect.classList.remove("d-none");
            divAutorNuevo.classList.add("d-none");
            selectAutores.required = true;
            inputNuevoAutor.required = false;
        }
    };
    radioExistente.addEventListener("change", actualizarModoAutor);
    radioNuevo.addEventListener("change", actualizarModoAutor);
    actualizarModoAutor();

    formLibro.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputIsbn = document.getElementById("isbn");
        const isbnVal = lector.leerEnteroPositivo(inputIsbn.value);

        if (tienda.libros.existeLibroPorIsbn(isbnVal)) {
            inputIsbn.setCustomValidity("El ISBN ya existe.");
        } else {
            inputIsbn.setCustomValidity("");
        }

        let autorNuevoObj = null;
        let autoresSeleccionados = [];

        if (radioNuevo.checked) {
            const nombreNuevo = inputNuevoAutor.value.trim();
            const existe = tienda.autores.listadoAutores.some(a => a.nombreCompleto.toLowerCase() === nombreNuevo.toLowerCase());

            if (existe) {
                inputNuevoAutor.setCustomValidity("Este autor ya existe. Selecciónalo de la lista.");
            } else if (nombreNuevo.length < 3) {
                inputNuevoAutor.setCustomValidity("El nombre es muy corto.");
            } else {
                inputNuevoAutor.setCustomValidity("");
                autorNuevoObj = new Autor(nombreNuevo);
            }
        } else {
            autoresSeleccionados = Array.from(selectAutores.selectedOptions).map(opt =>
                tienda.autores.listadoAutores.find(a => a.nombreCompleto === opt.value)
            );
        }

        if (!formLibro.checkValidity()) {
            formLibro.classList.add("was-validated");
            return; 
        }

        try {
            if (radioNuevo.checked && autorNuevoObj) {
                tienda.autores.insertarAutores([autorNuevoObj]);
                autoresSeleccionados = [autorNuevoObj];
                cargarAutores();
                alert(`Autor "${autorNuevoObj.nombreCompleto}" creado correctamente.`);
            }

            const titulo = lector.leerTextoObligatorio(document.getElementById("titulo").value);
            const precio = lector.leerRealPositivo(document.getElementById("precio").value);
            const genero = document.getElementById("genero").value;
            let nuevoLibro = null;

            if (selectTipo.value === "papel") {
                const peso = lector.leerRealPositivo(document.getElementById("peso").value);
                const dimensiones = document.getElementById("dimensiones").value; 
                const stock = lector.leerEnteroPositivo(document.getElementById("stock").value);

                nuevoLibro = new LibroPapel(isbnVal, titulo, autoresSeleccionados, genero, precio, peso, dimensiones, stock);
            } else {
                const tamanio = lector.leerRealPositivo(document.getElementById("tamanio").value);
                const formato = document.getElementById("formato").value;

                nuevoLibro = new Ebook(isbnVal, titulo, autoresSeleccionados, genero, precio, tamanio, formato);
            }

            if (nuevoLibro) {
                tienda.libros.insertarLibros([nuevoLibro]);
                autoresSeleccionados.forEach(a => a.insertarLibro(nuevoLibro));

                alert("Libro registrado con éxito.");
                formLibro.reset();
                formLibro.classList.remove("was-validated");
                actualizarTipo();
                radioExistente.checked = true;
                actualizarModoAutor();
            }

        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

function iniciarGestionPedidos(tienda, lector) {
    const selectEnvio = document.getElementById("selectEnvio");
    if (selectEnvio) {
        selectEnvio.innerHTML = '<option value="" selected disabled>Selecciona un envío...</option>' +
            tienda.tiposEnvios.lista.map(t =>
                `<option value="${t.nombre}">${t.nombre} (${t.precio.toFixed(2)}€)</option>`
            ).join("");
    }

    const inputDni = document.getElementById("dniBusquedaPedido");
    const divInfo = document.getElementById("infoClienteSeleccionado");
    const spanNombre = document.getElementById("nombreClienteActivo");
    const btnBuscarC = document.getElementById("btnBuscarCliente");
    const btnDesmarcarC = document.getElementById("btnDesmarcarCliente");

    const inputIsbn = document.getElementById("isbnBusquedaPedido");
    const btnBuscarLibro = document.getElementById("btnBuscarLibroPedido");
    const infoLibro = document.getElementById("infoLibroEncontrado");
    const btnAnadirLibro = document.getElementById("btnAnadirLibro");
    const inputUnidades = document.getElementById("unidadesPedido");

    // 1. Buscar Cliente
    btnBuscarC.addEventListener("click", () => {
        const dniVal = lector.leerEnteroPositivo(inputDni.value);
        const cliente = tienda.clientes.buscarClientePorDNI(dniVal);

        if (!cliente) {
            alert("Cliente no encontrado.");
            return;
        }

        pedidoActivo = new Pedido(cliente);
        spanNombre.innerText = cliente.nombreCompleto;
        divInfo.classList.remove("d-none");
        inputDni.disabled = true;
        btnBuscarC.disabled = true;
        document.getElementById("btnAcordeonLibros").disabled = false;
        document.getElementById("btnAcordeonEnvio").disabled = false;
        new bootstrap.Collapse(document.getElementById("collapseLibros"), { show: true });
    });

    // 2. Desmarcar Cliente
    btnDesmarcarC.addEventListener("click", () => {
        pedidoActivo = null;
        divInfo.classList.add("d-none");
        inputDni.disabled = false;
        inputDni.value = "";
        btnBuscarC.disabled = false;
        document.getElementById("btnAcordeonLibros").disabled = true;
        document.getElementById("btnAcordeonEnvio").disabled = true;
        document.getElementById("tbodyResumen").innerHTML = "";

        // Reset valores visuales
        document.getElementById("resumenSubtotal").innerText = "0.00";
        document.getElementById("resumenTotal").innerText = "0.00";
        document.getElementById("resumenIva").innerText = "0.00";
        inputIsbn.value = "";
        infoLibro.innerText = "";
        btnAnadirLibro.disabled = true;
        selectEnvio.value = "";
    });

    // 3. Buscar Libro
    btnBuscarLibro.addEventListener("click", () => {
        const isbnVal = Number(inputIsbn.value);
        const libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

        if (libro) {
            infoLibro.innerText = `Encontrado: ${libro.titulo} (${libro.precio.toFixed(2)}€)`;
            infoLibro.className = "small text-success mt-2 fw-bold";
            btnAnadirLibro.disabled = false;

            if (libro instanceof Ebook) {
                inputUnidades.value = 1;
                inputUnidades.disabled = true;
            } else {
                inputUnidades.disabled = false;
            }
        } else {
            infoLibro.innerText = "Libro no encontrado.";
            infoLibro.className = "small text-danger mt-2 fw-bold";
            btnAnadirLibro.disabled = true;
        }
    });

    // 4. Añadir Libro
    btnAnadirLibro.addEventListener("click", () => {
        const isbnVal = Number(inputIsbn.value);
        const cantVal = parseInt(inputUnidades.value);
        const libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

        if (libro) {
            try {
                pedidoActivo.insertarLibro(libro, cantVal);
                actualizarResumenPedido();
                infoLibro.innerText = "Libro añadido al pedido.";
                infoLibro.className = "small text-primary mt-2";
                inputIsbn.value = "";
                btnAnadirLibro.disabled = true;
            } catch (e) {
                alert(e.message);
            }
        }
    });

    // 5. Envío
    if (selectEnvio) {
        selectEnvio.addEventListener("change", () => {
            if (!pedidoActivo) return;
            const envioObj = tienda.tiposEnvios.lista.find(t => t.nombre === selectEnvio.value);
            try {
                pedidoActivo.establecerTipoEnvio(envioObj);
                actualizarResumenPedido();
            } catch (e) {
                alert(e.message);
                selectEnvio.value = "";
            }
        });
    }

    // Botón Pagar (Si existe)
    const btnPagar = document.getElementById("btnPagarPedido");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            if (!pedidoActivo || !pedidoActivo.hayLibros()) {
                alert("No hay productos en el pedido.");
                return;
            }
            tienda.pedidos.insertarPedido([pedidoActivo]);
            alert("Pedido realizado con éxito.");
            location.reload();
        });
    }
}

function actualizarResumenPedido() {
    
    const tienda = Tienda.getInstancia(); 
    
    if (!pedidoActivo) return;

    const datos = tienda.obtenerResumenPedidoDatos(pedidoActivo);

    if (datos) {
        document.getElementById("tbodyResumen").innerHTML = datos.htmlFilas;
        document.getElementById("resumenSubtotal").innerText = datos.subtotal;
        document.getElementById("resumenIva").innerText = datos.iva;
        document.getElementById("resumenTotal").innerText = datos.total;
    }
}