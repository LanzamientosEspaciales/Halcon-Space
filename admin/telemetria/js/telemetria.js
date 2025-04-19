function calcularVelocidadOrbital(altitud, cuerpo) {
    // Constantes físicas
    const cuerpos = {
        Kerbin: {
            radio: 600000, // en metros
            GM: 3.5316e12 // en m^3/s^2
        },
        Muna: {
            radio: 200000, // en metros
            GM: 6.5138398e10 // en m^3/s^2
        }
    };

    const datos = cuerpos[cuerpo] || cuerpos.Kerbin;
    const r = datos.radio + altitud * 1000; // altitud convertida a metros
    const v = Math.sqrt(datos.GM / r); // velocidad orbital en m/s
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
        return (Math.random() * (94 - 87) + 87).toFixed(1) + "%";
    } else {
        return (Math.random() * (100 - 96) + 96).toFixed(1) + "%";
    }
}


fetch("../json/satelites.json")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("contenedor-satelites");

        data.forEach(sat => {
            let altitud = valorAleatorio(sat.perigeo, sat.apogeo);
            let velocidad = calcularVelocidadOrbital(altitud, sat.cuerpo);
            let bateria = valorAleatorio(90, 100).toFixed(2);
            const señal = generarSenal(sat.cuerpo);
            


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
