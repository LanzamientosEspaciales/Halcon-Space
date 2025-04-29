// Obtener todas las imágenes de la galería
const images = document.querySelectorAll('.gallery-img');

// Obtener el contenedor del lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Cuando se hace clic en una imagen de la galería
images.forEach((img) => {
    img.addEventListener('click', () => {
        // Mostrar el lightbox con la imagen seleccionada
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

// Cuando se hace clic en el botón de cierre
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Cerrar el lightbox si se hace clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
