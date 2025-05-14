let scene, camera, renderer, controls, kerbin, orbits = [], markers = [];
let satellitesData = [];

function init() {
    // Configurar la escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.75 / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
    document.getElementById('map').appendChild(renderer.domElement);

    // Controles de órbita
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Crear Kerbin
    const geometry = new THREE.SphereGeometry(6, 32, 32); // Radio de Kerbin: 6 (escala arbitraria)
    const texture = new THREE.TextureLoader().load('textures/kerbin.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    kerbin = new THREE.Mesh(geometry, material);
    scene.add(kerbin);

    // Cargar datos
    fetch('json/mapa.json')
        .then(response => response.json())
        .then(data => {
            satellitesData = data.satellites;
            loadLocations(data.locations);
            populateSatelliteFilter();
            updateOrbits('all', 'all');
        });

    // Animación
    animate();
}

function loadLocations(locations) {
    locations.forEach(loc => {
        const { lat, lon, type } = loc;
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        const radius = 6.1; // Ligeramente por encima de la superficie
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
            color: type === 'launch' ? 0xff0000 : 0x00ff00 // Rojo para lanzamiento, verde para aterrizaje
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z);
        scene.add(marker);
        markers.push(marker);
    });
}

function populateSatelliteFilter() {
    const satelliteFilter = document.getElementById('satellite-filter');
    satelliteFilter.innerHTML = '<option value="all">Todos</option>';
    satellitesData.forEach(sat => {
        const option = document.createElement('option');
        option.value = sat.name;
        option.textContent = sat.name;
        satelliteFilter.appendChild(option);
    });
}

function updateOrbits(program, satellite) {
    // Limpiar órbitas anteriores
    orbits.forEach(orbit => scene.remove(orbit));
    orbits = [];

    // Filtrar satélites
    let filteredSatellites = satellitesData;
    if (program !== 'all') {
        filteredSatellites = filteredSatellites.filter(sat => sat.program === program);
    }
    if (satellite !== 'all') {
        filteredSatellites = filteredSatellites.filter(sat => sat.name === satellite);
    }

    // Dibujar órbitas
    filteredSatellites.forEach(sat => {
        const { semiMajorAxis, eccentricity, inclination } = sat.orbit;
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const angle = (i / 100) * 2 * Math.PI;
            const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle);
            points.push(new THREE.Vector3(x, 0, z));
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        orbit.rotation.x = inclination * Math.PI / 180;
        scene.add(orbit);
        orbits.push(orbit);

        // Actualizar info
        document.getElementById('info').innerHTML = `
            <h3>Información</h3>
            <p>Satélite: ${sat.name}</p>
            <p>Programa: ${sat.program}</p>
            <p>Semi-eje mayor: ${sat.orbit.semiMajorAxis} km</p>
            <p>Excentricidad: ${sat.orbit.eccentricity}</p>
            <p>Inclinación: ${sat.orbit.inclination}°</p>
        `;
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Manejo de filtros
document.getElementById('program-filter').addEventListener('change', (e) => {
    updateOrbits(e.target.value, document.getElementById('satellite-filter').value);
});

document.getElementById('satellite-filter').addEventListener('change', (e) => {
    updateOrbits(document.getElementById('program-filter').value, e.target.value);
});

// Inicializar
init();

// Manejo de redimensionamiento
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth * 0.75 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
});