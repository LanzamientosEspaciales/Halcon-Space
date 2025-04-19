document.addEventListener("DOMContentLoaded", () => {
    // Intentamos cargar el archivo JSON
    fetch("../json/panel_prelaunch.json")
        .then(response => {
            // Verificamos si la respuesta es exitosa
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON.");
            }
            return response.json();
        })
        .then(data => {
            // Helper para asignar valor solo si el elemento existe
            const setText = (id, value) => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = value;

                    // Si el valor es "GO", asignamos la clase .estado-go
                    if (value === "GO") {
                        el.classList.add("estado-go");
                        el.classList.remove("estado-no-go");
                    } 
                    // Si el valor es "NO GO", asignamos la clase .estado-no-go
                    else if (value === "NO GO") {
                        el.classList.add("estado-no-go");
                        el.classList.remove("estado-go");
                    } 
                    // Si no es ni GO ni NO GO, eliminamos ambas clases
                    else {
                        el.classList.remove("estado-go", "estado-no-go");
                    }
                } else {
                    console.warn(`Elemento con ID "${id}" no encontrado`);
                }
            };

            // General
            setText("vehiculo", data.general?.vehiculo || 'No disponible');
            setText("mision", data.general?.mision || 'No disponible');
            setText("plataforma", data.general?.plataforma || 'No disponible');
            setText("vehiculo-estado", data.general?.["vehiculo-estado"] || 'No disponible');
            setText("comunicaciones", data.general?.comunicaciones || 'No disponible');
            setText("navegacion", data.general?.navegacion || 'No disponible');
            setText("camaras", data.general?.camaras || 'No disponible');
            setText("range", data.general?.range || 'No disponible');

            // Etapa 2
            setText("propulsion-2", data["etapa-2"]?.propulsion || 'No disponible');
            setText("rp1-2", `${data["etapa-2"]?.["rp1-2"] ?? 0}%`);
            setText("lox-2", `${data["etapa-2"]?.["lox-2"] ?? 0}%`);
            setText("navegacion-2", data["etapa-2"]?.navegacion || 'No disponible');
            setText("comunicaciones-2", data["etapa-2"]?.comunicaciones || 'No disponible');
            setText("baterias-2", `${data["etapa-2"]?.baterias ?? 0}%`);

            // Etapa 1
            setText("propulsion-1", data["etapa-1"]?.propulsion || 'No disponible');
            setText("rp1-1", `${data["etapa-1"]?.["rp1-1"] ?? 0}%`);
            setText("lox-1", `${data["etapa-1"]?.["lox-1"] ?? 0}%`);
            setText("navegacion-1", data["etapa-1"]?.navegacion || 'No disponible');
            setText("comunicaciones-1", data["etapa-1"]?.comunicaciones || 'No disponible');
            setText("baterias-1", `${data["etapa-1"]?.baterias ?? 0}%`);
            setText("recuperacion-1", data["etapa-1"]?.recuperacion || 'No disponible');

            // Meteorología
            setText("viento", `${data.meteorologia?.viento ?? 0} km/h`);
            setText("temperatura-meteorologica", `${data.meteorologia?.temperatura ?? 0} °C`);
            setText("humedad", `${data.meteorologia?.humedad ?? 0}%`);
            setText("nubosidad", data.meteorologia?.nubosidad || 'No disponible');
        })
        .catch(error => {
            // Si hay un error al cargar los datos
            console.error("❌ Error al cargar los datos del JSON:", error);
            alert("Error al cargar los datos del panel. Intente nuevamente más tarde.");
        });
});
