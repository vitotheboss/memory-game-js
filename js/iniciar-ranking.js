const ranking = {
    partidas: [],

    async obtener() {
        this.partidas = await MemoryPartidasDB.obtenerPartidas();
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
    let gridRanking = document.querySelector('#ranking .table > .tbody');
    gridRanking.innerHTML = '';
    let top5 = ranking.partidas.slice(0,5);
    top5.forEach((n,i)=> {
        let lineaRanking = document.createElement('div');
        lineaRanking.innerHTML = `<div class="col posicion"><span>#</span>${i+1}</div><div class="col nombre">${n.nombre}</div><div class="col nivel">${n.nivelMax}</div><div class="col puntos">${n.puntuacion}</div>`;
        gridRanking.appendChild(lineaRanking);
    } )
}