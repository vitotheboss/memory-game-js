const ranking = {
    partidas: [],
    ultimapartida: {},

    async obtener() {
        this.partidas = await PartidasDB.obtenerPartidas();
        this.ultimapartida = await PartidasDB.obtenerUltimaPartida();
    },

    async ordenar(campo01,campo02,desc) {
        this.partidas.sort(
            (a,b) => {
                if (a[campo01] !== b[campo02]) {
                    return desc ? b[campo01] - a[campo01] : a[campo01] - b[campo01];
                }
                return desc ? b[campo02] - a[campo02] : a[campo02] - b[campo02];
            }
        )
    }
}

async function escribirRanking() {
    await ranking.obtener();
    await ranking.ordenar('puntuacion','nivelMax',true);
    //console.log("Ranking ordenado:", ranking.partidas);
    if (ranking.partidas.length <= 0 ) {
        agregarClaseCss ('#ranking','oculto');
        return;
    }
    let gridRanking = document.querySelector('#ranking .table > .tbody');
    let gridUltimo = document.querySelector('#ultimojuego .table > .tbody');
    let ultimoenRanking = false;
    gridRanking.innerHTML = '';
    gridUltimo.innerHTML = '';
    let top5 = ranking.partidas.slice(0,5);
    top5.forEach((n,i)=> {
        let lineaRanking = document.createElement('div');
        lineaRanking.innerHTML = `<div class="col posicion"><span>#</span>${i+1}</div><div class="col nombre">${n.nombre}</div><div class="col nivel">${n.nivelMax}</div><div class="col puntos">${n.puntuacion}</div>`;
        if (n.id === ranking.ultimapartida.id) { lineaRanking.classList.add('ultimo'); ultimoenRanking=true;};
        gridRanking.appendChild(lineaRanking);        
    } );
    if (!ultimoenRanking) { 
        console.log('ultimo en ranking:',ultimoenRanking);
        let posicionUltimoenRanking = ranking.partidas.findIndex(pos => pos.id === ranking.ultimapartida.id)
        gridUltimo.innerHTML = `<div><div class="col posicion"><span>#</span>${posicionUltimoenRanking+1}</div><div class="col nombre">${ranking.ultimapartida.nombre}</div><div class="col nivel">${ranking.ultimapartida.nivelMax}</div><div class="col puntos">${ranking.ultimapartida.puntuacion}</div></div>`;
    }
}