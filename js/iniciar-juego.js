// - - - Inicios y Tipos de Juego - - - //

function iniciar() {
    movimientos = 0;
    document.querySelector('#mov-total').innerText = movimientoMax() < 10 ? `0${movimientoMax()}` : `${movimientoMax()}`;
    reparteCartas(todasCartas(nivelActual));
    document.querySelector('#mov').innerText = `0${movimientos}`;
    quitarClaseCss('#endGame','visible');
    quitarClaseCss('#gameOver','visible');
    quitarClaseCss('#subeNivel','visible');
    quitarClaseCss('#timeOver', 'visible');
    quitarClaseCss('#bienvenida', 'visible');
    quitarClaseCss('#finalScore', 'visible');
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
    puntos.abrir();
    puntos.acumulaResta();
    puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
    refrescaNivel();
    iniciar();
}

function finalizar() {
    // console.log('Finalizar');
    cronometro.parar();

    if (nivelActual < grupoCartas.length - 1) {
        agregarClaseCss('#subeNivel','visible');
        puntos.puntuar();
        puntos.escribe('#subeNivel .puntuacion',puntos.nivel);
        puntos.abrir();
        puntos.acumulaSuma();
        puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
        return;
    };

    if (nivelActual >= grupoCartas.length - 1) {
        agregarClaseCss('#endGame','visible');
        puntos.puntuar();
        puntos.escribe('#endGame .puntuacion.nivel',puntos.nivel);
        puntos.abrir();
        puntos.acumulaSuma();
        puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
        puntos.escribe('#finalScore .puntuacion.final',puntos.acumulado);
        return;
    };
}

function gameOver() {
    // console.log('game over');
    agregarClaseCss('#gameOver','visible');
    cronometro.parar();
}

function timeOver() {
    // console.log('time Over');
    agregarClaseCss('#timeOver', 'visible');
    cronometro.parar();
}

function goPremio() {
    quitarClaseCss('#endGame','visible');
    agregarClaseCss('#finalScore','visible');
}

function juegoSalir() {
    cronometro.parar();
    menuNivelOculto();
    setTimeout(() => {
        agregarClaseCss('#bienvenida','visible');
        puntos.borrarnivel('#subeNivel .puntuacion');
        puntos.borrarnivel('#endGame .puntuacion');
        puntos.borraracumulado('#menu-puntuacion .puntuacion');
    },800);
}

// - - SONIDOS - - //

function sonidoInterruptor() {
    // console.log('interruptor cargado');
    document.querySelector('#sonido-interruptor').addEventListener('click',(e)=> {
        
        sonidoActivado = !sonidoActivado;
        e.target.innerHTML = sonidoActivado ? `Desactivar<span> 🔇</span>` : `Activar <span>🔊</span>`;
        // console.log('boton sonido', e.target, sonidoActivado);
    });
}

function sonidoPlay(tipoSonido) {
    // console.log('sonido: ',tipoSonido);
    if (!sonidoActivado) return;
    document.querySelector(tipoSonido).cloneNode().play();
}