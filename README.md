# PDF Merger

Una pequeña aplicación web (frontend) para: añadir una portada o contraportada a uno o varios PDFs y descargar los resultados empaquetados en un ZIP.

Características
- Arrastrar y soltar o seleccionar archivos PDF principales (múltiples).
- Seleccionar un PDF para insertar como portada o contraportada.
- Elegir si insertar la página(s) al inicio (First Page) o al final (Last Page) del PDF principal.
- Genera un ZIP con todos los PDFs procesados listos para descargar.

Cómo funciona
- Selecciona o arrastra uno o varios PDFs en la sección "Main PDFs".
- Selecciona o arrastra un PDF en la sección "PDF to Insert" (la portada/contraportada).
- Elige la posición de inserción: "First Page" o "Last Page".
- Pulsa "Merge PDFs" y se generará un ZIP con los archivos resultantes para descargar.

Demo / Capturas
- El proyecto es una interfaz web simple contenida en `index.html` con estilos en `style.css` y la lógica en `script.js`.

Dependencias (en el navegador)
- pdf-lib (incluido mediante CDN en `index.html`) — para manipular PDFs en el cliente.
- JSZip (incluido mediante CDN en `index.html`) — para crear el ZIP de salida.

Instalación y ejecución local
Este proyecto es estático y no requiere compilación: basta abrir `index.html` en un navegador moderno. Para evitar problemas con políticas de archivo en algunos navegadores, sirve la carpeta con un servidor local. Ejemplo usando Python 3:

```bash
python3 -m http.server 8000
# Abrir en el navegador: http://localhost:8000
```

Uso recomendado
- Usa archivos PDF no demasiado grandes (el procesamiento ocurre en el navegador y depende de la memoria disponible).
- Si vas a procesar muchos PDFs o muy pesados, considera hacerlo por lotes.

Limitaciones y notas
- Todo el trabajo se hace en el cliente (el navegador). No se sube nada a servidores externos.
- El rendimiento y el máximo tamaño de archivo dependen de la memoria y el navegador del usuario.
- No hay comprobaciones avanzadas de validez de PDFs: se asume que los archivos son PDFs válidos.

Contribuir
- Abre issues o pull requests con mejoras o correcciones.
- Para desarrollo, clona el repositorio, haz cambios y prueba abriendo `index.html` en un servidor local.

Licencia
- Añade un archivo `LICENSE` si quieres declarar una licencia. Por defecto, no hay licencia explícita en este repositorio.

Contacto
- Si necesitas ayuda o quieres sugerir una mejora, abre un issue en este repositorio.

--
Generado y documentado para facilitar el uso de la aplicación web de fusión de PDFs.
