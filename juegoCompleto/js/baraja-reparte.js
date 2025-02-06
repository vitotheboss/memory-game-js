function reparteCartas(cartas) {
    let cartasBarajadas = barajarCartas(cartas);
    let mesa = document.querySelector('#mesa');
    mesa.innerHTML = '';

    cartasBarajadas.forEach((paloFigura) => {
        // ----
        // console.log(paloFigura, numeroOrden);
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
    document.querySelectorAll('.tarjeta').forEach((carta) => {
        carta.addEventListener('click', () => voltearCarta(carta));
        // console.log('cartas activadas', numeroOrden)
    });
}

function barajarCartas(cartas) {
    return cartas.sort(() => 0.5 - Math.random());
}