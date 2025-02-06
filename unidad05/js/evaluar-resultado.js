function cartaCoincide(cartas) {
    console.log('Coinciden');
    cartas.forEach((elemento) => elemento.classList.add('acertada'));
}

function cartaNoCoincide(cartas) {
    console.log('NO Coinciden');
    cartas.forEach((elemento) => elemento.classList.add('error'));

    setTimeout(()=>{
        cartas.forEach((elemento) => {
            elemento.classList.remove('descubierta');
            elemento.classList.remove('error');
        });
    }, 1000);
    // 
}