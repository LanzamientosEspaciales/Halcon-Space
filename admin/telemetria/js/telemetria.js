function calcularVelocidadOrbital(altitudKm) {
    const G = 6.67430e-11;
    const M = 5.2915793e22; // Masa de Kerbin
    const radioKerbin = 600000; // m
    const r = radioKerbin + (altitudKm * 1000);

    const velocidadMs = Math.sqrt(G * M / r);
    const velocidadKmh = velocidadMs * 3.6;

    return {
        ms: velocidadMs.toFixed(2) + " m/s",
        kmh: velocidadKmh.toFixed(2) + " km/h"
    };
}

function valorAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

fetch("../json/satelites.json")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("contenedor-satelites");

        data.forEach(sat => {
            let altitud = valorAleatorio(sat.perigeo, sat.apogeo);
            let velocidad = calcularVelocidadOrbital(altitud);
            let bateria = valorAleatorio(90, 100).toFixed(2);
            let señal = valorAleatorio(96, 100).toFixed(2);

            const div = document.createElement("div");
            div.classList.add("satelite");

            div.innerHTML = `
                <h3>${sat.nombre}</h3>
                <p><strong>Altitud actual:</strong> ${altitud.toFixed(2)} km</p>
                <p><strong>Perigeo:</strong> ${sat.perigeo} km</p>
                <p><strong>Apogeo:</strong> ${sat.apogeo} km</p>
                <p><strong>Velocidad:</strong> ${velocidad.ms} (${velocidad.kmh})</p>
                <p><strong>Señal:</strong> ${señal}%</p>
                <div class="barraSeñal">
                    <div class="barra-interna-señal" style="width: ${señal};"></div>
                </div>
                <p><strong>Batería:</strong> ${bateria}%</p>
                <div class="barraBateria">
                    <div class="barra-interna-bateria" style="width: ${bateria};"></div>
                </div>

            `;

            const barraInternaSeñal = div.querySelector(".barra-interna-señal");
            const barraInternaBateria = div.querySelector(".barra-interna-bateria");
            barraInternaSeñal.style.width = `${señal}%`;
            barraInternaBateria.style.width = `${bateria}%`;


            contenedor.appendChild(div);

        });
    })
    .catch(error => {
        console.error("Error al cargar la telemetría:", error);
    });
