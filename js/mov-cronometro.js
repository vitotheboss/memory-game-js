const cronometro = {
    iniciaCrono: null,
    numSeg: 0,
    numMin: 0,
    // txtSeg: '00',
    // txtMin: '00',
    iniciarResta(minutos,segundos) {
        if (this.iniciaCrono) return;
        // 
        this.numSeg = segundos;
        this.numMin = minutos;
        // 
        // let txtSeg;
        // let txtMin;
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
            // txtSeg = this.numSeg < 10 ? `0${this.numSeg}` : `${this.numSeg}`;
            // txtMin = this.numMin < 10 ? `0${this.numMin}` : `${this.numMin}`;
            // console.log(`${txtMin}:${txtSeg}`);
            // document.querySelector('#minutos').innerText = txtMin;
            // document.querySelector('#segundos').innerText = txtSeg;
            this.escribe();
        }
        ,1000)
    },

    iniciarSuma(minutos,segundos,modoRelax) {
        if (this.iniciaCrono) return;
        this.numSeg = 0;
        this.numMin = 0;
        // 
        // let txtSeg;
        // let txtMin;
        // this.txtMin = '00';
        // this.txtSeg = '00';
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
            // txtSeg = this.numSeg < 10 ? `0${this.numSeg}` : `${this.numSeg}`;
            // txtMin = this.numMin < 10 ? `0${this.numMin}` : `${this.numMin}`;
            // console.log(`${txtMin}:${txtSeg}`);
            // document.querySelector('#minutos').innerText = txtMin;
            // document.querySelector('#segundos').innerText = txtSeg;
            this.escribe();
        }
        ,1000)

    },

    escribe() {
        // this.txtSeg = this.numSeg < 10 ? `0${this.numSeg}` : `${this.numSeg}`;
        // this.txtMin = this.numMin < 10 ? `0${this.numMin}` : `${this.numMin}`;
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