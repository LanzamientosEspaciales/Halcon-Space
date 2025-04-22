document.addEventListener("DOMContentLoaded", () => {
    fetch("../menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            // Ahora que el menú está cargado, activar la página actual
            const currentPath = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
            const menuLinks = document.querySelectorAll("#menu a");
            const navo = document.querySelector("header nav");

            menuLinks.forEach(link => {
                const page = link.getAttribute("data-page"); // Obtiene el data-page
                if (currentPath.includes(page)) {
                    link.classList.add("active"); // Activa la clase si la URL coincide
                }
            });

            // Agregar funcionalidad al botón del menú móvil
            const menuToggle = document.querySelector(".menu-toggle");
            const nav = document.querySelector("#menu");

            menuToggle.addEventListener("click", () => {
                nav.classList.toggle("open"); // Muestra o esconde el menú

                
                if (nav.classList.contains("open")) {
                    menuToggle.innerHTML = "✖";
                } else {
                    menuToggle.innerHTML = "☰";
                }
            });

        })
        .catch(error => console.error("Error al cargar el menú:", error));
});

// Crear el loader dinámicamente
const loader = document.createElement("div");
loader.id = "loader";
loader.innerHTML = `
    <!-- From Uiverse.io by wojtek_4284 --> 
<div id="box">
  <div id="l1">C</div>
  <div id="l2">A</div>
  <div id="l3">R</div>
  <div id="l4">G</div>
  <div id="l5">A</div>
  <div id="l6">N</div>
  <div id="l7">D</div>
  <div id="l8">O</div>
</div>
`;

// Agregar el loader al cuerpo del documento
document.body.insertAdjacentElement("afterbegin", loader);

// Crear y agregar el CSS del loader dinámicamente
const styles = document.createElement("style");
styles.innerHTML = `
    /* From Uiverse.io by wojtek_4284 */ 
#box div {
  display: inline-block;
  margin: 5px;
  font-size: 35px;
  animation: 2s obrot linear infinite;
}

#box {
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes obrot {
  0% {
    transform: rotateX(0);
  }
  12.5% {
    transform: rotateX(90deg);
  }
  25% {
    transform: rotateX(180deg);
  }
  37.5% {
    transform: rotateX(270deg);
  }
  50% {
    transform: rotateX(360deg);
  }
  100% {
    transform: rotateX(360deg);
  }
}

#box div:nth-child(1) {
  animation-delay: 0s;
}
#box div:nth-child(2) {
  animation-delay: 0.1s;
}
#box div:nth-child(3) {
  animation-delay: 0.2s;
}
#box div:nth-child(4) {
  animation-delay: 0.3s;
}
#box div:nth-child(5) {
  animation-delay: 0.4s;
}
#box div:nth-child(6) {
  animation-delay: 0.5s;
}
#box div:nth-child(7) {
  animation-delay: 0.6s;
}
#box div:nth-child(8) {
  animation-delay: 0.7s;
}
`;
document.head.appendChild(styles);

// Ocultar el loader cuando la página haya cargado completamente
window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
});