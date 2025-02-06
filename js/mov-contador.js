function movimiento() {
    movimientos++;
    document.querySelector('#mov').innerText = movimientos < 10 ? `0${movimientos}` : `${movimientos}`;   
};



