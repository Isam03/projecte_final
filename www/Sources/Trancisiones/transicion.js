document.addEventListener('DOMContentLoaded', function () {
    // Añadir evento click al enlace de Página 2
    document.getElementById('linkPagina2').addEventListener('click', function (e) {
        e.preventDefault();
        // Añadir clase 'fade-out' al body para iniciar la transición
        document.body.classList.add('fade-out');
        // Esperar 500ms (0.5 segundos) para permitir que la transición se complete
        setTimeout(function () {
            // Redireccionar a Página 2
            window.location.href = 'Prueba2.html';
        }, 500);
    });
});

