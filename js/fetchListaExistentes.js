document.addEventListener("DOMContentLoaded", function(event) {
    fetchPaises()
});

let listaPaisesGlobal = [];

//Llamar a la api
const fetchPaises = async () => {
    try {
        const respuesta = await fetch('https://restcountries.com/v3.1/all');
        const listaPaises = await respuesta.json();        
        console.log(listaPaises);
        ModalAgregarExistente(listaPaises);
        listaPaisesGlobal = listaPaises;

    } catch (error) {
        console.log(error)
    }
}

//Modal "Agregar País Existente": Lista de opciones
const ModalAgregarExistente = (listaPaises) => {
    const contenedorModal = document.getElementById("modal-opciones-agregar");
    while (contenedorModal.firstChild) {
        contenedorModal.removeChild(contenedorModal.firstChild);
    }
    const option = document.createElement('option');
    option.innerHTML += `<option selected>Selecciona un país de esta lista</option>`
    contenedorModal.appendChild(option);
    listaPaises.forEach(pais => {
        const option = document.createElement('option');
        option.innerHTML += `<option> ${pais.translations.spa.common} </option>`
        contenedorModal.appendChild(option);
    });
};

// Modal "Agregar País Existente": Funcionalidad botón Agregar
const btnAgregarExistente = document.getElementById("btnAgregarExistente");
btnAgregarExistente.addEventListener("click", AgregarExistente);

function AgregarExistente() {
    const select = document.getElementById("modal-opciones-agregar");
    const nombrePais = select.value;
    console.log(nombrePais)

    // Validar que se haya seleccionado un país
    if (nombrePais === "Selecciona un país de esta lista") {
        alert("Selecciona un país de la lista para Agregarlo.");
        return;
    }

    // Agregar el país de la lista
    const indice = listaPaisesGlobal.findIndex(listaPaisesGlobal => listaPaisesGlobal.translations.spa.common === nombrePais);

    let paisSeleccionado = listaPaisesGlobal[indice];
    console.log(paisSeleccionado)

    const nombre = paisSeleccionado.translations.spa.common;
    const poblacion = paisSeleccionado.population;
    const superficie = paisSeleccionado.area;
    const idioma = Object.entries(paisSeleccionado.languages)[0][1];
    const independencia = 0;
    const capital = paisSeleccionado.capital[0];

    // Crear un nuevo objeto con la información del país
    const pais = {
        nombre: nombre,
        poblacion: poblacion,
        superficie: superficie,
        idioma: idioma,
        independencia: independencia,
        capital: capital
    };

    console.log(pais)

    modalEliminarPaises();     // Actualizar la lista de países en el modal
    borrarPaisesViejos();
    paises.push(pais);     // Agregar el nuevo objeto al array de países
    pintarPaises();

    localStorage.setItem("paisesEnLS", JSON.stringify(paises));

    Toastify({
        text: "Agregaste un país",
        className: "info",
        style: {
            background: "#14213D",
        },
        offset: {
            x: 10,
            y: 50,
        },
    }).showToast();
}

