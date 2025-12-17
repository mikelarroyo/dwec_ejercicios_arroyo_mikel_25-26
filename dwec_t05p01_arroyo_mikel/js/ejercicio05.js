console.log("T05 - Ejercicio 05");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#textinput").addEventListener("keydown", teclapress);
    document.querySelector("#textinput").addEventListener("keypress", teclapress);
    document.querySelector("#textinput").addEventListener("keyup", teclapress);
});

function teclapress(e) {

    let texto = `${e.type} - ${e.key} - ${e.code} - ${e.keyCode}`;

    insertarFila(texto)
}

function insertarFila(texto) {
    if (log.childElementCount >= 20) {
        log.removeChild(log.lastElementChild);
    }
    log.innerHTML = `<li class="list-group-item">${texto}</li>` + log.innerHTML;

}