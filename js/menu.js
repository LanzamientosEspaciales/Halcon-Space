document.addEventListener("DOMContentLoaded", () => {
    fetch("https://halconspace.site/menu")
    //fetch("../menu.html")
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
     <svg class="svgg" viewBox="25 25 50 50">
         <circle class="circle" r="20" cy="50" cx="50"></circle>
     </svg>
 `;
 
 // Agregar el loader al cuerpo del documento
 document.body.insertAdjacentElement("afterbegin", loader);
 
 // Crear y agregar el CSS del loader dinámicamente
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
 
 // Ocultar el loader cuando la página haya cargado completamente
 window.addEventListener("load", function () {
     document.getElementById("loader").style.display = "none";
 });


 // 1. Crear el script async del gtag.js
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-7S8NZ102SQ';

// 2. Insertarlo en el <head>
document.head.appendChild(gtagScript);

// 3. Crear el segundo script con el código de configuración
const inlineScript = document.createElement('script');
inlineScript.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7S8NZ102SQ');
`;

// 4. Insertarlo en el <head> también
document.head.appendChild(inlineScript);
