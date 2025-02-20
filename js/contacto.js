document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario-contacto");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevenir el envío tradicional del formulario

        const nombre = document.querySelector("#nombre").value;
        const idDiscord = document.querySelector("#id-Discord").value;
        const mensaje = document.querySelector("#mensaje").value;

        if (!nombre || !idDiscord || !mensaje) {
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
                    title: "Nuevo mensaje de contacto",
                    color: 16711680, // Rojo
                    fields: [
                        { name: "Nombre", value: nombre, inline: true },
                        { name: "ID de Discord", value: idDiscord, inline: true },
                        { name: "Mensaje", value: mensaje, inline: false },
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