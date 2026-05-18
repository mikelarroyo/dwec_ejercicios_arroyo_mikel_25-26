"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log("T04 - Ejercicio 01");

var LeerDatos =
/*#__PURE__*/
function () {
  function LeerDatos() {
    _classCallCheck(this, LeerDatos);
  }

  _createClass(LeerDatos, [{
    key: "leerEntero",
    // Métodos abstractos (No se modifican)
    value: function leerEntero(mensaje_o_id) {
      throw new Error("Método abstracto: leerEntero() debe ser implementado.");
    }
  }, {
    key: "leerEnteroHasta",
    value: function leerEnteroHasta(mensaje_o_id) {
      throw new Error("Método abstracto: leerEnteroHasta() debe ser implementado.");
    }
  }, {
    key: "leerReal",
    value: function leerReal(mensaje_o_id) {
      throw new Error("Método abstracto: leerReal() debe ser implementado.");
    }
  }, {
    key: "leerEnteroEntre",
    value: function leerEnteroEntre(mensaje_o_id, min, max) {
      throw new Error("Método abstracto: leerEnteroEntre() debe ser implementado.");
    }
  }, {
    key: "leerEnteroEntreHasta",
    value: function leerEnteroEntreHasta(mensaje_o_id, min, max) {
      throw new Error("Método abstracto: leerEnteroEntreHasta() debe ser implementado.");
    }
  }, {
    key: "leerCadena",
    value: function leerCadena(mensaje_o_id, longitud, patron) {
      throw new Error("Método abstracto: leerCadena() debe ser implementado.");
    }
  }, {
    key: "leerCadenaHasta",
    value: function leerCadenaHasta(mensaje_o_id, longitud, patron) {
      throw new Error("Método abstracto: leerCadenaHasta() debe ser implementado.");
    }
  }]);

  return LeerDatos;
}();

var LeerDatosPrompt =
/*#__PURE__*/
function (_LeerDatos) {
  _inherits(LeerDatosPrompt, _LeerDatos);

  function LeerDatosPrompt() {
    _classCallCheck(this, LeerDatosPrompt);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeerDatosPrompt).apply(this, arguments));
  }

  _createClass(LeerDatosPrompt, [{
    key: "leerEntero",
    value: function leerEntero(mensaje_o_id) {
      var texto = prompt(mensaje_o_id);

      if (texto === null) {
        throw new Error("Entrada cancelada por el usuario.");
      }

      var num = Number(texto); // 2. Comprobación de validación

      if (!Util.validarEntero(num)) {
        throw new Error("Debe introducir un número entero.");
      }

      return num;
    }
  }, {
    key: "leerReal",
    value: function leerReal(mensaje_o_id) {
      var texto = prompt(mensaje_o_id); // 1. Comprobación de cancelación (null)

      if (texto === null) {
        throw new Error("Entrada cancelada por el usuario.");
      }

      var num = Number(texto); // 2. Comprobación de validación

      if (!Util.validarReal(num)) {
        throw new Error("Debe introducir un número real.");
      }

      return num;
    }
  }, {
    key: "leerEnteroEntre",
    value: function leerEnteroEntre(mensaje_o_id, min, max) {
      // Llama a leerEntero, que ya maneja la cancelación y validación de entero
      var num = this.leerEntero(mensaje_o_id);

      if (num < min || num > max) {
        throw new Error("El n\xFAmero debe estar entre ".concat(min, " y ").concat(max, "."));
      }

      return num;
    }
    /**
     * Lee una cadena. Longitud mínima es 1 por defecto.
     */

  }, {
    key: "leerCadena",
    value: function leerCadena(mensaje_o_id, longitud, patron) {
      var texto = prompt(mensaje_o_id); // 1. Comprobación de cancelación (null)

      if (texto === null) {
        throw new Error("Entrada cancelada por el usuario.");
      }

      var clean = texto.trim(); // Determinar la longitud mínima (1 por defecto si no se proporciona)

      var longitudMinima = longitud !== undefined && longitud !== null ? Number(longitud) : 1; // 2. Validación de longitud mínima

      if (clean.length < longitudMinima) {
        throw new Error("La cadena debe tener al menos ".concat(longitudMinima, " caracteres."));
      } // 3. Validación de patrón (solo si se proporciona)


      if (patron instanceof RegExp && !patron.test(clean)) {
        throw new Error("La cadena no cumple el formato requerido.");
      }

      return clean;
    } // --- MÉTODOS REPETITIVOS (Usan do...while y try...catch) ---

  }, {
    key: "leerEnteroHasta",
    value: function leerEnteroHasta(mensaje_o_id) {
      var resultado = null;
      var valido = false;

      do {
        try {
          // Llama al método base. Si es válido, asigna y establece valido=true.
          resultado = this.leerEntero(mensaje_o_id);
          valido = true;
        } catch (error) {
          // Propagamos cancelación inmediatamente
          if (error.message.includes("cancelada")) {
            throw error;
          } // Si es por validación, mostramos mensaje y el bucle repite


          console.log("Error de validaci\xF3n: ".concat(error.message, ". Vuelva a intentar."));
        }
      } while (!valido);

      return resultado;
    }
  }, {
    key: "leerEnteroEntreHasta",
    value: function leerEnteroEntreHasta(mensaje_o_id, min, max) {
      var resultado = null;
      var valido = false;

      do {
        try {
          // Llama al método base. Si es válido, asigna y establece valido=true.
          resultado = this.leerEnteroEntre(mensaje_o_id, min, max);
          valido = true;
        } catch (error) {
          if (error.message.includes("cancelada")) {
            throw error;
          }

          console.log("Error de validaci\xF3n: ".concat(error.message, ". Vuelva a intentar."));
        }
      } while (!valido);

      return resultado;
    }
  }, {
    key: "leerCadenaHasta",
    value: function leerCadenaHasta(mensaje_o_id, longitud, patron) {
      var resultado = null;
      var valido = false;

      do {
        try {
          // Llama al método base. Si es válido, asigna y establece valido=true.
          resultado = this.leerCadena(mensaje_o_id, longitud, patron);
          valido = true;
        } catch (error) {
          if (error.message.includes("cancelada")) {
            throw error;
          }

          console.log("Error de validaci\xF3n: ".concat(error.message, ". Vuelva a intentar."));
        }
      } while (!valido);

      return resultado;
    }
  }, {
    key: "leerMoneda",
    value: function leerMoneda(mensaje_o_id) {
      var simbolo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "€";
      var entrada = prompt(mensaje_o_id);
      if (entrada === null) throw new Error("Entrada cancelada.");
      entrada = entrada.trim();
      var regex = new RegExp("^\\d+(\\.\\d{1,2})?\\s*\\".concat(simbolo, "$"));
      if (!regex.test(entrada)) throw new Error("Formato de moneda no válido.");
      return entrada;
    }
  }, {
    key: "leerListaSeparadaPorComas",
    value: function leerListaSeparadaPorComas(mensaje_o_id) {
      var entrada = prompt(mensaje_o_id);
      if (entrada === null) throw new Error("Entrada cancelada.");
      var lista = entrada.split(",").map(function (x) {
        return x.trim();
      });
      if (lista.some(function (x) {
        return x.length === 0;
      })) throw new Error("Elementos vacíos no permitidos.");
      return lista; // devuelve ARRAY
    }
  }, {
    key: "leerEnteroPar",
    value: function leerEnteroPar(mensaje_o_id) {
      var num = this.leerEntero(mensaje_o_id);
      if (num % 2 !== 0) throw new Error("Debe ser un número par.");
      return num;
    }
  }]);

  return LeerDatosPrompt;
}(LeerDatos);