const grupoCartas1 = ['🦄','🐝','🪲','🐙','🍑','🍆','🥟','🎂','🍓','🔮'];
const grupoCartas2 = ['🦄','🐝','🪲','🐙','🍄‍🟫','🍆','🥟','🎂','🍓','🔮'];
const todasCartas = [...grupoCartas1,...grupoCartas1];
// const todasCartas = [];
// todasCartas.push(grupoCartas1);
// todasCartas.push(grupoCartas2);
//console.log(todasCartas[1].length);


function reparteCartas(cartas) {
    let cartasBarajadas = barajarCartas(cartas);
    let mesa = document.querySelector('#mesa');
    mesa.innerHTML = '';

    cartasBarajadas.forEach((paloFigura, numeroOrden) => {
        // ----
        console.log(paloFigura, numeroOrden);
        // ----
        let carta = document.createElement('div');
        carta.innerHTML = `<div class="tarjeta">
        <div class="tarjeta__contenido">${paloFigura}</div>
      </div>`;
        mesa.appendChild(carta);

    });

    // ----
    document.querySelectorAll('.tarjeta').forEach((carta, numeroOrden) => {
        carta.addEventListener('click', (evento) => voltearCarta(carta, numeroOrden))
    })
    // ----
}

function barajarCartas(cartas) {
    let barajar = cartas.sort(() => {return 0.5 - Math.random()} );
    return barajar;
}

function voltearCarta (carta, orden) {
    carta.classList.add('descubierta');
    console.log(orden);
}



reparteCartas(todasCartas);

