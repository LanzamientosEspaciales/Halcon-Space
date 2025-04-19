const url = "https://script.google.com/macros/s/AKfycbx6-_3coXQRTiICTIOm4g0FPO9BJGDPkQhHK47B_mWZR46SVK3sGRzfeISno2KTNQW5_g/exec";

fetch(url)
  .then(response => response.json())
  .then(data => {
    document.getElementById("vehiculo").textContent = data["Nombre de vehículo"];
    document.getElementById("mision").textContent = data["Nombre de misión"];
    document.getElementById("plataforma").textContent = data["Plataforma de lanzamiento"];
    
    document.getElementById("comunicaciones").textContent = data["Comunicaciones"];
    document.getElementById("camaras").textContent = data["Cámaras"];
    document.getElementById("range").textContent = data["Range"];

    // Y así sucesivamente para cada campo...
  })
  .catch(error => console.error("Error al cargar datos:", error));