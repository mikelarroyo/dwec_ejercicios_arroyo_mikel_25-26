console.log("T05 - Ejercicio 0X");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn-danger").addEventListener("click", cambiarFondoRojo);
    document.querySelector(".btn-primary").addEventListener("click", cambiarFondoAzul);
    document.querySelector(".btn-success").addEventListener("click", cambiarFondoVerde);
});

function cambiarFondoRojo() {
    document.querySelector("main").classList.add("bg-danger");
    document.querySelector("main").classList.remove("bg-primary");
    document.querySelector("main").classList.remove("bg-success");
}
function cambiarFondoAzul() {
    document.querySelector("main").classList.remove("bg-danger");
    document.querySelector("main").classList.add("bg-primary");
    document.querySelector("main").classList.remove("bg-success");
}
function cambiarFondoVerde() {
    document.querySelector("main").classList.remove("bg-danger");
    document.querySelector("main").classList.remove("bg-primary");
    document.querySelector("main").classList.add("bg-success");
}

