document.addEventListener("DOMContentLoaded", () => {
  const nextLaunchContainer = document.getElementById("proximo-lanzamiento");

  async function cargarLanzamientos() {
    try {
      const response = await fetch('json/lanzamientos.json');
      const lanzamientos = await response.json();

      // Filtramos solo lanzamientos visibles
      const visibles = lanzamientos.filter(l => !l.ocultar);

      if (!visibles.length) {
        nextLaunchContainer.innerHTML = "<p>No hay lanzamientos registrados.</p>";
        return;
      }

      // Ordenamos por fecha para sacar último y próximo
      const lanzamientosConFecha = visibles
        .filter(l => l.fecha.match(/\d{2}\/\d{2}\/\d{4}/))
        .sort((a, b) => {
          const [d1, m1, y1] = a.fecha.split('/');
          const [d2, m2, y2] = b.fecha.split('/');
          return new Date(`${y1}-${m1}-${d1}`) - new Date(`${y2}-${m2}-${d2}`);
        });

      const ahora = new Date();

      // Próximo lanzamiento: primer lanzamiento futuro
      const proximo = lanzamientosConFecha.find(l => {
        const [d, m, y] = l.fecha.split('/');
        return new Date(`${y}-${m}-${d}`) >= ahora && l.estado === "programado";
      }) || lanzamientosConFecha[lanzamientosConFecha.length - 1];

      // Último lanzamiento: último lanzamiento pasado
      const ultimo = [...lanzamientosConFecha].reverse().find(l => {
        const [d, m, y] = l.fecha.split('/');
        return new Date(`${y}-${m}-${d}`) < ahora;
      }) || lanzamientosConFecha[0];

      function crearTarjeta(lanzamiento, tipo) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("launch-info");
        tarjeta.classList.add("lanzamiento-status-" + lanzamiento.estado.toLowerCase());

        tarjeta.innerHTML = `
          <h4>${tipo}:</h4>
          <img src="${lanzamiento.imagen}" alt="${lanzamiento.alt || lanzamiento.nombre}">
          <h5>${lanzamiento.nombre}</h5>
          <p>Fecha: ${lanzamiento.fecha}</p>
          <p>Estado: <strong>${lanzamiento.estado.charAt(0).toUpperCase() + lanzamiento.estado.slice(1)}</strong></p>
          ${lanzamiento.detalleUrl ? `<a href="${lanzamiento.detalleUrl}">Más info</a>` : ""}
          ${lanzamiento.stream ? `<a href="${lanzamiento.stream}" target="_blank" class="btn-stream">Ver Stream</a>` : ""}
        `;

        // Countdown solo para próximo
        if (tipo === "Próximo lanzamiento" && lanzamiento.fecha.match(/\d{2}\/\d{2}\/\d{4}/)) {
          const fechaParts = lanzamiento.fecha.split('/');
          const launchDate = new Date(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`);
          const countdown = document.createElement("p");
          countdown.classList.add("countdown");
          tarjeta.appendChild(countdown);

          setInterval(() => {
            const diff = launchDate - new Date();
            if (diff <= 0) {
              countdown.textContent = "¡Hoy es el lanzamiento!";
              return;
            }
            const days = Math.ceil(diff / (1000*60*60*24));
            countdown.textContent = `${days} día${days>1?'s':''} restante${days>1?'s':''}`;
          }, 1000);
        }

        return tarjeta;
      }

      nextLaunchContainer.innerHTML = "";
      nextLaunchContainer.appendChild(crearTarjeta(ultimo, "Último lanzamiento"));
      nextLaunchContainer.appendChild(crearTarjeta(proximo, "Próximo lanzamiento"));

    } catch (error) {
      console.error("Error cargando lanzamientos:", error);
      nextLaunchContainer.innerHTML = "<p>Error cargando los lanzamientos.</p>";
    }
  }

  cargarLanzamientos();
});
