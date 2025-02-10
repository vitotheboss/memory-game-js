function compararCarta(cartas) {
    let carta = cartas;
    if (carta[0].dataset.figura === carta[1].dataset.figura) {
        cartaCoincide(cartas);
        return;
    }
    if (carta[0].dataset.figura !== carta[1].dataset.figura) {
        cartaNoCoincide(cartas);
        return;
    }
}



function cartaCoincide(cartas) {
    // console.log('Coinciden');
    cartas.forEach((elemento) => elemento.classList.add('acertada'));
    sonidoPlay('#sonido-acierto');
}

function cartaNoCoincide(cartas) {
    // console.log('NO Coinciden');
    cartas.forEach((elemento) => elemento.classList.add('error'));
    sonidoPlay('#sonido-error');

    setTimeout(()=>{
        cartas.forEach((elemento) => {
            elemento.classList.remove('descubierta');
            elemento.classList.remove('error');
        });
    }, 1000);
    // 
}