fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        console.log('Lanzamientos globales:', data.lanzamientos_globales);
    })
    .catch(error => console.error('Error al cargar datos:', error));
