// - - - Carga Juego - - - //

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
        // document.querySelector('#goPremio').addEventListener('click',goPremio);
        document.querySelectorAll('.goPremio').forEach(
            (e)=> e.addEventListener('click',()=> goPremio())
        );
        // document.querySelector('#salir-juego').addEventListener('click',juegoSalir);
        document.querySelectorAll('.salir-juego').forEach(
            (e)=> e.addEventListener('click',()=> goSalir())
        );
        document.querySelector('.quit').addEventListener('click',()=>{juegoSalir();});
        document.querySelector('#sonido-interruptor').innerHTML = sonidoActivado ? `Desactivar<span> 🔇</span>` : `Activar <span>🔊</span>`;
        document.querySelector('#guardarPartida').addEventListener('click',()=>{guardarPuntuacion(); juegoSalir();});
        sonidoInterruptor();
        grupoCartas = datoCartas.cartas;
        await MemoryPartidasDB.iniciar();
        cargaNivel();
        await escribirRanking();
    }
}

async function leerJson(url) {
    try {
        const respuesta = await fetch(url);
        // error --> hacer;
        return await respuesta.json();
    }
    catch (err){
        console.error(`error de carga ${url}: `, err);
        return null;
    }
}

// - - CSS CLASS - - //

function agregarClaseCss(selector,clase){
    document.querySelector(selector).classList.add(clase);

}

function quitarClaseCss(selector,clase){
    document.querySelector(selector).classList.remove(clase);
}

function intercambiaClaseCss(selector,clase){
    document.querySelector(selector).classList.toggle(clase);
}