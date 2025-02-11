// - - - Configuracion Juego - - - //
let grupoCartas = [];
let nivel = [];
const puntoNormal = 25;
const puntoBonus = 50;


const todasCartas = (i)=>{return[...nivel[i].cartas, ...nivel[i].cartas]};
const movimientoMax = ()=> {return nivel[nivelActual].maxmovimientos};

// - -  - Estado Juego - - - //
let nivelActual = 0;
let puntuacion = 0;
let puntuacionAlmacena = false;
let modoRelax = false;
let sonidoActivado = false;
let movimientos = 0;