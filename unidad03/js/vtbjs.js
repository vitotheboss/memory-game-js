function recogerDatos() {
    let nombre = document.querySelector('#nombre').value;
    let fechayear = document.querySelector('#fecha').value;
    let actualyear = new Date();
    let edad = actualyear.getFullYear() - fechayear;
    let bienvenida = document.querySelector('#bienvenida.mensaje');


    
}

let miForm = document.querySelector('#formulario');

miForm.addEventListener('submit', recogerDatos);