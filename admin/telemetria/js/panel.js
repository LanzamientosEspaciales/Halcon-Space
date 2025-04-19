// Cargar el archivo JSON y mostrar los datos en la página
fetch("../json/panel_prelaunch.json")
    .then(response => response.json())
    .then(data => {
        // General
        document.getElementById("vehiculo").textContent = data.general.vehiculo;
        document.getElementById("mision").textContent = data.general.mision;
        document.getElementById("plataforma").textContent = data.general.plataforma;
        document.getElementById("vehiculo-estado").textContent = data.general["vehiculo-estado"];

        // Etapa 2
        document.getElementById("propulsion-2").textContent = data["etapa-2"].propulsion;
        document.getElementById("rp1-2").textContent = `${data["etapa-2"]["rp1-2"]}%`;
        document.getElementById("lox-2").textContent = `${data["etapa-2"]["lox-2"]}%`;
        document.getElementById("navegacion-2").textContent = data["etapa-2"].navegacion;
        document.getElementById("comunicaciones-2").textContent = data["etapa-2"].comunicaciones;
        document.getElementById("baterias-2").textContent = `${data["etapa-2"].baterias}%`;

        // Etapa 1
        document.getElementById("propulsion-1").textContent = data["etapa-1"].propulsion;
        document.getElementById("rp1-1").textContent = `${data["etapa-1"]["rp1-1"]}%`;
        document.getElementById("lox-1").textContent = `${data["etapa-1"]["lox-1"]}%`;
        document.getElementById("navegacion-1").textContent = data["etapa-1"].navegacion;
        document.getElementById("comunicaciones-1").textContent = data["etapa-1"].comunicaciones;
        document.getElementById("baterias-1").textContent = `${data["etapa-1"].baterias}%`;
        document.getElementById("recuperacion-1").textContent = data["etapa-1"].recuperacion;

        // Meteorología
        document.getElementById("viento").textContent = `${data.meteorologia.viento} km/h`;
        document.getElementById("temperatura").textContent = `${data.meteorologia.temperatura} °C`;
        document.getElementById("humedad").textContent = `${data.meteorologia.humedad}%`;
        document.getElementById("nubosidad").textContent = data.meteorologia.nubosidad;
    })
    .catch(error => {
        console.error("Error al cargar los datos del JSON:", error);
    });
