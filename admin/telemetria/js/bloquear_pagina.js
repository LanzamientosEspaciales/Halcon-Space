var contraseña = "aF9@qW1#zXp3Lr8$Tm6*Bs0!KvD4&EyNcU7^Go5+JhMi2%RdSwZCxVnHbAjLtQg"

document.addEventListener("DOMContentLoaded", () => {
    // Estilos CSS
    const style = document.createElement("style");
    style.textContent = `
        #password-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            overflow: hidden;
            scrollbar-width: none
        }

        .password-box {
            background: #1e1e1e;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.1);
        }

        .password-box h2 {
            color: #fff;
            margin-bottom: 20px;
        }

        .password-box input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            width: 250px;
            font-size: 16px;
        }

        .password-box button {
            margin-top: 15px;
            padding: 10px 20px;
            background: #007bff;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        .password-box button:hover {
            background: #0056b3;
        }

        .password-box p {
            color: red;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);

    // HTML del formulario
    const overlay = document.createElement("div");
    overlay.id = "password-overlay";
    overlay.innerHTML = `
        <div class="password-box">
            <h2>Acceso restringido</h2>
            <input type="password" id="password-input" placeholder="Contraseña">
            <button id="password-submit">Entrar</button>
            <p id="password-error" style="display:none;">Contraseña incorrecta</p>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("password-input");
    const submit = document.getElementById("password-submit");
    const errorMsg = document.getElementById("password-error");

    function checkPassword() {
        const password = input.value.trim();
        if (password === contraseña) {
            overlay.remove();
        } else {
            errorMsg.style.display = "block";
            input.value = "";
            input.focus();
        }
    }

    submit.addEventListener("click", checkPassword);
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") checkPassword();
    });
});
