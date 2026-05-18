"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LeerDatosForm =
/*#__PURE__*/
function (_LeerDatos) {
  _inherits(LeerDatosForm, _LeerDatos);

  function LeerDatosForm() {
    _classCallCheck(this, LeerDatosForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeerDatosForm).apply(this, arguments));
  }

  _createClass(LeerDatosForm, [{
    key: "leerTextoObligatorio",
    value: function leerTextoObligatorio(valor) {
      var v = valor.trim();
      return v.length > 0 ? v : null;
    }
  }, {
    key: "leerDNI",
    value: function leerDNI(valor) {
      var v = valor.trim();
      return /^[0-9]{8}$/.test(v) ? v : null;
    }
  }, {
    key: "leerISBN",
    value: function leerISBN(valor) {
      var v = valor.trim();
      return /^[0-9]{10}([0-9]{3})?$/.test(v) ? v : null;
    }
  }, {
    key: "leerNumeroPositivo",
    value: function leerNumeroPositivo(valor) {
      var n = Number(valor);
      return !isNaN(n) && n > 0 ? n : null;
    }
  }, {
    key: "leerRealPositivo",
    value: function leerRealPositivo(valor) {
      var n = Number(valor); // Validamos que sea número finito y mayor que 0

      return !isNaN(n) && Number.isFinite(n) && n > 0 ? n : null;
    }
  }, {
    key: "leerEnteroPositivo",
    value: function leerEnteroPositivo(valor) {
      var n = Number(valor);
      return Number.isInteger(n) && n > 0 ? n : null;
    }
  }]);

  return LeerDatosForm;
}(LeerDatos);