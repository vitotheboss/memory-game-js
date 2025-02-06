function recogerDatos() {
    let nombre = document.querySelector('input#nombre').value;
    let fechayear = document.querySelector('input#fecha').value;
    let actualyear = new Date();
    let edad = actualyear.getFullYear() - fechayear;
    if (!fechayear.trim() || !nombre.trim()) {
        mensaje('#bienvenida', `Rellena todos los campos de formulario. 😇`);
        return;
    }
    if (isNaN(fechayear)) {
        mensaje('#bienvenida', `Tienes que introducir un número en el campo de "año en el que naciste" `);
        return;
    }
    if (edad < 30) {
        mensaje('#bienvenida',`<strong>Hola</strong> ${nombre} 😀, tienes <span>${edad}</span> años. Eres un chiquilin!!!`);
        return;
    }
    mensaje('#bienvenida',`<strong>Hola</strong> ${nombre} 😀, tienes <span>${edad}</span> años. Eres un abueloooo.`)
}

function mensaje(contenedor, texto) {
    let mensaje = document.querySelector(contenedor);
    mensaje.innerHTML = texto; 
    console.log(texto);
}

let miFormulario = document.querySelector('form#formulario');

miFormulario.addEventListener('submit', (evento) => {evento.preventDefault(); recogerDatos();});