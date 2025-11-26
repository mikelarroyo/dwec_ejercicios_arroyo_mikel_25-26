console.log("T04 - Ejercicio 01 - Clase Pedidos");

class Pedidos {

    #listadoPedidos;

    constructor() {
        this.#listadoPedidos = [];
    }


    existePedidoPorID(idAbuscar) {
        return this.#listadoPedidos.some(p => p.id === idAbuscar);
    }


    insertarPedido(pedidos) {
        if (!Array.isArray(pedidos)) throw new Error("Debe recibir un array de pedidos.");

        let insertados = 0;

        for (let p of pedidos) {
            if (!p) continue;

            // No modificar pedidos existentes
            if (!this.existePedidoPorID(p.id)) {
                this.#listadoPedidos.push(p);
                insertados++;
            }
        }
        return insertados;
    }


    buscarPedidoPorId(idAbuscar) {
        for (let p of this.#listadoPedidos) {
            if (p.id === idAbuscar) return p;
        }
        return null;
    }

    cerrarPedidoPorId(idAbuscar) {
        const pedido = this.buscarPedidoPorId(idAbuscar);

        if (!pedido) return false;
        if (!pedido.abierto) return false;

        pedido.abierto = false;
        return true;
    }

    borrarPedidos(pedidosAborrar) {
        if (!Array.isArray(pedidosAborrar)) return false;

        for (let pedido of pedidosAborrar) {
            const indice = this.#listadoPedidos.findIndex(p => p.id === pedido.id);
            if (indice === -1) return false; // Si uno falla → false total
        }

        for (let pedido of pedidosAborrar) {
            const indice = this.#listadoPedidos.findIndex(p => p.id === pedido.id);
            this.#listadoPedidos.splice(indice, 1);
        }

        return true;
    }
    listarTodos() {
        return this.#listadoPedidos;
    }

}
