console.log("T04 - Ejercicio 01: Clientes");

class Clientes{
    
    #listadoClientes;
    
    constructor(){
        this.#listadoClientes=[];
    }

    get listadoClientes(){
        return this.#listadoClientes;
    }
    existeClientePorDNI(dniAbuscar){
        const dni = Number(dniAbuscar);
        const clienteEncontrado = this.listadoClientes.find(cliente => cliente.dni === dni);
        return !!clienteEncontrado; 
    }
    insertarClientes(listaClientes){
        if(!Array.isArray(listaClientes)){
            throw new Error ("Se esperaba un array de clientes.");
        }
        let contadorClientes=0;
        
        listaClientes.forEach(cliente => {
            if(this.existeClientePorDNI(cliente.dni)){
                console.log(`Advertencia: El cliente con DNI ${cliente.dni} ya existe.`);
                return;
            }
            this.listadoClientes.push(cliente);
            contadorClientes++;
        });
        
        return contadorClientes;
    }
    buscarClientePorDNI(dniAbuscar){
        const dni = Number (dniAbuscar);
        const clienteEncontrado = this.listadoClientes.find(cliente => cliente.dni === dni);
        return clienteEncontrado; 
    }
    borrarClientePorDNI(dniAborrar, pedidosSistema) {
        const dni = Number (dniAborrar);
        const indice = this.listadoClientes.findIndex(cliente => cliente.dni === dni);
        if(indice === -1){
            console.log(`No se ha encontrado el cliente con DNI ${dni}`);
            return false;
        }   
        const cliente = this.listadoClientes[indice];
        if(typeof pedidosSistema !== 'undefined' && pedidosSistema.borrarPedidos){
            const idsPedidos = cliente.pedidosCliente.map(pedido=>pedido.id);
            pedidosSistema.borrarPedidos(idsPedidos);
            console.log(`Pedidos asociados al cliente con DNI ${dni} eliminados del sistema de pedidos.`);
        }
        this.listadoClientes.splice(indice, 1);
        return true;
    }

}