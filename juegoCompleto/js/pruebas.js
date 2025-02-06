const grupoCartas1 = ['🦄','🐝','🪲','🐙','🍑','🍆','🥟','🎂','🍓','🔮'];
const todasCartas = [...grupoCartas1, ...grupoCartas1];

function reparteCartas(cartas) {
    let cartasBarajadas = barajarCartas(cartas);
    let mesa = document.querySelector('#mesa');
    mesa.innerHTML = '';

    cartasBarajadas.forEach((paloFigura, numeroOrden) => {
        // ----
        console.log(paloFigura, numeroOrden);
        // ----
        let carta = document.createElement('div');
        carta.classList.add('tarjeta'); // Aseguramos que tenga la clase tarjeta
        carta.dataset.figura = paloFigura;
        carta.innerHTML = `
            <div class="tarjeta__contenido">${paloFigura}</div>
        `;
        mesa.appendChild(carta);
    });

    // Añadir eventos a las cartas
    document.querySelectorAll('.tarjeta').forEach((carta, numeroOrden) => {
        carta.addEventListener('click', () => voltearCarta(carta, numeroOrden));
    });
}

function barajarCartas(cartas) {
    return cartas.sort(() => 0.5 - Math.random());
}

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
// Inicializar el juego
reparteCartas(todasCartas);