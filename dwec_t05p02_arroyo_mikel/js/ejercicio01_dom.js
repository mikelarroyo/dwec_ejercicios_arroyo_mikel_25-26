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
    console.log("--> Iniciando gestión de pedidos avanzada...");

    const btnAcordeonLibros = document.getElementById("btnAcordeonLibros");
    const btnAcordeonEnvio = document.getElementById("btnAcordeonEnvio");

    let collapseCliente, collapseLibros, collapseEnvio;
    try {
        collapseCliente = new bootstrap.Collapse(document.getElementById('collapseCliente'), { toggle: false });
        collapseLibros = new bootstrap.Collapse(document.getElementById('collapseLibros'), { toggle: false });
        collapseEnvio = new bootstrap.Collapse(document.getElementById('collapseEnvio'), { toggle: false });
    } catch (e) {
        console.error("Error al iniciar acordeones Bootstrap. Revisa los IDs en el PUG.", e);
        return;
    }

    // Sección Cliente
    const inputDni = document.getElementById("dniBusquedaPedido");
    const btnBuscarCliente = document.getElementById("btnBuscarCliente");
    const feedbackDni = document.getElementById("feedbackDni");
    const divInfoCliente = document.getElementById("infoClienteSeleccionado");
    const spanNombreCliente = document.getElementById("nombreClienteActivo");
    const btnDesmarcarCliente = document.getElementById("btnDesmarcarCliente");

    // Sección Libros
    const inputIsbn = document.getElementById("isbnBusquedaPedido");
    const btnBuscarLibro = document.getElementById("btnBuscarLibroPedido");
    const infoLibro = document.getElementById("infoLibroEncontrado");
    const inputUnidades = document.getElementById("unidadesPedido");
    const btnAnadirLibro = document.getElementById("btnAnadirLibro");
    const msgErrorLibro = document.getElementById("msgErrorLibro");

    // Sección Envío y Resumen
    const selectEnvio = document.getElementById("selectEnvio");
    const msgErrorEnvio = document.getElementById("msgErrorEnvio");
    const tbodyResumen = document.getElementById("tbodyResumen");
    const spanSubtotal = document.getElementById("resumenSubtotal");
    const spanIva = document.getElementById("resumenIva");
    const spanTotal = document.getElementById("resumenTotal");

    // Botones finales
    const btnPagar = document.getElementById("btnPagarPedido");
    const btnCancelar = document.getElementById("btnCancelarPedido");
    const msgGlobal = document.getElementById("msgGlobal");

    if (selectEnvio) {
        const listaEnvios = tienda.tiposEnvios.lista || [];
        selectEnvio.innerHTML = '<option value="" selected disabled>-- Selecciona Envío --</option>' +
            listaEnvios.map(t =>
                `<option value="${t.nombre}">${t.nombre} (Coste: ${t.precio.toFixed(2)}€ | Max: ${t.pesoMax}kg)</option>`
            ).join("");
    }
    // 1. GESTIÓN DE CLIENTES
    if (btnBuscarCliente) {
        btnBuscarCliente.addEventListener("click", () => {
            inputDni.classList.remove("is-invalid");
            const dniVal = parseInt(inputDni.value);

            if (!dniVal || isNaN(dniVal)) {
                inputDni.classList.add("is-invalid");
                if (feedbackDni) feedbackDni.innerText = "Por favor, introduce un DNI numérico válido.";
                return;
            }

            const cliente = tienda.clientes.buscarClientePorDNI(dniVal);

            if (cliente) {

                pedidoActivo = new Pedido(cliente);

                spanNombreCliente.innerText = cliente.nombreCompleto;
                divInfoCliente.classList.remove("d-none");

                inputDni.disabled = true;
                btnBuscarCliente.disabled = true;

                btnAcordeonLibros.disabled = false;
                btnAcordeonEnvio.disabled = false;
                btnPagar.disabled = false;
                btnCancelar.disabled = false;

                collapseLibros.show();
            } else {
                inputDni.classList.add("is-invalid");
                if (feedbackDni) feedbackDni.innerText = "No existe ningún cliente con ese DNI.";
                pedidoActivo = null;
            }
        });
    }

    if (btnDesmarcarCliente) {
        btnDesmarcarCliente.addEventListener("click", () => {
            resetearFormularioCompleto();
        });
    }

    // 2. GESTIÓN DE LIBROS
    if (btnBuscarLibro) {
        btnBuscarLibro.addEventListener("click", () => {
            infoLibro.className = "mt-2 small text-muted";
            msgErrorLibro.classList.add("d-none");

            const isbnVal = parseInt(inputIsbn.value);
            if (!isbnVal) return;

            const libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

            if (libro) {
                let textoInfo = `<strong>${libro.titulo}</strong> - ${libro.precio.toFixed(2)}€`;

                if (libro instanceof Ebook) {
                    textoInfo += ` <span class="badge bg-info">Ebook</span>`;
                    inputUnidades.value = 1;
                    inputUnidades.disabled = true;
                } else {
                    textoInfo += ` <span class="badge bg-warning text-dark">Papel (Stock: ${libro.stock})</span>`;
                    inputUnidades.disabled = false;
                }

                infoLibro.innerHTML = textoInfo;
                infoLibro.className = "mt-2 small text-success";
                btnAnadirLibro.disabled = false;
            } else {

                infoLibro.innerText = "No se ha encontrado ningún libro con ese ISBN.";
                infoLibro.className = "mt-2 small text-danger fw-bold";
                btnAnadirLibro.disabled = true;
            }
        });
    }

    if (btnAnadirLibro) {
        btnAnadirLibro.addEventListener("click", () => {
            if (!pedidoActivo) return;

            const isbnVal = parseInt(inputIsbn.value);
            const unidadesVal = parseInt(inputUnidades.value);
            const libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

            if (libro) {
                try {
                    if (libro instanceof LibroPapel && libro.stock < unidadesVal) {
                        throw new Error(`Stock insuficiente. Solo quedan ${libro.stock} unidades.`);
                    }

                    pedidoActivo.insertarLibro(libro, unidadesVal);

                    if (pedidoActivo.tipoEnvioPedido) {
                        const envioActual = pedidoActivo.tipoEnvioPedido;
                        try {
                            pedidoActivo.establecerTipoEnvio(envioActual);
                            msgErrorEnvio.classList.add("d-none");
                        } catch (errorPeso) {
                            alert(`Al añadir este libro, el envío "${envioActual.nombre}" ya no es válido por exceso de peso. Por favor, selecciona otro.`);
                            selectEnvio.value = "";
                            msgErrorEnvio.innerText = errorPeso.message;
                            msgErrorEnvio.classList.remove("d-none");
                        }
                    }

                    actualizarResumenVisual();
                    msgErrorLibro.classList.add("d-none");

                    const originalText = btnAnadirLibro.innerText;
                    btnAnadirLibro.innerText = "¡Añadido!";
                    btnAnadirLibro.classList.replace("btn-success", "btn-dark");
                    setTimeout(() => {
                        btnAnadirLibro.innerText = originalText;
                        btnAnadirLibro.classList.replace("btn-dark", "btn-success");
                    }, 1000);

                } catch (error) {
                    msgErrorLibro.innerText = error.message;
                    msgErrorLibro.classList.remove("d-none");
                }
            }
        });
    }

    // 3. GESTIÓN DE ENVÍOS
    if (selectEnvio) {
        selectEnvio.addEventListener("change", () => {
            if (!pedidoActivo) return;
            msgErrorEnvio.classList.add("d-none");

            const nombreEnvio = selectEnvio.value;
            const envioObj = tienda.tiposEnvios.lista.find(t => t.nombre === nombreEnvio);

            if (envioObj) {
                try {
                    const exito = pedidoActivo.establecerTipoEnvio(envioObj);

                    if (!exito) {
                        msgErrorEnvio.innerText = "Este pedido contiene solo Ebooks y no requiere envío físico.";
                        msgErrorEnvio.classList.remove("d-none");
                        selectEnvio.value = "";
                    }
                    actualizarResumenVisual();

                } catch (error) {
                    // Error de peso excedido, etc.
                    msgErrorEnvio.innerText = error.message;
                    msgErrorEnvio.classList.remove("d-none");
                    selectEnvio.value = "";
                    actualizarResumenVisual();
                }
            }
        });
    }

    // 4. GESTIÓN FINAL DEL PEDIDO

    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            if (!pedidoActivo) return;

            if (!pedidoActivo.hayLibros()) {
                alert("El carrito está vacío. Añade algún libro antes de pagar.");
                return;
            }
            // A) Comprobar si hay libros físicos en el pedido
            let hayLibrosFisicos = false;
            for (const item of pedidoActivo.librosPedido.values()) {
                if (item.libro instanceof LibroPapel) {
                    hayLibrosFisicos = true;
                    break;
                }
            }

            // B) Validar Envío (Solo obligatorio si hay físicos)
            if (hayLibrosFisicos && !pedidoActivo.tipoEnvioPedido) {
                alert("Tu pedido contiene libros físicos. Debes seleccionar un 'Tipo de Envío' en el paso 3.");
                collapseEnvio.show();
                return;
            }

            try {
                // C) Gestión de Stock (SOLO libros de papel)
                pedidoActivo.librosPedido.forEach(item => {

                    if (item.libro instanceof LibroPapel) {
                        // 1. Verificar stock actual
                        const stockActual = item.libro.stock; // Getter
                        const nuevoStock = stockActual - item.unidades;

                        if (nuevoStock < 0) {
                            throw new Error(`Stock insuficiente para "${item.libro.titulo}". Solo quedan ${stockActual}.`);
                        }

                        // 2. Actualizar stock (Llama al SETTER de tu clase LibroPapel)
                        item.libro.stock = nuevoStock;

                    } else if (item.libro instanceof Ebook) {
                        // Los Ebooks son digitales, no restamos stock.
                        console.log(`Generando enlace de descarga para: ${item.libro.titulo}`);
                    }
                });

                pedidoActivo.abierto = false;
                tienda.pedidos.insertarPedido([pedidoActivo]);

                if (msgGlobal) {
                    msgGlobal.className = "alert alert-success mb-3";
                    let mensaje = `¡Pedido #${pedidoActivo.id} completado con éxito! Total: ${pedidoActivo.precioTotalConEnvioConIVA.toFixed(2)}€`;
                    if (!hayLibrosFisicos) mensaje += " (Tus Ebooks están listos para descarga)";
                    msgGlobal.innerText = mensaje;
                    msgGlobal.classList.remove("d-none");
                } else {
                    alert(`¡Pedido pagado con éxito!`);
                }

                // Bloquear interfaz para evitar duplicados
                btnPagar.disabled = true;
                btnCancelar.disabled = true;
                btnAnadirLibro.disabled = true;
                if (btnDesmarcarCliente) btnDesmarcarCliente.disabled = true;

                // Reset tras unos segundos
                setTimeout(() => {
                    if (confirm("El pedido se ha procesado correctamente. ¿Deseas realizar otro pedido?")) {
                        resetearFormularioCompleto();
                    }
                }, 1500);

            } catch (e) {
                // Si falla el stock o algo crítico, mostramos error y NO cerramos el pedido
                alert("Error al procesar el pago: " + e.message);
                console.error(e);
            }
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres cancelar el pedido actual y borrar los datos?")) {
                resetearFormularioCompleto();
            }
        });
    }

    function actualizarResumenVisual() {
        if (!pedidoActivo) return;

        pedidoActivo.calcularTotal();

        tbodyResumen.innerHTML = "";

        pedidoActivo.librosPedido.forEach((item) => {
            const tr = document.createElement("tr");
            const totalLinea = item.libro.precio * item.unidades;
            tr.innerHTML = `
                <td>${item.libro.titulo} <small class="text-muted">(${item.libro instanceof Ebook ? 'Ebook' : 'Papel'})</small></td>
                <td>${item.unidades}</td>
                <td>${item.libro.precio.toFixed(2)}€</td>
                <td>${totalLinea.toFixed(2)}€</td>
            `;
            tbodyResumen.appendChild(tr);
        });


        if (pedidoActivo.tipoEnvioPedido) {
            const trEnvio = document.createElement("tr");
            trEnvio.className = "table-light text-muted small";
            trEnvio.innerHTML = `
                <td colspan="3">Gastos de Envío (${pedidoActivo.tipoEnvioPedido.nombre})</td>
                <td>${pedidoActivo.tipoEnvioPedido.precio.toFixed(2)}€</td>
            `;
            tbodyResumen.appendChild(trEnvio);
        }

        spanSubtotal.innerText = pedidoActivo.precioTotalConEnvioSinIVA.toFixed(2);

        const ivaTotal = pedidoActivo.precioTotalConEnvioConIVA - pedidoActivo.precioTotalConEnvioSinIVA;
        spanIva.innerText = ivaTotal.toFixed(2);

        spanTotal.innerText = pedidoActivo.precioTotalConEnvioConIVA.toFixed(2);
    }

    function resetearFormularioCompleto() {
        pedidoActivo = null;

        inputDni.value = "";
        inputDni.disabled = false;
        inputDni.classList.remove("is-invalid");
        btnBuscarCliente.disabled = false;
        divInfoCliente.classList.add("d-none");
        spanNombreCliente.innerText = "";

        inputIsbn.value = "";
        infoLibro.innerHTML = "(Introduce ISBN para buscar)";
        infoLibro.className = "small text-muted mt-2";
        inputUnidades.value = 1;
        inputUnidades.disabled = false;
        btnAnadirLibro.disabled = true;
        msgErrorLibro.classList.add("d-none");

        selectEnvio.value = "";
        msgErrorEnvio.classList.add("d-none");

        
        tbodyResumen.innerHTML = "";
        spanSubtotal.innerText = "0.00";
        spanIva.innerText = "0.00";
        spanTotal.innerText = "0.00";
        if (msgGlobal) msgGlobal.classList.add("d-none");

        btnAcordeonLibros.disabled = true;
        btnAcordeonEnvio.disabled = true;
        btnPagar.disabled = true;
        btnCancelar.disabled = true;

        collapseLibros.hide();
        collapseEnvio.hide();
        collapseCliente.show();
    }
}

