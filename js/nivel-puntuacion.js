const puntos = {
    nivel: 0,
    acumulado: 0,
    almacena: false,

    puntuar() {
        const tiempoTotal = nivel[nivelActual].tiempo;
        const tiempoResto = cronometro.numSeg + (cronometro.numMin * 60);
        const totalCartas = nivel[nivelActual].cartas.length;
        const puntoMov = tiempoResto >= tiempoTotal/2 ? puntoBonus : puntoNormal;
        const puntosMax = totalCartas * puntoMov;
        // console.log('Tiempo Total:' ,tiempoTotal, 'Resto de Tiempo:' ,tiempoResto, ' punto:', puntoMov, 'Resto de Movimientos:' , );
        // return Math.round((((movimientoMax()-movimientos)/movimientoMax())*puntosMax) + ((tiempoResto/tiempoTotal)*puntosMax));
        this.nivel = Math.round((((movimientoMax()-movimientos)/movimientoMax())*puntosMax) + ((tiempoResto/tiempoTotal)*puntosMax));
        console.log(this.nivel);
    },

    escribe(nodo,puntos) {
        document.querySelector(nodo).innerHTML = `<span>${puntos}</span><i>puntos</i>`;
        console.log(nodo,puntos);
    },

    acumulaSuma() {
        if (!this.almacena) return;
        this.acumulado += this.nivel;
        this.cerrar();
        console.log(this.acumulado);
    },

    acumulaResta() {
        if (!this.almacena) return;
        this.acumulado -= this.nivel;
        this.cerrar();
        console.log(this.acumulado);
    },
    
    cerrar() {
        this.almacena = false;
    },

    abrir() {
        this.almacena = true;
    },

    borrarnivel(nodo) {
        this.nivel = 0;
        this.escribe(nodo,this.nivel);
    },

    borraracumulado(nodo) {
        this.acumulado = 0;
        this.escribe(nodo,this.acumulado);
    }
}