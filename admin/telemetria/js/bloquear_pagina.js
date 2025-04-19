(function() {
    const contraseña = "halcon2025";

    // Verificamos si ya está autenticado
    if (localStorage.getItem("autenticado") === "true") {
        return; // Si está autenticado, no hacemos nada y dejamos que la página se muestre
    }

    // Si no está autenticado, bloqueamos la página y pedimos contraseña
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: black;
            color: white;
            font-family: sans-serif;
            text-align: center;
        ">
            <h2>🔒 Página protegida</h2>
            <p>Por favor ingresa la contraseña:</p>
            <input type="password" id="passwordInput" placeholder="Contraseña" style="padding: 10px; font-size: 1em; margin-bottom: 10px;">
            <br>
            <button id="accederBtn" style="padding: 10px 20px; font-size: 1em;">Acceder</button>
            <p id="mensaje" style="color: red; margin-top: 10px;"></p>
        </div>
    `;

    document.getElementById("accederBtn").addEventListener("click", () => {
        const intento = document.getElementById("passwordInput").value;
        const mensaje = document.getElementById("mensaje");

        if (intento === contraseña) {
            localStorage.setItem("autenticado", "true"); // Marcamos que ya pasó
            location.reload(); // Recargamos la página para mostrar el contenido real
        } else {
            mensaje.textContent = "❌ Contraseña incorrecta.";
            document.getElementById("passwordInput").value = "";
        }
    });
})();
