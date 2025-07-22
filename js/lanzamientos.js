document.addEventListener("DOMContentLoaded", () => {
    //fetch("../json/estadisticas.json")
    fetch("https://halconspace.site/json/estadisticas.json")
        .then(response => response.json())
        .then(data => {
            // Calcular lanzamientos totales y porcentaje de éxito
            let lanzamientosTotales = data.lanzamientos.exitosos + data.lanzamientos.fallidos;
            let porcentajeLanzamientos = lanzamientosTotales > 0 ? (data.lanzamientos.exitosos / lanzamientosTotales) * 100 : 0;

            // Calcular porcentaje de éxito en aterrizajes
            let aterrizajesTotales = data.aterrizajes.exitosos + data.aterrizajes.fallidos;
            let porcentajeAterrizajes = aterrizajesTotales > 0 ? (data.aterrizajes.exitosos / aterrizajesTotales) * 100 : 0;

            let vuelosFalcon9 = data.vuelosVehiculos.falcon9;
            let vuelosFalconHeavy = data.vuelosVehiculos.falconHeavy;
            

            // Actualizar valores en la página
            document.getElementById("lanzamientos-totales").textContent = lanzamientosTotales;
            document.getElementById("aterrizajes-exitosos").textContent = data.aterrizajes.exitosos;

            document.getElementById("porcentaje-lanzamientos").textContent = Math.round(porcentajeLanzamientos) + "%";
            document.getElementById("porcentaje-aterrizajes").textContent = Math.round(porcentajeAterrizajes) + "%";


            document.getElementById('lanzamientos-falcon-9').textContent = vuelosFalcon9;
            document.getElementById('lanzamientos-falcon-heavy').textContent = vuelosFalconHeavy;
            document.getElementById('intentos-aterrizaje').textContent = aterrizajesTotales;

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

function filtrarLanzamientosVehiculo() {
    const filtroVehiculo = document.getElementById("vehiculos").value;
    const lanzamientos = document.querySelectorAll(".lanzamiento");

    lanzamientos.forEach(lanzamiento => {
        const vehiculo = lanzamiento.getAttribute("data-vehiculo");

        if (filtroVehiculo === "todos" || vehiculo === filtroVehiculo) {
            lanzamiento.style.display = "flex";
        } else {
            lanzamiento.style.display = "none";
        }
    });
}

async function cargarLanzamientos() {
    try {
      const response = await fetch('/json/lanzamientos.json');
      const lanzamientos = await response.json();
      const contenedor = document.getElementById('contenedor-lanzamientos');

      // Convertir fechas y ordenar descendente
      lanzamientos.sort((a, b) => {
        const fechaA = parseFecha(a.fecha);
        const fechaB = parseFecha(b.fecha);
        return fechaB - fechaA; // Más reciente primero
      });

      lanzamientos.forEach(lanzamiento => {

          if (lanzamiento.vehiculo === "Falcon 9 Block 5") {
            var vehiculo = "falcon9";
          } else if (lanzamiento.vehiculo === "Falcon Heavy") {
            var vehiculo = "falconh";
          } else if (lanzamiento.vehiculo === "Cargo Dragon") {
            var vehiculo = "dragon";
          } else if (lanzamiento.vehiculo === "Crew Dragon") {
            var vehiculo = "dragon";
          }
        const div = document.createElement('div');
        div.classList.add('lanzamiento');
        div.setAttribute('data-estado', lanzamiento.estado.toLowerCase());
        div.setAttribute('data-vehiculo', vehiculo);

        if(lanzamiento.ocultar === true) {
          div.style.display = "none";
        }

        var fechaLanzamiento = formatearFecha(lanzamiento.fecha);

        if (fechaLanzamiento === "Fecha inválida") {
          fechaLanzamiento = lanzamiento.fecha;
        }

        let html = `
          <img src="${lanzamiento.imagen}" alt="${lanzamiento.alt}">
          <div class="info-lanzamiento">
              <h3>${lanzamiento.nombre}</h3>
              <p><strong>Fecha:</strong> ${fechaLanzamiento}</p>
              <p><strong>Vehículo:</strong> ${lanzamiento.vehiculo}</p>
              <p><strong>Estado:</strong> ${capitalizar(lanzamiento.estado)}</p>
        `;

        if (lanzamiento.detalleUrl) {
          html += `<p><a href="${lanzamiento.detalleUrl}">Ver detalles</a></p>`;
        }

        if (lanzamiento.stream) {
          html += `<p><a href="${lanzamiento.stream}">Ver directo</a></p>`;
        }

        html += `</div>`;
        div.innerHTML = html;
        contenedor.appendChild(div);
      });

    } catch (error) {
      console.error("Error al cargar los lanzamientos:", error);
    }
  }

  // Convierte fecha tipo "10 de junio, 2025" a objeto Date
  function parseFecha(fechaTexto) {
    const meses = {
      enero: 0, febrero: 1, marzo: 2, abril: 3,
      mayo: 4, junio: 5, julio: 6, agosto: 7,
      septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    const match = fechaTexto.match(/(\d{1,2}) de (\w+), (\d{4})/);
    if (!match) return new Date(0); // Fallback para fechas mal formateadas

    const dia = parseInt(match[1]);
    const mes = meses[match[2].toLowerCase()];
    const año = parseInt(match[3]);

    return new Date(año, mes, dia);
  }

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  document.addEventListener('DOMContentLoaded', cargarLanzamientos);

  function formatearFecha(fechaStr) {
    const meses = [
      "enero", "febrero", "marzo", "abril",
      "mayo", "junio", "julio", "agosto",
      "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const partes = fechaStr.split("/"); // Divide por /
    if (partes.length !== 3) return "Fecha inválida";
  
    const dia = partes[0].padStart(2, '0');
    const mes = parseInt(partes[1], 10) - 1;
    const año = partes[2];
  
    if (mes < 0 || mes > 11) return "Fecha inválida";
  
    return `${dia} de ${meses[mes]}, ${año}`;
  }