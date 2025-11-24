console.log("T04 - Ejercicio 01: Tienda");

class Tienda {
    static IVA = 0.21;

    #nombre;
    #libros;        
    #autores;       
    #tiposEnvios;
    #clientes;
    #pedidos;
    #lector;
    
    constructor(nombreTienda) {
        if (typeof nombreTienda !== 'string' || nombreTienda.trim().length === 0) {
            throw new Error("El nombre de la tienda es inválido.");
        }
        this.#nombre = nombreTienda.trim();
        this.#libros = new Libros(); 
     
        
        console.log(`Tienda '${this.#nombre}' construida.`);
    }
    get libros() { return this.#libros; }

    cargarDatosPrueba() {
        console.log("\n-1. Creando Datos de Prueba para la creacion de Libros");
        const autorLiteral = { nombreCompleto: "Ray Bradbury" }; 
        const autoresArray = [autorLiteral];        
        const libroPapel = new LibroPapel(421, "Don quijote", autoresArray, "historico", 22.99, 0.35, "20x15x2", 5 
        );
        const ebook = new Ebook(200, "Señor de los anillos", autoresArray, "ciencia ficcion", 8.99, 3.0, "epub" 
        );
        this.#libros.insertarLibros([libroPapel, ebook]);
        console.log(`Libros insertados en el catálogo: ${this.#libros.listadoLibros.length}`);
    }

    iniciar() {
        try {
            this.cargarDatosPrueba();

            console.log("\n-2. Pruebas de Clase Libro y Libros -");
            console.log(this.#libros.obtenerCadenaLibrosMenu());
            const libroBuscado = this.#libros.buscarLibroPorIsbn(421);
            if (libroBuscado) {
                libroBuscado.aplicarDescuentoLibro(10);
                console.log(`\nPrecio de don quijote con 10% descuento: ${libroBuscado.precio.toFixed(2)} €`);
            }

            try {
                libroBuscado.stock = 0; 
            } catch (error) {
                console.error(`Error esperado (Stock): ${error.message}`);
            }
            
        } catch (error) {
            console.error("\n--- ERROR DURANTE LA INICIALIZACIÓN ---");
            console.error(`Fallo: ${error.message}`);
        }
    }
}