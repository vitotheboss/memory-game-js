function voltearCarta(carta, orden) {
    let totalVolteadas = document.querySelectorAll('.descubierta:not(.acertada)'); // primera asignación de nodo. 

    if(totalVolteadas.length >= 2) return;            
    carta.classList.add('descubierta');
    totalVolteadas = document.querySelectorAll('.descubierta:not(.acertada)'); // segunda asignación de nodo con el valor actual.


    console.log(totalVolteadas, `Longitud de nodos:${totalVolteadas.length}`, `Orden de carta:${orden}`);
    

    compararCarta(totalVolteadas);
      
}

function compararCarta(cartas) {
    let carta = cartas;
    if(carta[1]) {
        if(carta[0].dataset.figura === carta[1].dataset.figura) {
            cartaCoincide(cartas);
            return;
        }
        if(carta[0].dataset.figura !== carta[1].dataset.figura) {
            cartaNoCoincide(cartas); 
            return;
        }
    }
}