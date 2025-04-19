// Se ejecuta apenas se carga la página
const contraseña = "halcon2025"; // Cambia esto por tu contraseña
const intento = prompt("🔒 Página protegida\nPor favor ingresa la contraseña:");

if (intento !== contraseña) {
    alert("Contraseña incorrecta. No tienes acceso.");
    // Redirige o cierra el contenido
    document.write("<h1 style='color:white; text-align:center;'>Acceso denegado.</h1>");
    throw new Error("Acceso denegado.");
}