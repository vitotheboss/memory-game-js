// - - - Inicios y Tipos de Juego - - - //

function iniciar() {
    estaJugando = true;
    movimientos = 0;
    document.querySelector('#mov-total').innerText = movimientoMax() < 10 ? `0${movimientoMax()}` : `${movimientoMax()}`;
    reparteCartas(todasCartas(nivelActual));
    document.querySelector('#mov').innerText = `0${movimientos}`;
    quitarClaseCss('#endGame','visible');
    quitarClaseCss('#gameOver','visible');
    quitarClaseCss('#quitGame','visible');
    quitarClaseCss('#subeNivel','visible');
    quitarClaseCss('#timeOver', 'visible');
    quitarClaseCss('#bienvenida', 'visible');
    quitarClaseCss('#finalScore', 'visible');
    puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
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
    paloRelax = grupoCartas.flat()[Math.floor(Math.random()*grupoCartas.length)];
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
    estaJugando = false;
    // console.log('Finalizar');
    cronometro.parar();

    if (nivelActual < grupoCartas.length - 1) {
        puntos.puntuar();
        agregarClaseCss('#subeNivel','visible');        
        puntos.escribe('#subeNivel .puntuacion',puntos.nivel);
        puntos.abrir();
        puntos.acumulaSuma();
        puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
        puntos.escribe('#quitGame .puntuacion',puntos.acumulado);
        puntos.escribe('#finalScore .puntuacion.final',puntos.acumulado);
        return;
    };

    if (nivelActual >= grupoCartas.length - 1) {
        puntos.puntuar();
        if (modoRelax) {
            agregarClaseCss('#subeNivel','visible');
            puntos.escribe('#subeNivel .puntuacion',puntos.nivel);
        } else {
            agregarClaseCss('#endGame','visible');
            puntos.escribe('#endGame .puntuacion.nivel',puntos.nivel);
        } 
        puntos.abrir();
        puntos.acumulaSuma();
        puntos.escribe('#menu-puntuacion .puntuacion',puntos.acumulado);
        puntos.escribe('#quitGame .puntuacion',puntos.acumulado);
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

function goSalir() {
    if (cronometro.iniciaCrono) {
        console.log('iniciaCrono',cronometro.iniciaCrono);
        cronometro.parar();
    }
    menuNivelOculto();
    if (modoRelax) {juegoSalir(); return;}
    if (nivelActual===0 && puntos.acumulado===0) {
        juegoSalir();
        return
    }
    if (estaJugando) {bajaNivel();}
    
    agregarClaseCss('#quitGame','visible');
}

async function juegoSalir() {
    await escribirRanking();
    
    setTimeout(() => {
        nivelActual = 0;
        refrescaNivel();
        agregarClaseCss('#bienvenida','visible');
        quitarClaseCss('#finalScore', 'visible');
        quitarClaseCss('#quitGame', 'visible');
        puntos.borrarnivel('#subeNivel .puntuacion');
        puntos.borrarnivel('#endGame .puntuacion');
        puntos.borraracumulado('#menu-puntuacion .puntuacion');
        // 
        document.querySelector('form#clasificacion').reset() 
    },600);
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