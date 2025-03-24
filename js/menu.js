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

// Crear el contenedor del loader dinámicamente
const loader = document.createElement("div");
loader.id = "custom-loader";
loader.innerHTML = `
    <svg id="custom-loader-svg" viewBox="25 25 50 50">
        <circle id="custom-loader-circle" r="20" cy="50" cx="50"></circle>
    </svg>
`;

// Agregar el loader al cuerpo del documento
document.body.insertAdjacentElement("afterbegin", loader);

// Crear y agregar el CSS del loader dinámicamente
const styles = document.createElement("style");
styles.innerHTML = `
    #custom-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    #custom-loader-svg {
        width: 3.25em;
        transform-origin: center;
        animation: custom-rotate 2s linear infinite;
    }

    #custom-loader-circle {
        fill: none;
        stroke: hsl(214, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: custom-dash 1.5s ease-in-out infinite;
    }

    @keyframes custom-rotate {
        100% { transform: rotate(360deg); }
    }

    @keyframes custom-dash {
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
        100% { stroke-dashoffset: -125px; }
    }
`;
document.head.appendChild(styles);

// Ocultar el loader cuando la página haya cargado completamente
window.addEventListener("load", function () {
    document.getElementById("custom-loader").style.display = "none";
});
