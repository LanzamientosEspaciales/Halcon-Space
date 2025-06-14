async function obtenerProximoLanzamiento() {
    try {
      const respuesta = await fetch('/json/lanzamientos.json');
      if (!respuesta.ok) throw new Error('Error al cargar el archivo JSON');

      const lanzamientos = await respuesta.json();

      function parseFecha(fechaStr) {
        const match = fechaStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!match) return null;
        const [_, day, month, year] = match;
        const fecha = new Date(`${year}-${month}-${day}`);
        fecha.setHours(0, 0, 0, 0);
        return fecha;
      }

      function formatearFecha(fechaStr) {
        const meses = [
          "enero", "febrero", "marzo", "abril",
          "mayo", "junio", "julio", "agosto",
          "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const partes = fechaStr.split("/");
        if (partes.length !== 3) return "Fecha inválida";
        const dia = partes[0].padStart(2, '0');
        const mes = parseInt(partes[1], 10) - 1;
        const año = partes[2];
        if (mes < 0 || mes > 11) return "Fecha inválida";
        return `${dia} de ${meses[mes]}, ${año}`;
      }

      const proximos = lanzamientos
        .map(l => ({ ...l, fechaObj: parseFecha(l.fecha) }))
        .filter(l => l.fechaObj && l.estado === "programado")
        .sort((a, b) => a.fechaObj - b.fechaObj);

      const contenedor = document.getElementById('proximo-lanzamiento');
      const seccion = document.querySelector('section.nextLaunch');

      if (proximos.length === 0) {
        if (seccion) seccion.style.display = 'none';
        return;
      } else {
        if (seccion) seccion.style.display = 'block';
      }

      const proximo = proximos[0];

      const div = document.createElement('div');
      div.className = 'launch-info';

      const titulo = document.createElement('h5');
      titulo.textContent = proximo.nombre;

      const vehiculo = document.createElement('p');
      vehiculo.innerHTML = `<strong>Vehículo:</strong> ${proximo.vehiculo}`;

      const fechaTexto = document.createElement('p');
      fechaTexto.innerHTML = `<strong>Fecha:</strong> NET ${formatearFecha(proximo.fecha)}`;

      const imagen = document.createElement('img');
      imagen.src = proximo.imagen.startsWith('/') ? proximo.imagen.slice(1) : proximo.imagen;
      imagen.alt = proximo.alt || proximo.nombre;

      div.append(titulo, vehiculo, fechaTexto, imagen);

      if (proximo.detalleUrl) {
        const link = document.createElement('p');
        const a = document.createElement('a');
        a.href = proximo.detalleUrl;
        a.textContent = 'Ver detalles';
        link.appendChild(a);
        div.appendChild(link);
      }

      contenedor.appendChild(div);

    } catch (error) {
      // Error sin mostrar en consola, se podría manejar aquí si querés
    }
  }

  obtenerProximoLanzamiento();