console.log("T05 - Ejercicio 02");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#ocultarleer").addEventListener("click", ocultarleer);

});

function ocultarleer() {
    document.querySelector("#contenido").classList.toggle("d-block");
    document.querySelector("#contenido").classList.toggle("d-none");

    this.textContent = (this.textContent === "Ocultar...")? "Leer más..." :"Ocultar...";
}

