console.log("T04 - Ejercicio 01");

document.addEventListener('DOMContentLoaded', () => {
    // Busca el botón con el ID 'btn-comprar'
    const boton = document.getElementById('btn-comprar');
    
    if (boton) {
        // Si el botón existe, adjunta el evento para llamar a main()
        boton.addEventListener('click', () => {
            main();  
        });
    } else {
        // Si el botón no existe (ej. para pruebas en consola), llama a main() automáticamente
        main();
    }
});

function main(){
    try {
        const nombreTienda = "Mi Librería DWEC";
        // NO usar: const tienda = new Tienda(nombreTienda);
        const tienda = Tienda.getInstancia(nombreTienda); // Correcto

        tienda.iniciar(); 
        
    } catch (error) {
        console.error("Error en la ejecución:", error.message);
    }
}