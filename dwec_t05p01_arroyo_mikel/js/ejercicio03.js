console.log("T05 - Ejercicio 03");

const demo = document.querySelector("#demo");
const log = document.querySelector("#log");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#marteimg").addEventListener("click", click);
    document.querySelector("#marteimg").addEventListener("dblclick", dblclick);
    document.querySelector("#marteimg").addEventListener("mousedown", mousedown);
    document.querySelector("#marteimg").addEventListener("mousemove", mousemove);
    document.querySelector("#marteimg").addEventListener("mouseover", mouseover);
    document.querySelector("#marteimg").addEventListener("mouseout", mouseout);
    document.querySelector("#marteimg").addEventListener("mouseup", mouseup);
    document.querySelector("#disableMove").addEventListener("click", disableMove);
});


function click(e) {
    demo.textContent = "se ha hecho click";
    insertarFila()
}
function dblclick(e) {
    demo.textContent = "se ha hecho doble click";
    insertarFila()
}
function mousedown(e) {
    demo.textContent = "mouse abajo";
    insertarFila()
}
function mousemove(e) {
    demo.textContent = "mouse se mueve";
    insertarFila()
}
function mouseover(e) {
    demo.textContent = "mouse por encima";
    insertarFila()
}
function mouseout(e) {
    demo.textContent = "mouse se salio de la imagen";
    insertarFila()
}
function mouseup(e) {
    demo.textContent = "mouse arriba";
    insertarFila()
}

function disableMove() {
    document.querySelector("#marteimg").removeEventListener("mousemove", mousemove);
}

function insertarFila() {
    if (log.childElementCount >= 20) {
        log.removeChild(log.lastElementChild);
    }
    log.innerHTML = `<li class="list-group-item">${demo.textContent}</li>` + log.innerHTML;

}