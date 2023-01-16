// MODO OSCURO con Local Storage
const botonColorMode = document.querySelector("#color-mode");
const body = document.body;
let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("text-bg-dark");
    localStorage.setItem("dark-mode", "activado");
    document.getElementById("color-mode").innerText = "Modo Claro";
}

function desactivarDarkMode() {
    body.classList.remove("text-bg-dark");
    localStorage.setItem("dark-mode", "desactivado");
    document.getElementById("color-mode").innerText = "Modo Oscuro";
}

//Fijarse como arrancar la página
if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})