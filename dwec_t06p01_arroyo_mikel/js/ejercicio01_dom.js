
document.addEventListener("DOMContentLoaded", async () => {

    const formulario = document.getElementById("form-busqueda");
    const input = document.getElementById("input-busqueda");
    const tablaBody = document.getElementById("cuerpo-tabla");
    const tablaContenedor = document.getElementById("tabla-resultados");
    const zonaErrores = document.getElementById("mensajes-error");

    let datos = [];
    
    try {
        const respuesta = await fetch("https://hp-api.onrender.com/api/characters");
        
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        
        datos = await respuesta.json();

    } catch (error) {

        const divError = document.createElement("div");
        divError.className = "alert alert-danger";
        divError.textContent = "Error crítico: No se pudieron cargar los datos de la API.";
        zonaErrores.appendChild(divError);
    }
    input.addEventListener("input", () => {
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores);
    });

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores);
    });
});

const realizarBusqueda = (datos, input, tablaBody, tablaContenedor, zonaErrores) => {
    
    zonaErrores.innerHTML = "";
    tablaBody.innerHTML = "";
    tablaContenedor.hidden = true;

    const texto = input.value.trim().toLowerCase();
    if (texto === "") {
        const divError = document.createElement("div");
        divError.className = "alert alert-danger";
        divError.textContent = "¡Error! Debes escribir un nombre para buscar.";
        zonaErrores.appendChild(divError);
    
    } else {
        const filtrados = datos.filter((p) => p.name.toLowerCase().includes(texto));

        if (filtrados.length === 0) {
            const divAviso = document.createElement("div");
            divAviso.className = "alert alert-warning";
            divAviso.textContent = "No se han encontrado personajes.";
            zonaErrores.appendChild(divAviso);
        
        } else {
            tablaContenedor.hidden = false;
            filtrados.forEach((p) => {
                const fila = document.createElement("tr");
                const celdaFoto = document.createElement("td");
                const imagen = document.createElement("img");
                imagen.src = p.image
                imagen.width = 50;
                celdaFoto.appendChild(imagen); 
                const celdaNombre = document.createElement("td");
                celdaNombre.textContent = p.name;
                const celdaCasa = document.createElement("td");
                celdaCasa.textContent = p.house || "Desconocida";

                fila.appendChild(celdaFoto);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaCasa);
                tablaBody.appendChild(fila);
            });
        }
    }
};