cargarJuego();


async function cargarJuego() {
    const datoCartas = await leerJson('dato/cartas.json');

    if (datoCartas) {
        document.querySelector('#subir').addEventListener('click',()=> nuevoNivel());
        document.querySelectorAll('.reiniciar').forEach(
            (e)=> e.addEventListener('click',()=> reiniciar())
        );
        document.querySelector('button#juego-normal').addEventListener('click',()=> iniciarNormal());
        document.querySelector('button#juego-relax').addEventListener('click',()=> iniciarRelax());
        document.querySelector('#control-nivel').addEventListener('click',menuNivelVisible);
        document.querySelector('#cierra-niveles').addEventListener('click',menuNivelOculto);
        agregarClaseCss('#bienvenida','visible');

        grupoCartas = datoCartas.cartas;
        cargaNivel();

    }
    

    // Inicializar el juego
    // iniciar();
    //
}

function iniciar() {
    movimientos=0;
    document.querySelector('#mov-total').innerText = movimientoMax() < 10 ? `0${movimientoMax()}` : `${movimientoMax()}`;
    reparteCartas(todasCartas(nivelActual));
    document.querySelector('#mov').innerText = `0${movimientos}`;
    quitarClaseCss('#endGame','visible');
    quitarClaseCss('#gameOver','visible');
    quitarClaseCss('#subeNivel','visible');
    quitarClaseCss('#timeOver', 'visible');
    quitarClaseCss('#bienvenida', 'visible');
    quitarClaseCss('#control-nivel', 'visible');
    if (!modoRelax) {
    let minutos = Math.floor(nivel[nivelActual].tiempo / 60);
    let segundos =  nivel[nivelActual].tiempo % 60;
    cronometro.iniciarResta(minutos, segundos);
    return;
    }
    if (modoRelax) {
        agregarClaseCss('#control-nivel','visible');
        menuNivel();
        cronometro.parar();
        cronometro.iniciarSuma(minutos,segundos,modoRelax);
    }
}

function iniciarRelax() {
    modoRelax = true;
    agregarClaseCss('#mov-separa','oculto');
    agregarClaseCss('#mov-total','oculto');
    iniciar();
}

function iniciarNormal() {
    modoRelax = false;
    quitarClaseCss('#mov-separa','oculto');
    quitarClaseCss('#mov-total','oculto');
    iniciar();
}

function reiniciar() {
    // nivelActual = 0;
    refrescaNivel();
    iniciar();
}

function finalizar() {
    // 
    console.log('Finalizar');
    //
    cronometro.parar();
    if (nivelActual < grupoCartas.length - 1) { agregarClaseCss('#subeNivel','visible'); return;};
    if (nivelActual >= grupoCartas.length - 1) { agregarClaseCss('#endGame','visible'); return;};

    //
}

function gameOver() {
    console.log('game over');
    agregarClaseCss('#gameOver','visible');
    cronometro.parar();
}


function timeOver() {
    console.log('time Over');
    agregarClaseCss('#timeOver', 'visible');
    cronometro.parar();
}




function agregarClaseCss(selector,clase){
    document.querySelector(selector).classList.add(clase);

}

function quitarClaseCss(selector,clase){
    document.querySelector(selector).classList.remove(clase);
}

function intercambiaClaseCss(selector,clase){
    document.querySelector(selector).classList.toggle(clase);
}

function sonido(tipoSonido) {
    // console.log('sonido: ',tipoSonido);
    document.querySelector(tipoSonido).cloneNode().play();
}