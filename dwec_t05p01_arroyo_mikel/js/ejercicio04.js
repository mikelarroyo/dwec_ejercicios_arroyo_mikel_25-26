console.log("T05 - Ejercicio 04");

const lista = document.querySelector("#listaCompra");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#formAgregar").addEventListener("click", formAgregar);
    document.querySelector("#formBorrar").addEventListener("click", formBorrar);
    document.querySelector("#formOrdenar").addEventListener("click", formOrdenar);
});

function formAgregar(e) {
    agregarAlista(document.querySelector("#producto").value);
}
function formBorrar(e) {
    borrarDeLista(document.querySelector("#producto").value);
}
function formOrdenar(e) {
    ordenarLista();
}

function agregarAlista(elemento) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    lista.appendChild(li);

    lista.lastChild.textContent = elemento;
}

function borrarDeLista(entrada) {

    const hijos = document.querySelectorAll("li.list-group-item");
    console.log(hijos);

    const hijosArray = [...hijos];
    console.log(hijosArray);

    const hijo = hijosArray.findIndex(hijo => hijo.textContent == entrada);

    console.log(hijosArray[hijo]);

    lista.removeChild(hijosArray[hijo]);
}

function ordenarLista() {
    const hijos = document.querySelectorAll("li.list-group-item");

    const hijosArray = [...hijos];

    hijosArray.sort((a, b) => a.textContent.localeCompare(b.textContent));

    lista.innerHTML = "";

    hijosArray.forEach(hijo => lista.appendChild(hijo));
}