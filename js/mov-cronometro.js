const cronometro = {
    iniciaCrono: null,
    numSeg: 0,
    numMin: 0,
    iniciarResta(minutos,segundos) {
        if (this.iniciaCrono) return;

        this.numSeg = segundos;
        this.numMin = minutos;

        this.escribe();
        this.iniciaCrono = setInterval(() => {
            this.numSeg--;
            if (this.numSeg < 0) {
                this.numMin--;
                this.numSeg = 59;
            };
            if (this.numMin <= 0 && this.numSeg <= 0) {            
                // this.parar();
                timeOver();
            };
 
            this.escribe();
        }
        ,1000)
    },

    iniciarSuma(minutos,segundos,modoRelax) {
        if (this.iniciaCrono) return;
        this.numSeg = 0;
        this.numMin = 0;

        this.escribe();

        this.iniciaCrono = setInterval(() => {
            this.numSeg++;
            if (this.numSeg === 60) {
                this.numMin++;
                this.numSeg = 0;
            };
            if (this.numMin >= minutos && this.numSeg >= segundos && !modoRelax) {            
                // this.parar();
                timeOver();
            };

            this.escribe();
        }
        ,1000)

    },

    escribe() {

        const txtSeg = this.numSeg < 10 ? `0${this.numSeg}` : `${this.numSeg}`;
        const txtMin = this.numMin < 10 ? `0${this.numMin}` : `${this.numMin}`;
        document.querySelector('#minutos').innerText = txtMin;
        document.querySelector('#segundos').innerText = txtSeg;
    },

    parar() {
        clearInterval(this.iniciaCrono);
        this.iniciaCrono = null;
    }

};