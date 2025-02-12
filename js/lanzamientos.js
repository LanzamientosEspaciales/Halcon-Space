document.addEventListener("DOMContentLoaded", () => {
    fetch("https://halconspace.site/datos.json")
        .then(response => response.json())
        .then(data => {
            // Calcular lanzamientos totales y porcentaje de éxito
            let lanzamientosTotales = data.lanzamientos.exitosos + data.lanzamientos.fallidos;
            let porcentajeLanzamientos = lanzamientosTotales > 0 ? (data.lanzamientos.exitosos / lanzamientosTotales) * 100 : 0;

            // Calcular porcentaje de éxito en aterrizajes
            let aterrizajesTotales = data.aterrizajes.exitosos + data.aterrizajes.fallidos;
            let porcentajeAterrizajes = aterrizajesTotales > 0 ? (data.aterrizajes.exitosos / aterrizajesTotales) * 100 : 0;

            // Actualizar valores en la página
            document.getElementById("lanzamientos-totales").textContent = lanzamientosTotales;
            document.getElementById("aterrizajes-exitosos").textContent = data.aterrizajes.exitosos;

            document.getElementById("porcentaje-lanzamientos").textContent = Math.round(porcentajeLanzamientos) + "%";
            document.getElementById("porcentaje-aterrizajes").textContent = Math.round(porcentajeAterrizajes) + "%";

            // Animar gráficos circulares
            let circleLanzamientos = document.getElementById("progress-lanzamientos");
            let circleAterrizajes = document.getElementById("progress-aterrizajes");

            let offsetLanzamientos = 283 - (283 * porcentajeLanzamientos) / 100;
            let offsetAterrizajes = 283 - (283 * porcentajeAterrizajes) / 100;

            circleLanzamientos.style.strokeDashoffset = offsetLanzamientos;
            circleAterrizajes.style.strokeDashoffset = offsetAterrizajes;
        })
        .catch(error => console.error("Error al cargar las estadísticas:", error));
});

// FILTROS DE LANZAMIENTOS
function buscarMision() {
    // Obtener el texto ingresado en el campo de búsqueda
    const textoBusqueda = document.getElementById("busqueda").value.toLowerCase();

    // Obtener todos los elementos de los lanzamientos
    const lanzamientos = document.querySelectorAll(".lanzamiento");

    // Recorrer todos los lanzamientos y verificar si coinciden con el texto ingresado
    lanzamientos.forEach(lanzamiento => {
        const nombreMision = lanzamiento.querySelector("h3").textContent.toLowerCase();

        // Mostrar u ocultar el lanzamiento según la búsqueda
        if (nombreMision.includes(textoBusqueda)) {
            lanzamiento.style.display = "flex";
        } else {
            lanzamiento.style.display = "none";
        }
    });
}

function filtrarLanzamientos() {
    // Obtener el valor seleccionado
    const estadoSeleccionado = document.getElementById("estado").value;

    // Obtener todos los elementos de los lanzamientos
    const lanzamientos = document.querySelectorAll(".lanzamiento");

    // Recorrer todos los lanzamientos
    lanzamientos.forEach(lanzamiento => {
        // Obtener el estado de cada lanzamiento
        const estado = lanzamiento.dataset.estado;

        // Mostrar u ocultar el lanzamiento según el estado seleccionado
        if (estadoSeleccionado === "todos" || estado.toLowerCase() === estadoSeleccionado) {
            lanzamiento.style.display = "flex";
        } else {
            lanzamiento.style.display = "none";
        }
    });
}