console.log("T05 - Ejercicio 07");

const objetoPruebas = {
    "daw": {
        "programacion": {
            "RA1": "Analizar requisitos (del módulo de Programación)",
            "RA2": "Implementar funcionalidad (del módulo de Programación)"
        },
        "bases de datos": {
            "RA1": "Reconoce elementos y funcionalidad de bases de datos.",
            "RA2": "Crea bases de datos relacionales definiendo estructura.",
        }
    },
    "asir": {
        "iso": {
            "RA1": "Instala sistemas operativos según documentación técnica.",
            "RA2": "Configura software base del sistema.",
        },
        "aso": {
            "RA1": "Administra el servicio de directorio en red.",
            "RA2": "Administra procesos con seguridad y eficiencia.",
        }
    },
    "smr": {
        "microinformatica": {
            "RA1": "Ensambla equipos interpretando instrucciones de montaje.",
            "RA2": "Mantiene equipos, detectando disfunciones y causas.",
        },
        "redes": {
            "RA1": "Reconoce estructura y componentes de redes locales.",
            "RA2": "Despliega el cableado de redes locales.",
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const listaSelect = document.querySelectorAll("#formulario select");
    listaSelect.forEach((select, index) => {
        select.addEventListener("change", (e) => {
            activarDesactivarSiguiente(e, listaSelect, index)
            rellenarSiguiente(e, listaSelect, index);
        });
    });

    /* Rellenar el primer select */
    rellenarPrimera(listaSelect);
});

function activarDesactivarSiguiente(e, listaSelect, index) {
    if (listaSelect.length - 1 !== index) {
        if (e.target.value == "") {
            for (let i = index; i + 1 < listaSelect.length; i++) {
                listaSelect[i + 1].disabled = true;
                listaSelect[i + 1].value = "";
            }
        } else {
            listaSelect[index + 1].disabled = false;
            // llamar a una funcion que se encargue - este ya se encarga se habilitar o deshabilitar el siguiente
        }
    }
}

function rellenarPrimera(listaSelect) {
    for (const modulo in objetoPruebas) {

        listaSelect[0].innerHTML += `<option value="${modulo}">${modulo.toUpperCase()}</option>`;
    }
}

function rellenarSiguiente(e, listaSelect, index) {
    if (listaSelect.length - 1 !== index && index == 0) {  
        listaSelect[index + 1].innerHTML = "<option value=''>Seleccione...</option>";
        for (const key in objetoPruebas[e.target.value]) {
            listaSelect[index + 1].innerHTML += `<option value="${key}">${key.toUpperCase()}</option>`;
        }
    } else if (index == 1) {
        listaSelect[index + 1].innerHTML = "<option value=''>Seleccione...</option>";
        const objetoRA = objetoPruebas[listaSelect[0].value][e.target.value];
        for (const key in objetoRA) {
            listaSelect[index + 1].innerHTML += `<option value="${key}">${objetoRA[key].toUpperCase()}</option>`;
        }

    } else if (index == 2) {
        document.querySelector("#resultado").innerHTML = `${listaSelect[0].value} - ${listaSelect[1].value} - ${listaSelect[2].value}`;

    }
}