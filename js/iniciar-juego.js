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
        document.querySelector('body').addEventListener('click',menuNivelFueraClick);
        document.addEventListener('keydown',menuNivelEscape);
        agregarClaseCss('#bienvenida','visible');
        document.querySelector('#salir-juego').addEventListener('click',juegoSalir);
        document.querySelector('#sonido-interruptor').innerHTML = sonidoActivado ? `Desactivar<span> 🔇</span>` : `Activar <span>🔊</span>`;
        sonidoInterruptor();
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
    if (!modoRelax) {
        agregarClaseCss('#menu-niveles', 'oculto');
        let minutos = Math.floor(nivel[nivelActual].tiempo / 60);
        let segundos =  nivel[nivelActual].tiempo % 60;
        cronometro.iniciarResta(minutos, segundos);
        return;
    }
    if (modoRelax) {
        quitarClaseCss('#menu-niveles', 'oculto');
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

function juegoSalir() {
    cronometro.parar();
    menuNivelOculto();
    setTimeout(()=>{agregarClaseCss('#bienvenida','visible')},800);
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

function sonidoInterruptor() {
    console.log('interruptor cargado');
    document.querySelector('#sonido-interruptor').addEventListener('click',(e)=> {
        
        sonidoActivado = !sonidoActivado;
        e.target.innerHTML = sonidoActivado ? `Desactivar<span> 🔇</span>` : `Activar <span>🔊</span>`;
        console.log('boton sonido', e.target, sonidoActivado);
    });
}

function sonidoPlay(tipoSonido) {
    // console.log('sonido: ',tipoSonido);
    if (!sonidoActivado) return;
    document.querySelector(tipoSonido).cloneNode().play();
}