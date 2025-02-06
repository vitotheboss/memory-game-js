function voltearCarta(carta) {
    let totalVolteadas = document.querySelectorAll('.descubierta:not(.acertada)'); // primera asignación de nodo. 

    if(totalVolteadas.length >= 2) return;            
    carta.classList.add('descubierta');
    totalVolteadas = document.querySelectorAll('.descubierta:not(.acertada)'); // segunda asignación de nodo con el valor actual.

    sonido('#sonido-carta');

    // console.log(totalVolteadas, `Longitud de nodos:${totalVolteadas.length}`, `Orden de carta:${orden}`);
    
    if (totalVolteadas[1]) {
        compararCarta(totalVolteadas);
        movimiento(); // --> contador de movimientos
        

        cartasPendientes = document.querySelectorAll('.tarjeta:not(.acertada)');
        if (!modoRelax) {
            if (cartasPendientes.length === 0 && movimientos >= movimientoMax()) { 
                setTimeout(()=> finalizar(), 1000); return;  
            }
            if (cartasPendientes.length === 0)  {
                setTimeout(()=> finalizar(), 1000); return;            
            };
            if (movimientos >= movimientoMax()) { 
                setTimeout(() => gameOver(), 1000); return;
            }
            return;
        }
        if (modoRelax) {
            if (cartasPendientes.length === 0)  {
                setTimeout(()=> finalizar(), 1000); return;            
            };
        }    


    }    
}


