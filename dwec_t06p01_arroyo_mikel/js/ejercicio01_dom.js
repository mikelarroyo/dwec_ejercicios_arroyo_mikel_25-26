document.addEventListener("DOMContentLoaded", async () => {

    const formulario = document.getElementById("form-busqueda");
    const input = document.getElementById("input-busqueda");
    const tablaBody = document.getElementById("cuerpo-tabla");
    const tablaContenedor = document.getElementById("tabla-resultados");
    const zonaErrores = document.getElementById("mensajes-error");
    const loader = document.getElementById("loader");
    const contenedorTarjetas = document.getElementById("contenedor-personajes");

    let datos = [];
    
    try {
        const respuesta = await fetch("https://hp-api.onrender.com/api/characters");
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        datos = await respuesta.json();

        cargarSeccionBienvenida(datos, loader, contenedorTarjetas);

    } catch (error) {
        mostrarError(zonaErrores, `Error crítico: ${error.message}`);
        
        if(loader) {
            loader.textContent = 'Error al cargar datos.';
        }
    }

    input.addEventListener("input", () => {
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, false);
    });

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        realizarBusqueda(datos, input, tablaBody, tablaContenedor, zonaErrores, true);
    });
});

const mostrarError = (contenedor, mensaje) => {
    const div = document.createElement("div");
    div.style.color = "red";
    div.style.border = "1px solid red";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.textContent = mensaje;
    contenedor.appendChild(div);
};

const realizarBusqueda = (datos, input, tablaBody, tablaContenedor, zonaErrores, esSubmit) => {
    
    zonaErrores.innerHTML = "";
    tablaBody.innerHTML = "";
    tablaContenedor.hidden = true;

    const texto = input.value.trim().toLowerCase();

    if (texto === "") {
        if (esSubmit) {
            mostrarError(zonaErrores, "El campo de búsqueda no puede estar vacío.");
        }
        return; 
    } 
    
    const filtrados = datos.filter((p) => p.name.toLowerCase().includes(texto));

    if (filtrados.length === 0) {
        mostrarError(zonaErrores, "No se han encontrado personajes.");
    
    } else {
        tablaContenedor.hidden = false;
        
        filtrados.forEach((p) => {
            const fila = document.createElement("tr");
            
            const celdaFoto = document.createElement("td");
            if (p.image) {
                const imagen = document.createElement("img");
                imagen.src = p.image;
                imagen.style.width = "50px"; 
                imagen.alt = p.name;
                celdaFoto.appendChild(imagen); 
            } else {
                celdaFoto.textContent = "Sin foto";
            }

            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = p.name;

            const celdaCasa = document.createElement("td");
            celdaCasa.textContent = p.house || "Sin casa";

            const celdaAccion = document.createElement("td");
            const btnFav = document.createElement("button");
            btnFav.textContent = "Favorito";
            celdaAccion.appendChild(btnFav);

            fila.appendChild(celdaFoto);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCasa);
            fila.appendChild(celdaAccion);

            tablaBody.appendChild(fila);
        });
    }
};

const cargarSeccionBienvenida = (todosLosPersonajes, loader, contenedor) => {
    
    if (!contenedor) return;

    if (loader) loader.style.display = 'block'; 
    contenedor.innerHTML = ''; 

    setTimeout(() => {
        if (loader) loader.style.display = 'none';

        const casas = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

        casas.forEach(casa => {
            const grupo = todosLosPersonajes.filter(p => p.house === casa);
            const aleatorios = grupo.sort(() => 0.5 - Math.random()).slice(0, 2);

            aleatorios.forEach(p => {
                const foto = p.image ? p.image : 'https://via.placeholder.com/200';
                const tarjeta = `
                    <div style="
                        display: inline-block; 
                        width: 23%; 
                        margin: 1%; 
                        border: 1px solid #ddd; 
                        box-shadow: 2px 2px 5px rgba(0,0,0,0.1); 
                        padding: 15px; 
                        border-radius: 8px; 
                        vertical-align: top;
                        box-sizing: border-box; 
                        background-color: white;
                        font-family: sans-serif;
                    ">
                        <img src="${foto}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px;">
                        
                        <h3 style="font-size: 1.2rem; margin: 15px 0 10px; color: #2e7d32; text-align: center;">
                            ${p.name}
                        </h3>
                        
                        <div style="font-size: 0.9rem; color: #555; line-height: 1.6;">
                            <p style="margin: 0;"><strong>Casa:</strong> ${p.house}</p>
                            <p style="margin: 0;"><strong>Especie:</strong> ${p.species}</p>
                            <p style="margin: 0;"><strong>Patronus:</strong> ${p.patronus || 'Desconocido'}</p>
                            <p style="margin: 0;"><strong>Año:</strong> ${p.yearOfBirth || 'Desconocido'}</p>
                        </div>
                    </div>
                `;
                
                contenedor.innerHTML += tarjeta;
            });
        });

    }, 2000); 
};