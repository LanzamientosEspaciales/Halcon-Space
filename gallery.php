<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Galería de Imágenes</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <h1>Galería de Imágenes</h1>
    <div class="galeria">
        <?php
        $folder = 'img/fotos';
        $imagenes = glob($folder . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);

        if ($imagenes) {
            foreach ($imagenes as $img) {
                echo "<div class='item'><img src='$img' alt='Imagen'></div>";
            }
        } else {
            echo "<p>No se encontraron imágenes en la carpeta.</p>";
        }
        ?>
    </div>
</body>
</html>
