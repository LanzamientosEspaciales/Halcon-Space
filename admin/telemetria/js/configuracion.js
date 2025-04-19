function guardarConfiguracion() {
    // Obtener todos los valores del formulario
    const vehiculo = document.getElementById("vehiculo").value;
    const mision = document.getElementById("mision").value;
    const plataforma = document.getElementById("plataforma").value;
    const vehiculoEstado = document.getElementById("vehiculo-estado").value;
    const comunicaciones = document.getElementById("comunicaciones").value;
    const camaras = document.getElementById("camaras").value;
    const range = document.getElementById("range").value;

    const propulsion2 = document.getElementById("propulsion-2").value;
    const rp12 = document.getElementById("rp1-2").value;
    const lox2 = document.getElementById("lox-2").value;
    const navegacion2 = document.getElementById("navegacion-2").value;
    const comunicaciones2 = document.getElementById("comunicaciones-2").value;
    const baterias2 = document.getElementById("baterias-2").value;

    const propulsion1 = document.getElementById("propulsion-1").value;
    const rp11 = document.getElementById("rp1-1").value;
    const lox1 = document.getElementById("lox-1").value;
    const navegacion1 = document.getElementById("navegacion-1").value;
    const comunicaciones1 = document.getElementById("comunicaciones-1").value;
    const baterias1 = document.getElementById("baterias-1").value;
    const recuperacion1 = document.getElementById("recuperacion-1").value;

    const viento = document.getElementById("viento").value;
    const temperaturaMeteorologica = document.getElementById("temperatura-meteorologica").value;
    const humedad = document.getElementById("humedad").value;
    const nubosidad = document.getElementById("nubosidad").value;

    // Guardar los datos en localStorage
    localStorage.setItem("vehiculo", vehiculo);
    localStorage.setItem("mision", mision);
    localStorage.setItem("plataforma", plataforma);
    localStorage.setItem("vehiculo-estado", vehiculoEstado);
    localStorage.setItem("comunicaciones", comunicaciones);
    localStorage.setItem("camaras", camaras);
    localStorage.setItem("range", range);

    localStorage.setItem("propulsion-2", propulsion2);
    localStorage.setItem("rp1-2", rp12);
    localStorage.setItem("lox-2", lox2);
    localStorage.setItem("navegacion-2", navegacion2);
    localStorage.setItem("comunicaciones-2", comunicaciones2);
    localStorage.setItem("baterias-2", baterias2);

    localStorage.setItem("propulsion-1", propulsion1);
    localStorage.setItem("rp1-1", rp11);
    localStorage.setItem("lox-1", lox1);
    localStorage.setItem("navegacion-1", navegacion1);
    localStorage.setItem("comunicaciones-1", comunicaciones1);
    localStorage.setItem("baterias-1", baterias1);
    localStorage.setItem("recuperacion-1", recuperacion1);

    localStorage.setItem("viento", viento);
    localStorage.setItem("temperatura-meteorologica", temperaturaMeteorologica);
    localStorage.setItem("humedad", humedad);
    localStorage.setItem("nubosidad", nubosidad);

    alert("Configuración guardada con éxito");

    // Redirigir al panel de control
    window.location.href = "panel.html";
}
