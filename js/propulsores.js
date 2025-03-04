const statusPropulsor = document.getElementById("estadoPropulsor");
const titulo = document.getElementById("tituloTablaVuelos");

statusPropulsor.innerHTML = "Desconocido";

titulo.textContent = `Seleccione un propulsor para obtener su información`;
async function cargarPropulsores() {
    try {
        const response = await fetch("https://halconspace.site/datos.json");
        if (!response.ok) throw new Error("No se pudo cargar el JSON");

        const jsonData = await response.json();
        const selector = document.getElementById("selectorPropulsor");

        // Limpiar opciones previas
        selector.innerHTML = '<option value="">-- Selecciona un propulsor --</option>';

        // Llenar el selector con los propulsores disponibles
        for (const propulsor in jsonData.propulsores) {
            const opcion = document.createElement("option");
            opcion.value = propulsor;
            opcion.textContent = propulsor;
            selector.appendChild(opcion);
        }

        // Agregar evento para cuando el usuario seleccione un propulsor
        selector.addEventListener("change", function () {
            const propulsorSeleccionado = this.value;
            if (propulsorSeleccionado) {
                cargarDatos(propulsorSeleccionado);
            } else {
                limpiarTabla();
            }
        });

    } catch (error) {
        console.error("Error al cargar los propulsores:", error);
    }
}

async function cargarDatos(etapa) {
    try {
        const response = await fetch("https://halconspace.site/datos.json");
        if (!response.ok) throw new Error("No se pudo cargar el JSON");

        const jsonData = await response.json();
        const tabla = document.querySelector("#vuelos tbody");
        const titulo = document.getElementById("tituloTablaVuelos");
        const statusPropulsor = document.getElementById("estadoPropulsor");

        // Limpiar la tabla antes de insertar nuevos datos
        tabla.innerHTML = "";
        titulo.textContent = `Vuelos de ${etapa}`;

        const propulsorSeleccionado = etapa; // Esto puede venir de un select u otra fuente
        const estado = jsonData.propulsores[propulsorSeleccionado]?.estado || "Desconocido";

        statusPropulsor.innerHTML = estado;

        // Verificar si la etapa existe
        if (!jsonData.propulsores[etapa]) {
            tabla.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No hay datos disponibles</td></tr>";
            return;
        }

        const vuelos = jsonData.propulsores[etapa].vuelos;

        for (const vuelo in vuelos) {
            const { mision, fecha, url } = vuelos[vuelo];

            // Evitar mostrar vuelos sin datos
            if (!mision.trim() && !fecha.trim()) continue;

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${vuelo}</td>
                <td>${mision || "Desconocido"}</td>
                <td>${fecha || "Desconocida"}</td>
                <td style="text-align: center;">
                    ${url && url.trim() ? `<a href="${url}" target="_blank" class="btn-enlace">Ver artículo</a>` : "No disponible"}
                </td>
            `;

            tabla.appendChild(fila);
        }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

function limpiarTabla() {
    const tabla = document.querySelector("#vuelos tbody");
    const titulo = document.getElementById("tituloTablaVuelos");
    const statusPropulsor = document.getElementById("estadoPropulsor");
    tabla.innerHTML = "";
    titulo.textContent = `Seleccione un propulsor para obtener su información`;
    statusPropulsor.innerHTML = "Desconocido";
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarPropulsores);
