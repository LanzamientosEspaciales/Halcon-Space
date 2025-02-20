document.addEventListener("DOMContentLoaded", () => {
    fetch("php/getImages.php")
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById("gallery");

            data.forEach(imgSrc => {
                let imgContainer = document.createElement("div");
                imgContainer.classList.add("gallery-item");

                let img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "Imagen de la galería";
                img.onclick = () => openModal(imgSrc);

                imgContainer.appendChild(img);
                gallery.appendChild(imgContainer);
            });
        })
        .catch(error => console.error("Error cargando imágenes:", error));
});

// Función para abrir el modal con la imagen seleccionada
function openModal(src) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImg");

    modal.style.display = "block";
    modalImg.src = src;
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
