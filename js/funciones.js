// Chequear si hay una base de datos previa en la memoria local
const paisesEnLS = JSON.parse(localStorage.getItem("paisesEnLS"));
if (paisesEnLS !== null) {
    paises = paisesEnLS;
    console.log("Lista de paises ya en memoria local");
    Toastify({
        text: "Continua modificando los países",
        className: "info",
        style: {
            background: "#14213D",
        },
        offset: {
            x: 10,
            y: 50,
        },
    }).showToast();

} else {
    const paisesEnLS = paises;
    console.log("Se asignaron los valores de la base de datos embebida");
    Toastify({
        text: "Base de datos original",
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

// Modal "Agregar país": Función para agregar un nuevo país al array ingresando manualmente los datos
const botonAgregar = document.querySelector("#btnAgregarPais");
botonAgregar.addEventListener("click", agregarPais);
const formulario = document.querySelector("#agregar-form");

function agregarPais(e) {
    e.preventDefault();
    const nombre = document.querySelector("#paisNombreNuevo").value;
    const poblacion = document.querySelector("#paisPoblacionNuevo").value;
    const superficie = document.querySelector("#paisSuperficieNuevo").value;
    const idioma = document.querySelector("#paisIdiomaNuevo").value;
    const independencia = document.querySelector("#paisAnoNuevo").value;
    const capital = document.querySelector("#paisCapitalNuevo").value;

    // Validar que el usuario haya ingresado valores válidos para la población y superficie
    if (!poblacion || isNaN(poblacion) || !superficie || isNaN(superficie)) {
        alert("La población y la superficie deben ser valores numéricos.");
        return;
    }
    // Validar que el usuario haya ingresado un año de independencia válido
    if (!independencia || isNaN(independencia) || independencia < 0) {
        alert("El año de independencia debe ser un número entero positivo.");
        return;
    }
    // Crear un nuevo objeto con la información del país
    const pais = {
        nombre: nombre,
        poblacion: poblacion,
        superficie: superficie,
        idioma: idioma,
        independencia: independencia,
        capital: capital
    };

    // Agregar el nuevo objeto al array de países
    borrarPaisesViejos();
    paises.push(pais);

    localStorage.setItem("paisesEnLS", JSON.stringify(paises));
    pintarPaises();
    formulario.reset();

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

//Borrar el contenedor con los países viejos al agregar uno nuevo
const borrarPaisesViejos = () => {
    const contenedor = document.getElementById("pais-contenedor");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};

//Modal "Eliminar Países": Lista de opciones
const modalEliminarPaises = () => {
    const contenedorModal = document.getElementById("modal-opciones-eliminar");
    while (contenedorModal.firstChild) {
        contenedorModal.removeChild(contenedorModal.firstChild);
    }
    const option = document.createElement('option');
    option.innerHTML += `<option selected>Selecciona un país de esta lista</option>`
    contenedorModal.appendChild(option);
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.innerHTML += `<option> ${pais.nombre} </option>`
        contenedorModal.appendChild(option);
    });
};

// Modal "Eliminar Países": Funcionalidad botón Eliminar
const btnEliminarModal = document.getElementById("btnEliminarModal");
btnEliminarModal.addEventListener("click", eliminarPais);

function eliminarPais() {
    const select = document.getElementById("modal-opciones-eliminar");
    const nombre = select.value;

    // Validar que se haya seleccionado un país
    if (nombre === "Selecciona un país de esta lista") {
        alert("Selecciona un país de la lista para eliminarlo.");
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

// Función para el botón "ordenar Países":
const btnOrdenar = document.getElementById("btnOrdenar");
btnOrdenar.addEventListener("click", ordenarPaises);

function ordenarPaises() {
    const select = document.getElementById("modal-opciones-Filtrar");
    const nombre = select.value;
    console.log(nombre);

    switch (nombre) {
        case "Ordenar por superficie":
            paises.sort((a, b) => a.superficie - b.superficie);
            break;
        case "Ordenar por población":
            paises.sort((a, b) => a.poblacion - b.poblacion);
            break;
        default:
            alert("Opción inválida. Por favor, elige una opción válida.");
            break;
    }

    modalEliminarPaises();     // Actualizar la lista de países en el modal
    localStorage.setItem("paisesEnLS", JSON.stringify(paises));
    borrarPaisesViejos();
    pintarPaises();

    Toastify({
        text: "Ordenaste los paises",
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

// Modal "Empezar de nuevo: Función para borrar la base de datos local
const botonLimpiarLocal = document.querySelector("#btnLimpiarLocal");
botonLimpiarLocal.addEventListener("click", limpiarLocal);

function limpiarLocal() {
    window.localStorage.removeItem('paisesEnLS');
    location.reload()
};

//Cuerpo HTML: Mostrar Países
const pintarPaises = () => {
    const contenedor = document.getElementById("pais-contenedor");
    paises.forEach(pais => {
        const div = document.createElement('div');
        div.classList.add('caja');
        div.innerHTML += `<div class="card-image">
                        <!-- <img src=${pais.img}> -->
                        <p class="titulos">${pais.nombre}</p>
                        </div>
                        <div class="card-content">
                            <p>Población: ${pais.poblacion.toLocaleString()} Hab.</p>
                            <p>Superficie: ${pais.superficie.toLocaleString()} Km2</p>
                            <p>Idioma: ${pais.idioma}</p>
                            <p>Año Independencia: ${pais.independencia.toLocaleString()}</p>
                            <p>Capital: ${pais.capital}</p>
                        </div>`
        contenedor.appendChild(div);
    });
    modalEliminarPaises(); //Refrescar la lista de países en el modal
};

// Carga inicial de la pagina 
document.addEventListener('DOMContentLoaded', () => {
    pintarPaises();
});
