document.addEventListener("DOMContentLoaded", () => {
    // Cargar menú
    fetch("https://halconspace.site/menu")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            // Activar página actual en menú
            const currentPath = window.location.pathname.split("/").pop();
            const menuLinks = document.querySelectorAll("#menu a");

            menuLinks.forEach(link => {
                const page = link.getAttribute("data-page");
                if (currentPath.includes(page)) {
                    link.classList.add("active");
                }
            });

            // Botón menú móvil
            const menuToggle = document.querySelector(".menu-toggle");
            const nav = document.querySelector("#menu");

            menuToggle.addEventListener("click", () => {
                nav.classList.toggle("open");
                menuToggle.innerHTML = nav.classList.contains("open") ? "✖" : "☰";
            });
        })
        .catch(error => console.error("Error al cargar el menú:", error));

    // Agregar footer dinámicamente
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <p>© 2025 Halcon Space. Todos los derechos reservados.</p>
        <nav>
            <a href="lanzamientos">Lanzamientos</a> | 
            <a href="vehiculos">Vehículos</a> | 
            <a href="contacto">Contacto</a> | 
            <a href="discord">Discord</a> | 
            <a href="https://www.youtube.com/@HalconSpace" target="_blank">YouTube</a>
        </nav>
    `;
    document.body.appendChild(footer);
});

// Loader dinámico
const loader = document.createElement("div");
loader.id = "loader";
loader.innerHTML = `
    <svg class="svgg" viewBox="25 25 50 50">
        <circle class="circle" r="20" cy="50" cx="50"></circle>
    </svg>
`;
document.body.insertAdjacentElement("afterbegin", loader);

const styles = document.createElement("style");
styles.innerHTML = `
    #loader {
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
    .svgg {
        width: 3.25em;
        transform-origin: center;
        animation: rotate4 2s linear infinite;
    }
    .circlee {
        fill: none;
        stroke: hsl(214, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash4 1.5s ease-in-out infinite;
    }
    @keyframes rotate4 {
        100% { transform: rotate(360deg); }
    }
    @keyframes dash4 {
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
        100% { stroke-dashoffset: -125px; }
    }
`;
document.head.appendChild(styles);

window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
});

// Google Analytics
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-7S8NZ102SQ';
document.head.appendChild(gtagScript);

const inlineScript = document.createElement('script');
inlineScript.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7S8NZ102SQ');
`;
document.head.appendChild(inlineScript);
