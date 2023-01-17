document.addEventListener("DOMContentLoaded", function(event) {
    fetchPaises()
});

//Llamar a la api
const fetchPaises = async () => {
    try {
        const respuesta = await fetch('https://restcountries.com/v3.1/all');
        const listaPaises = await respuesta.json();
        
        console.log(listaPaises);
        ModalAgregarExistente(listaPaises);

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
    const nombre = select.value;

    // Validar que se haya seleccionado un país
    if (nombre === "Selecciona un país de esta lista") {
        alert("Selecciona un país de la lista para Agregarlo.");
        return;
    }

    // Eliminar el país del array
    const indice = paises.findIndex(pais => pais.nombre === nombre);
    paises.splice(indice, 1);

    modalEliminarPaises();     // Actualizar la lista de países en el modal

    localStorage.setItem("paisesEnLS", JSON.stringify(paises));

    borrarPaisesViejos();
    pintarPaises();

    Toastify({
        text: "Eliminaste un país",
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