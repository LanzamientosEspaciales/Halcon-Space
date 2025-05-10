async function cargarEstadoKalypso() {
    try {
      // Cambia esta ruta si el JSON está en otro lugar
      const response = await fetch('../json/kalypso.json');
      const data = await response.json();
      const status = data.kalypso_status;

      document.getElementById("sat-activos").textContent = `${status.satellites_active} / ${status.satellites_total}`;
      document.getElementById("planos-operativos").textContent = `${status.operational_planes} / 24`;
      if (status.latency_ms_avg === null) {
        document.getElementById("latencia").textContent = "-- ms";
      } else {
        document.getElementById("latencia").textContent = `${status.latency_ms_avg} ms`;
      }
      
      document.getElementById("ultimo-ping").textContent = status.last_ping || "--:--:--";
    }
    catch (error) {
        
    }
  }

  // Cargar al iniciar y actualizar cada 10 segundos
  cargarEstadoKalypso();
  setInterval(cargarEstadoKalypso, 10000);