console.log("T04 - Ejercicio 01");

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btn-comprar');
    if (boton) {
        boton.addEventListener('click', () => {
            main();  
        });
    } else {
        main();
    }
});
function main(){
    try {

        const nombreTienda = "Mi Librería DWEC";
        const tienda = new Tienda(nombreTienda); 
        tienda.iniciar(); 
        
    } catch (error) {
        console.error("Error en la ejecución:", error.message);
    }
}