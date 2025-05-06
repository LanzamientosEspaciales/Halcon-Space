document.addEventListener("DOMContentLoaded", function () {
  fetch("../json/propulsores.json")  
  //fetch("https://halconspace.site/json/propulsores.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar el JSON");
        return response.json();
      })
      .then(data => {
        const galeria = document.getElementById("gallery");
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modal-title");
        const modalVuelos = document.getElementById("modal-vuelos");
        const closeButton = document.querySelector(".close-button");
  
        // Cerrar el modal al hacer clic en la X
        closeButton.addEventListener("click", () => {
          modal.classList.add("oculto");
          modalVuelos.innerHTML = "";
        });
  
        // Cerrar modal si se hace clic fuera del contenido
        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.add("oculto");
            modalVuelos.innerHTML = "";
          }
        });
  
        for (const [id, propulsor] of Object.entries(data.propulsores)) {
          const cantidadVuelos = Object.keys(propulsor.vuelos).length;
  
          const item = document.createElement("div");
          item.className = "gallery-item";
          item.className += ` estado-${propulsor.estado === "activo" ? "activo" : "retirado"}`;
          item.id = `propulsor-item`;
  
          item.innerHTML = `
            <img src="${propulsor.img}" alt="Propulsor ${id}">
            <div class="gallery-item-overlay">
              <div class="gallery-item-title">${id}</div>
              <div class="gallery-item-desc">
                <span>Cantidad de vuelos: <span>${cantidadVuelos}</span></span><br>
                <span>Tipo: <span class="tipoPropulsor">${propulsor.tipo}</span></span>
                <div class="gallery-item-estado-${propulsor.estado === "activo" ? "activo" : "retirado"}">
                  ${propulsor.estado === "activo" ? "Activo" : "Retirado"}
                </div>
              </div>
              <button class="gallery-item-button">Ver más</button>
            </div>
          `;
  
          // Manejar clic en "Ver más"
          const button = item.querySelector(".gallery-item-button");
          button.addEventListener("click", () => {
            modalTitle.textContent = `Vuelos del propulsor ${id}`;
            modalVuelos.innerHTML = "";
          
            const vuelos = propulsor.vuelos;
            for (const vueloId in vuelos) {
              const vuelo = vuelos[vueloId];
          
              // Solo agregar el vuelo si la misión, fecha o URL no están vacíos
              if (vuelo.mision || vuelo.fecha || vuelo.url) {
                const li = document.createElement("li");
                li.innerHTML = `
                  <strong>${vuelo.mision || "Misión sin nombre"}</strong> — ${vuelo.fecha || "Fecha no disponible"}
                  ${vuelo.url ? ` - <a href="${vuelo.url}" target="_blank">Ver misión</a>` : ""}
                `;
                modalVuelos.appendChild(li);
              }
            }
          
            // Mostrar el modal
            modal.classList.remove("oculto");
          });
          
  
          galeria.appendChild(item);
        }
      })
      .catch(error => {
        console.error("Ocurrió un error al cargar el JSON:", error);
      });
  });
  
  // Filtro de búsqueda
  document.getElementById('searchInput').addEventListener('input', function () {
    const keyword = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.gallery-item');
  
    cards.forEach(card => {
      const serialBooster = card.querySelector('.gallery-item-title').innerText.toLowerCase();
      const tipoBooster = card.querySelector('.tipoPropulsor').innerText.toLowerCase();
  
      if (serialBooster.includes(keyword) || tipoBooster.includes(keyword)) {
        card.classList.remove('oculto');
      } else {
        card.classList.add('oculto');
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const filtro = document.getElementById("estado");
  
    filtro.addEventListener("change", function () {
      const valor = this.value;
      const items = document.querySelectorAll(".gallery-item"); // Actualizamos aquí
  
      items.forEach(item => {
        const coincide =
          valor === "todos" ||
          item.classList.contains(`estado-${valor}`);
        item.classList.toggle("oculto", !coincide);
      });
    });
  });