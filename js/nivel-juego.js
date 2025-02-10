// - - - Carga Niveles Juego - - - //
function cargaNivel() {
    if (grupoCartas.length === 0) {
        console.warn('⚠️ No se han cargado las cartas, no se generaron los niveles: ', nivel)
    }
    nivel = grupoCartas.map((_, i) => ({
        nivel: i+1,
        cartas: grupoCartas.slice(0, i + 1).flat(),
        get maxmovimientos(){ return Math.floor(this.cartas.length * 2.5 * (this.nivel-0.2)) },
        // tiempo: (i+1)*30
        get tiempo() { return Math.floor((this.nivel * 1.5) * 30)}
    }));

    console.log('✅ Niveles generados:', nivel);
}

// - - - Menu Niveles - - - //

function menuNivel() {
    const rootMenu = document.querySelector('.menu-general ul.menu-niveles');
    rootMenu.innerHTML = '';
    nivel.forEach((_,i)=> {
        let nivel = document.createElement('li');
        nivel.innerHTML = `<button class="nivel" data-nivel="${i}">Nivel ${i + 1}</button>`;
        rootMenu.appendChild(nivel);
    });

    document.querySelectorAll('button.nivel').forEach((e)=>{
        e.addEventListener('click', cambiaNivel)
    });
}

function cambiaNivel() {
    console.log('cambia-nivel', this);
    let nivel = parseInt(this.dataset.nivel);
    nivelActual = nivel;
    refrescaNivel();
    iniciar();
    setTimeout(()=>menuNivelOculto(),500);
}

function menuNivelVisible(e) {
    e.stopPropagation();
    intercambiaClaseCss('.menu-general','visible');
}

function menuNivelOculto() {
    quitarClaseCss('.menu-general','visible');
}

function menuNivelFueraClick(e) {
    if (e.target.closest('.menu-general')) {
        return;
    }
    quitarClaseCss('.menu-general','visible');
}

function menuNivelEscape(e) {
    // console.log(e.key);
    if (e.key === 'Escape') menuNivelOculto();
}

// - - - Ejecuta Nivel - - - //

function subeNivel() {
    nivelActual++;
}

function refrescaNivel() {
 let txtNivel = nivelActual < 10 ? `0${nivelActual + 1}` : `${nivelActual + 1}`;
 document.querySelector('#nivel').innerText = txtNivel;
}

function nuevoNivel() {
    subeNivel();
    refrescaNivel();
    iniciar();
}