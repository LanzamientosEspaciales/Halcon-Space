document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario-contacto");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevenir el envío tradicional del formulario


        // Obtener los datos del formulario
        const discord = document.querySelector("#discord").value;
        const cliente = document.querySelector("#cliente").value;
        const tipoMision = document.querySelector("#tipo-mision").value;
        const vehiculo = document.querySelector("#vehiculo").value;
        const cargaUtil = document.querySelector("#carga-util").value;
        const datos = document.querySelector("#datos-mision").value;

        if (!discord || !cliente || !tipoMision || !vehiculo || !cargaUtil || !datos) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        const webhookURL = "https://discord.com/api/webhooks/1222751609830903819/PyYz-sP37OvkMUFYMdnYshSUGQRNgsMwSUaRpSc4jFA9CLh7TwCU-O9RjIUt4E2q-W1d"; // Reemplaza esto con tu URL del webhook

        // Contenido del mensaje a enviar
        const payload = {
            username: "Halcon Space",
            avatar_url: "https://halconspace.site/img/logo.png", // Opcional: URL del avatar
            embeds: [
                {
                    title: "Nuevo contrato de misión",
                    color: 16711680, // Rojo
                    fields: [
                        { name: "Cliente: ", value: cliente, inline: true },
                        { name: "ID de Discord: ", value: discord, inline: true },
                        { name: "Tipo de Misión: ", value: tipoMision, inline: true },
                        { name: "Vehículo: ", value: vehiculo, inline: true },
                        { name: "Carga Util: ", value: cargaUtil, inline: true },
                        { name: "Datos: ", value: datos, inline: false },
                    ],
                    timestamp: new Date().toISOString(), // Agregar timestamp
                },
            ],
        };

        try {
            // Enviar los datos al webhook
            const response = await fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");
                formulario.reset(); // Limpiar formulario tras el envío
            } else {
                alert("Hubo un problema al enviar el formulario. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al enviar el formulario. Revisa tu conexión o contáctanos directamente.");
        }
    });
});
