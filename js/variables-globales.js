// const grupoCartas = [['🦄','🐝'],['🐙','🍑','🍆','🪲'],['🥟','🎂','🍓','💣','🦠','🍒'],['🌶️','🍎','🍏']];
// const grupoCartas = [['🦄'],['🐙'],['🥟']];
let grupoCartas = [];
let nivel = [];
let nivelActual = 0;
let modoRelax = false;
let sonidoActivado = false;

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

// Construcción dinámica de los niveles


const todasCartas = (i)=>{return[...nivel[i].cartas, ...nivel[i].cartas]};
const movimientoMax = ()=> {return nivel[nivelActual].maxmovimientos};
let movimientos = 0;