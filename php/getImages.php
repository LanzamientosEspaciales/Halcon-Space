<?php
header("Content-Type: application/json");

// Función para obtener imágenes de todas las carpetas dentro de /img
function obtenerImagenes($directorio) {
    $imagenes = [];
    $formatosPermitidos = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (is_dir($directorio)) {
        foreach (scandir($directorio) as $archivo) {
            $rutaArchivo = $directorio . '/' . $archivo;
            $ext = pathinfo($archivo, PATHINFO_EXTENSION);

            if (is_file($rutaArchivo) && in_array(strtolower($ext), $formatosPermitidos)) {
                $imagenes[] = $rutaArchivo;
            }
        }
    }
    return $imagenes;
}

// Buscar imágenes dentro de /img y sus subcarpetas
$rutaBase = "../img/";
$carpetas = array_filter(glob($rutaBase . '*'), 'is_dir');
$imagenesTotales = [];

foreach ($carpetas as $carpeta) {
    $imagenesTotales = array_merge($imagenesTotales, obtenerImagenes($carpeta));
}

// Convertir rutas a formato web
$imagenesTotales = array_map(fn($img) => str_replace("../", "", $img), $imagenesTotales);

echo json_encode($imagenesTotales);
?>
