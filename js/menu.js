document.addEventListener("DOMContentLoaded", () => {
    fetch("../menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            // Ahora que el menú está cargado, activar la página actual
            const currentPath = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
            const menuLinks = document.querySelectorAll("#menu a");

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
            });

        })
        .catch(error => console.error("Error al cargar el menú:", error));
});
