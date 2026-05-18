"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var pedidoActivo = null;
document.addEventListener("DOMContentLoaded", function () {
  var tienda = Tienda.getInstancia("Mi Librería DWEC");
  tienda.cargarDatosPrueba();
  var lector = new LeerDatosForm(); //pagina 1

  var tbodyLibros = document.querySelector("#tablaLibros tbody");

  if (tbodyLibros) {
    var inputBusqueda = document.getElementById("inputBusqueda");
    var btnBuscar = document.getElementById("btnBuscar");

    var ejecutarBusqueda = function ejecutarBusqueda() {
      var termino = inputBusqueda ? inputBusqueda.value : "";
      tbodyLibros.innerHTML = tienda.renderizarTablaCatalogo(termino);
    };

    ejecutarBusqueda();
    if (btnBuscar) btnBuscar.addEventListener("click", ejecutarBusqueda);

    if (inputBusqueda) {
      inputBusqueda.addEventListener("keypress", function (e) {
        if (e.key === "Enter") ejecutarBusqueda();
      });
    }

    tbodyLibros.addEventListener("click", function (e) {
      var btn = e.target.closest(".btn-detalles");

      if (btn) {
        var isbn = btn.dataset.isbn;
        var info = tienda.obtenerDetallesLibroHTML(isbn);

        if (info) {
          document.getElementById("modalTitulo").innerText = info.titulo;
          document.getElementById("modalContenido").innerHTML = info.cuerpo;
          new bootstrap.Modal(document.getElementById("modalDetalles")).show();
        }
      }
    });
  } //pagina 2


  var formCliente = document.getElementById("formCliente");

  if (formCliente) {
    var tbodyClientes = document.querySelector("#tablaClientes tbody");

    var refrescarTablaClientes = function refrescarTablaClientes() {
      if (tbodyClientes) tbodyClientes.innerHTML = tienda.renderizarTablaClientes();
    };

    refrescarTablaClientes();

    if (tbodyClientes) {
      tbodyClientes.addEventListener("click", function (e) {
        var btn = e.target.closest(".btn-pedidos");

        if (btn) {
          var dni = btn.dataset.dni;
          var infoPedidos = tienda.obtenerPedidosClienteHTML(dni);
          var panel = document.getElementById("panelPedidos");

          if (infoPedidos && panel) {
            document.getElementById("nombreClientePedido").innerText = infoPedidos.nombre;
            document.getElementById("contenedorCards").innerHTML = infoPedidos.htmlCards;
            panel.classList.remove("d-none");
          }
        }
      });
    }

    formCliente.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var inputDni = document.getElementById("dni");

      if (tienda.clientes.existeClientePorDNI(inputDni.value)) {
        inputDni.setCustomValidity("El DNI ya existe.");
      } else {
        inputDni.setCustomValidity("");
      }

      if (formCliente.checkValidity()) {
        try {
          var dni = lector.leerDNI(inputDni.value);
          var nombre = lector.leerTextoObligatorio(document.getElementById("nombre").value);
          var direccion = lector.leerTextoObligatorio(document.getElementById("direccion").value);

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
  } // ======================================================
  // PÁGINAS 3 Y 4 (Gestión separada)
  // ======================================================


  var formLibro = document.getElementById("formLibro");

  if (formLibro) {
    iniciarGestionLibros(tienda, formLibro, lector);
  }

  var btnBuscarC = document.getElementById("btnBuscarCliente");

  if (btnBuscarC) {
    iniciarGestionPedidos(tienda, lector);
  }
}); // FUNCIONES AUXILIARES

function iniciarGestionLibros(tienda, formLibro, lector) {
  console.log("--> Iniciando gestión de libros...");
  var selectGenero = document.getElementById("genero");
  var selectAutores = document.getElementById("autoresSelect");

  if (selectGenero) {
    var generosSet = Libro.GENEROS_LITERARIOS || Libro.GENEROS || new Set(["novela", "ciencia ficcion", "fantasia"]);
    var html = '<option value="" selected disabled>Selecciona un género...</option>';
    generosSet.forEach(function (g) {
      var texto = g.charAt(0).toUpperCase() + g.slice(1);
      html += "<option value=\"".concat(g, "\">").concat(texto, "</option>");
    });
    selectGenero.innerHTML = html;
  } // B) Autores: Función para recargar la lista


  var cargarAutores = function cargarAutores() {
    if (selectAutores) {
      var ordenados = _toConsumableArray(tienda.autores.listadoAutores).sort(function (a, b) {
        return a.nombreCompleto.localeCompare(b.nombreCompleto);
      });

      selectAutores.innerHTML = ordenados.map(function (a) {
        return "<option value=\"".concat(a.nombreCompleto, "\">").concat(a.nombreCompleto, "</option>");
      }).join("");
    }
  };

  cargarAutores();
  var selectTipo = document.getElementById("tipoLibro");
  var divPapel = document.getElementById("camposPapel");
  var divEbook = document.getElementById("camposEbook");
  var radioExistente = document.getElementById("modoExistente");
  var radioNuevo = document.getElementById("modoNuevo");
  var divAutorSelect = document.getElementById("divAutorSelect");
  var divAutorNuevo = document.getElementById("divAutorNuevo");
  var inputNuevoAutor = document.getElementById("nuevoAutorNombre");

  var actualizarTipo = function actualizarTipo() {
    var esPapel = selectTipo.value === "papel";

    if (esPapel) {
      divPapel.classList.remove("d-none");
      divEbook.classList.add("d-none");
      document.getElementById("peso").required = true;
      document.getElementById("dimensiones").required = true;
      document.getElementById("stock").required = true;
      document.getElementById("tamanio").required = false;
    } else {
      divPapel.classList.add("d-none");
      divEbook.classList.remove("d-none"); // Ajustamos required

      document.getElementById("peso").required = false;
      document.getElementById("dimensiones").required = false;
      document.getElementById("stock").required = false;
      document.getElementById("tamanio").required = true;
    }
  };

  selectTipo.addEventListener("change", actualizarTipo);
  actualizarTipo();

  var actualizarModoAutor = function actualizarModoAutor() {
    var esNuevo = radioNuevo.checked;

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
  formLibro.addEventListener("submit", function (e) {
    e.preventDefault();
    var inputIsbn = document.getElementById("isbn");
    var isbnVal = lector.leerEnteroPositivo(inputIsbn.value);

    if (tienda.libros.existeLibroPorIsbn(isbnVal)) {
      inputIsbn.setCustomValidity("El ISBN ya existe.");
    } else {
      inputIsbn.setCustomValidity("");
    }

    var autorNuevoObj = null;
    var autoresSeleccionados = [];

    if (radioNuevo.checked) {
      var nombreNuevo = inputNuevoAutor.value.trim();
      var existe = tienda.autores.listadoAutores.some(function (a) {
        return a.nombreCompleto.toLowerCase() === nombreNuevo.toLowerCase();
      });

      if (existe) {
        inputNuevoAutor.setCustomValidity("Este autor ya existe. Selecciónalo de la lista.");
      } else if (nombreNuevo.length < 3) {
        inputNuevoAutor.setCustomValidity("El nombre es muy corto.");
      } else {
        inputNuevoAutor.setCustomValidity("");
        autorNuevoObj = new Autor(nombreNuevo);
      }
    } else {
      autoresSeleccionados = Array.from(selectAutores.selectedOptions).map(function (opt) {
        return tienda.autores.listadoAutores.find(function (a) {
          return a.nombreCompleto === opt.value;
        });
      });
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
        alert("Autor \"".concat(autorNuevoObj.nombreCompleto, "\" creado correctamente."));
      }

      var titulo = lector.leerTextoObligatorio(document.getElementById("titulo").value);
      var precio = lector.leerRealPositivo(document.getElementById("precio").value);
      var genero = document.getElementById("genero").value;
      var nuevoLibro = null;

      if (selectTipo.value === "papel") {
        var peso = lector.leerRealPositivo(document.getElementById("peso").value);
        var dimensiones = document.getElementById("dimensiones").value;
        var stock = lector.leerEnteroPositivo(document.getElementById("stock").value);
        nuevoLibro = new LibroPapel(isbnVal, titulo, autoresSeleccionados, genero, precio, peso, dimensiones, stock);
      } else {
        var tamanio = lector.leerRealPositivo(document.getElementById("tamanio").value);
        var formato = document.getElementById("formato").value;
        nuevoLibro = new Ebook(isbnVal, titulo, autoresSeleccionados, genero, precio, tamanio, formato);
      }

      if (nuevoLibro) {
        tienda.libros.insertarLibros([nuevoLibro]);
        autoresSeleccionados.forEach(function (a) {
          return a.insertarLibro(nuevoLibro);
        });
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
  var btnAcordeonLibros = document.getElementById("btnAcordeonLibros");
  var btnAcordeonEnvio = document.getElementById("btnAcordeonEnvio");
  var collapseCliente, collapseLibros, collapseEnvio;

  try {
    collapseCliente = new bootstrap.Collapse(document.getElementById('collapseCliente'), {
      toggle: false
    });
    collapseLibros = new bootstrap.Collapse(document.getElementById('collapseLibros'), {
      toggle: false
    });
    collapseEnvio = new bootstrap.Collapse(document.getElementById('collapseEnvio'), {
      toggle: false
    });
  } catch (e) {
    console.error("Error al iniciar acordeones Bootstrap. Revisa los IDs en el PUG.", e);
    return;
  } // Sección Cliente


  var inputDni = document.getElementById("dniBusquedaPedido");
  var btnBuscarCliente = document.getElementById("btnBuscarCliente");
  var feedbackDni = document.getElementById("feedbackDni");
  var divInfoCliente = document.getElementById("infoClienteSeleccionado");
  var spanNombreCliente = document.getElementById("nombreClienteActivo");
  var btnDesmarcarCliente = document.getElementById("btnDesmarcarCliente"); // Sección Libros

  var inputIsbn = document.getElementById("isbnBusquedaPedido");
  var btnBuscarLibro = document.getElementById("btnBuscarLibroPedido");
  var infoLibro = document.getElementById("infoLibroEncontrado");
  var inputUnidades = document.getElementById("unidadesPedido");
  var btnAnadirLibro = document.getElementById("btnAnadirLibro");
  var msgErrorLibro = document.getElementById("msgErrorLibro"); // Sección Envío y Resumen

  var selectEnvio = document.getElementById("selectEnvio");
  var msgErrorEnvio = document.getElementById("msgErrorEnvio");
  var tbodyResumen = document.getElementById("tbodyResumen");
  var spanSubtotal = document.getElementById("resumenSubtotal");
  var spanIva = document.getElementById("resumenIva");
  var spanTotal = document.getElementById("resumenTotal"); // Botones finales

  var btnPagar = document.getElementById("btnPagarPedido");
  var btnCancelar = document.getElementById("btnCancelarPedido");
  var msgGlobal = document.getElementById("msgGlobal");

  if (selectEnvio) {
    var listaEnvios = tienda.tiposEnvios.lista || [];
    selectEnvio.innerHTML = '<option value="" selected disabled>-- Selecciona Envío --</option>' + listaEnvios.map(function (t) {
      return "<option value=\"".concat(t.nombre, "\">").concat(t.nombre, " (Coste: ").concat(t.precio.toFixed(2), "\u20AC | Max: ").concat(t.pesoMax, "kg)</option>");
    }).join("");
  } // 1. GESTIÓN DE CLIENTES


  if (btnBuscarCliente) {
    btnBuscarCliente.addEventListener("click", function () {
      inputDni.classList.remove("is-invalid");
      var dniVal = parseInt(inputDni.value);

      if (!dniVal || isNaN(dniVal)) {
        inputDni.classList.add("is-invalid");
        if (feedbackDni) feedbackDni.innerText = "Por favor, introduce un DNI numérico válido.";
        return;
      }

      var cliente = tienda.clientes.buscarClientePorDNI(dniVal);

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
    btnDesmarcarCliente.addEventListener("click", function () {
      resetearFormularioCompleto();
    });
  } // 2. GESTIÓN DE LIBROS


  if (btnBuscarLibro) {
    btnBuscarLibro.addEventListener("click", function () {
      infoLibro.className = "mt-2 small text-muted";
      msgErrorLibro.classList.add("d-none");
      var isbnVal = parseInt(inputIsbn.value);
      if (!isbnVal) return;
      var libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

      if (libro) {
        var textoInfo = "<strong>".concat(libro.titulo, "</strong> - ").concat(libro.precio.toFixed(2), "\u20AC");

        if (libro instanceof Ebook) {
          textoInfo += " <span class=\"badge bg-info\">Ebook</span>";
          inputUnidades.value = 1;
          inputUnidades.disabled = true;
        } else {
          textoInfo += " <span class=\"badge bg-warning text-dark\">Papel (Stock: ".concat(libro.stock, ")</span>");
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
    btnAnadirLibro.addEventListener("click", function () {
      if (!pedidoActivo) return;
      var isbnVal = parseInt(inputIsbn.value);
      var unidadesVal = parseInt(inputUnidades.value);
      var libro = tienda.libros.buscarLibroPorIsbn(isbnVal);

      if (libro) {
        try {
          if (libro instanceof LibroPapel && libro.stock < unidadesVal) {
            throw new Error("Stock insuficiente. Solo quedan ".concat(libro.stock, " unidades."));
          }

          pedidoActivo.insertarLibro(libro, unidadesVal);

          if (pedidoActivo.tipoEnvioPedido) {
            var envioActual = pedidoActivo.tipoEnvioPedido;

            try {
              pedidoActivo.establecerTipoEnvio(envioActual);
              msgErrorEnvio.classList.add("d-none");
            } catch (errorPeso) {
              alert("Al a\xF1adir este libro, el env\xEDo \"".concat(envioActual.nombre, "\" ya no es v\xE1lido por exceso de peso. Por favor, selecciona otro."));
              selectEnvio.value = "";
              msgErrorEnvio.innerText = errorPeso.message;
              msgErrorEnvio.classList.remove("d-none");
            }
          }

          actualizarResumenVisual();
          msgErrorLibro.classList.add("d-none");
          var originalText = btnAnadirLibro.innerText;
          btnAnadirLibro.innerText = "¡Añadido!";
          btnAnadirLibro.classList.replace("btn-success", "btn-dark");
          setTimeout(function () {
            btnAnadirLibro.innerText = originalText;
            btnAnadirLibro.classList.replace("btn-dark", "btn-success");
          }, 1000);
        } catch (error) {
          msgErrorLibro.innerText = error.message;
          msgErrorLibro.classList.remove("d-none");
        }
      }
    });
  } // 3. GESTIÓN DE ENVÍOS


  if (selectEnvio) {
    selectEnvio.addEventListener("change", function () {
      if (!pedidoActivo) return;
      msgErrorEnvio.classList.add("d-none");
      var nombreEnvio = selectEnvio.value;
      var envioObj = tienda.tiposEnvios.lista.find(function (t) {
        return t.nombre === nombreEnvio;
      });

      if (envioObj) {
        try {
          var exito = pedidoActivo.establecerTipoEnvio(envioObj);

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
  } // 4. GESTIÓN FINAL DEL PEDIDO


  if (btnPagar) {
    btnPagar.addEventListener("click", function () {
      if (!pedidoActivo) return;

      if (!pedidoActivo.hayLibros()) {
        alert("El carrito está vacío. Añade algún libro antes de pagar.");
        return;
      } // A) Comprobar si hay libros físicos en el pedido


      var hayLibrosFisicos = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = pedidoActivo.librosPedido.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.libro instanceof LibroPapel) {
            hayLibrosFisicos = true;
            break;
          }
        } // B) Validar Envío (Solo obligatorio si hay físicos)

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (hayLibrosFisicos && !pedidoActivo.tipoEnvioPedido) {
        alert("Tu pedido contiene libros físicos. Debes seleccionar un 'Tipo de Envío' en el paso 3.");
        collapseEnvio.show();
        return;
      }

      try {
        // C) Gestión de Stock (SOLO libros de papel)
        pedidoActivo.librosPedido.forEach(function (item) {
          if (item.libro instanceof LibroPapel) {
            // 1. Verificar stock actual
            var stockActual = item.libro.stock; // Getter

            var nuevoStock = stockActual - item.unidades;

            if (nuevoStock < 0) {
              throw new Error("Stock insuficiente para \"".concat(item.libro.titulo, "\". Solo quedan ").concat(stockActual, "."));
            } // 2. Actualizar stock (Llama al SETTER de tu clase LibroPapel)


            item.libro.stock = nuevoStock;
          } else if (item.libro instanceof Ebook) {
            // Los Ebooks son digitales, no restamos stock.
            console.log("Generando enlace de descarga para: ".concat(item.libro.titulo));
          }
        });
        pedidoActivo.abierto = false;
        tienda.pedidos.insertarPedido([pedidoActivo]);

        if (msgGlobal) {
          msgGlobal.className = "alert alert-success mb-3";
          var mensaje = "\xA1Pedido #".concat(pedidoActivo.id, " completado con \xE9xito! Total: ").concat(pedidoActivo.precioTotalConEnvioConIVA.toFixed(2), "\u20AC");
          if (!hayLibrosFisicos) mensaje += " (Tus Ebooks están listos para descarga)";
          msgGlobal.innerText = mensaje;
          msgGlobal.classList.remove("d-none");
        } else {
          alert("\xA1Pedido pagado con \xE9xito!");
        } // Bloquear interfaz para evitar duplicados


        btnPagar.disabled = true;
        btnCancelar.disabled = true;
        btnAnadirLibro.disabled = true;
        if (btnDesmarcarCliente) btnDesmarcarCliente.disabled = true; // Reset tras unos segundos

        setTimeout(function () {
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
    btnCancelar.addEventListener("click", function () {
      if (confirm("¿Estás seguro de que quieres cancelar el pedido actual y borrar los datos?")) {
        resetearFormularioCompleto();
      }
    });
  }

  function actualizarResumenVisual() {
    if (!pedidoActivo) return;
    pedidoActivo.calcularTotal();
    tbodyResumen.innerHTML = "";
    pedidoActivo.librosPedido.forEach(function (item) {
      var tr = document.createElement("tr");
      var totalLinea = item.libro.precio * item.unidades;
      tr.innerHTML = "\n                <td>".concat(item.libro.titulo, " <small class=\"text-muted\">(").concat(item.libro instanceof Ebook ? 'Ebook' : 'Papel', ")</small></td>\n                <td>").concat(item.unidades, "</td>\n                <td>").concat(item.libro.precio.toFixed(2), "\u20AC</td>\n                <td>").concat(totalLinea.toFixed(2), "\u20AC</td>\n            ");
      tbodyResumen.appendChild(tr);
    });

    if (pedidoActivo.tipoEnvioPedido) {
      var trEnvio = document.createElement("tr");
      trEnvio.className = "table-light text-muted small";
      trEnvio.innerHTML = "\n                <td colspan=\"3\">Gastos de Env\xEDo (".concat(pedidoActivo.tipoEnvioPedido.nombre, ")</td>\n                <td>").concat(pedidoActivo.tipoEnvioPedido.precio.toFixed(2), "\u20AC</td>\n            ");
      tbodyResumen.appendChild(trEnvio);
    }

    spanSubtotal.innerText = pedidoActivo.precioTotalConEnvioSinIVA.toFixed(2);
    var ivaTotal = pedidoActivo.precioTotalConEnvioConIVA - pedidoActivo.precioTotalConEnvioSinIVA;
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