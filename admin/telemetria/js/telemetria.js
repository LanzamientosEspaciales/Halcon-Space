function calcularVelocidadOrbital(altitud, cuerpo) {
    const cuerpos = {
        Kerbin: {
            radio: 600000,
            GM: 3.5316e12
        },
        Muna: {
            radio: 200000,
            GM: 6.5138398e10
        }
    };

    const datos = cuerpos[cuerpo] || cuerpos.Kerbin;
    const r = datos.radio + altitud * 1000;
    const v = Math.sqrt(datos.GM / r);
    return {
        ms: v.toFixed(2),
        kmh: (v * 3.6).toFixed(2)
    };
}

function valorAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function generarSenal(cuerpo) {
    if (cuerpo === "Muna") {
        return (Math.random() * (94 - 87) + 87).toFixed(1);
    } else {
        return (Math.random() * (100 - 96) + 96).toFixed(1);
    }
}

let satelites = [];

function renderizarSatelites(data) {
    const contenedor = document.getElementById("contenedor-satelites");
    contenedor.innerHTML = "";

    data.forEach(sat => {
        let altitud = valorAleatorio(sat.perigeo, sat.apogeo);
        let velocidad = calcularVelocidadOrbital(altitud, sat.cuerpo);
        let bateria = valorAleatorio(90, 100).toFixed(2);
        let señal = generarSenal(sat.cuerpo);

        const div = document.createElement("div");
        div.classList.add("satelite");

        div.innerHTML = `
            <h3>${sat.nombre}</h3>
            <p><strong>Cuerpo:</strong> ${sat.cuerpo}</p>
            <p><strong>Altitud actual:</strong> ${altitud.toFixed(2)} km</p>
            <p><strong>Perigeo:</strong> ${sat.perigeo} km</p>
            <p><strong>Apogeo:</strong> ${sat.apogeo} km</p>
            <p><strong>Velocidad:</strong> ${velocidad.ms} m/s (${velocidad.kmh} km/h)</p>
            <p><strong>Señal:</strong> ${señal}%</p>
            <div class="barraSeñal">
                <div class="barra-interna-señal" style="width: ${señal}%;"></div>
            </div>
            <p><strong>Batería:</strong> ${bateria}%</p>
            <div class="barraBateria">
                <div class="barra-interna-bateria" style="width: ${bateria}%;"></div>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

function aplicarFiltros() {
    const cuerpo = document.getElementById("filtro-cuerpo").value;
    const programa = document.getElementById("filtro-programa").value;

    const filtrados = satelites.filter(sat => {
        const coincideCuerpo = cuerpo === "" || sat.cuerpo === cuerpo;
        const coincidePrograma = programa === "" || sat.programa === programa;
        return coincideCuerpo && coincidePrograma;
    });

    renderizarSatelites(filtrados);
}


document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/satelites.json")
        .then(res => res.json())
        .then(data => {
            // Guardamos la lista completa
            satelites = data;

            // Renderizamos todo al inicio
            renderizarSatelites(satelites);

            // Agregamos listeners
            document.getElementById("filtro-cuerpo").addEventListener("change", aplicarFiltros);
            document.getElementById("filtro-programa").addEventListener("change", aplicarFiltros);


            if (filtroCuerpo) {
                filtroCuerpo.addEventListener("change", aplicarFiltros);
            }
        })
        .catch(error => {
            console.error("Error al cargar la telemetría:", error);
        });
});