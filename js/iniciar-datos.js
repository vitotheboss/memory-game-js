const MemoryPartidasDB = {
    dbName: "JuegoVTBMemoryDB",
    storeName: "partidas",
    dbVersion: 1,
    db: null,

    // 📌 1. Inicializar IndexedDB
    async iniciar() {
        try {
            let request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;

                if (this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.deleteObjectStore(this.storeName);
                }

                let store = this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });

                store.createIndex("nombre", "nombre", { unique: false });
                store.createIndex("fecha", "fecha", { unique: false });
                store.createIndex("pausada", "pausada", { unique: false });

                console.log("IndexedDB actualizada y lista.");
            };

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    console.log("IndexedDB lista para usar.");
                    resolve(this.db);
                };
                request.onerror = (event) => {
                    console.error("Error al abrir IndexedDB", event);
                    reject(event);
                };
            });
        } catch (error) {
            console.error("Error en la inicialización de IndexedDB", error);
        }
    },

    // 📌 2. Guardar una Nueva Partida
    async guardarPartida(nombre, nivelMax, puntuacion, pausada = false) {
        try {
            let transaccion = this.db.transaction(this.storeName, "readwrite");
            let store = transaccion.objectStore(this.storeName);
            let nuevaPartida = { nombre, nivelMax, puntuacion, pausada, fecha: new Date().toISOString() };

            let request = store.add(nuevaPartida);
            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    console.log("Partida guardada:", nuevaPartida);
                    resolve(nuevaPartida);
                };
                request.onerror = (event) => reject(event);
            });
        } catch (error) {
            console.error("Error al guardar la partida", error);
        }
    },

    // 📌 3. Obtener Todas las Partidas
    async obtenerPartidas() {
        try {
            let transaccion = this.db.transaction(this.storeName, "readonly");
            let store = transaccion.objectStore(this.storeName);
            let request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    //console.log("Partidas guardadas:", request.result);
                    resolve(request.result);
                };
                request.onerror = (event) => reject(event);
            });
        } catch (error) {
            console.error("Error al obtener partidas", error);
        }
    },

    // 📌 4. Buscar Partidas Pausadas por Usuario
    async obtenerPartidaPausada(nombre) {
        try {
            let transaccion = this.db.transaction(this.storeName, "readonly");
            let store = transaccion.objectStore(this.storeName);
            let index = store.index("nombre");
            let request = index.getAll(nombre);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    let partidas = request.result.filter(p => p.pausada);
                    resolve(partidas.length > 0 ? partidas[0] : null);
                    console.log("Partida Pausadas:", partidas);
                };
                request.onerror = (event) => reject(event);
            });
        } catch (error) {
            console.error("Error al obtener partida pausada", error);
        }
    },

    // 📌 5. Pausar una Partida (Solo puede haber una por usuario)
    async pausarPartida(id, nombre) {
        try {
            let partidaPausada = await this.obtenerPartidaPausada(nombre);
            if (partidaPausada) {
                await this.actualizarPartida(partidaPausada.id, partidaPausada.nivelMax, partidaPausada.puntuacion, false);
            }

            return await this.actualizarPartida(id, undefined, undefined, true);
        } catch (error) {
            console.error("Error al pausar la partida", error);
        }
    },

    // 📌 6. Reanudar una Partida (Despausarla)
    async reanudarPartida(id) {
        return await this.actualizarPartida(id, undefined, undefined, false);
    },

    // 📌 7. Actualizar una Partida
    async actualizarPartida(id, nuevoNivel, nuevaPuntuacion, pausada) {
        try {
            let transaccion = this.db.transaction(this.storeName, "readwrite");
            let store = transaccion.objectStore(this.storeName);
            let request = store.get(id);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    let partida = request.result;
                    if (!partida) {
                        reject("Partida no encontrada.");
                        return;
                    }

                    if (nuevoNivel !== undefined) partida.nivelMax = nuevoNivel;
                    if (nuevaPuntuacion !== undefined) partida.puntuacion = nuevaPuntuacion;
                    if (pausada !== undefined) partida.pausada = pausada;
                    partida.fecha = new Date().toISOString();

                    let updateRequest = store.put(partida);
                    updateRequest.onsuccess = () => {
                        console.log("Partida actualizada:", partida);
                        resolve(partida);
                    };
                };
                request.onerror = (event) => reject(event);
            });
        } catch (error) {
            console.error("Error al actualizar la partida", error);
        }
    },

    // 📌 8. Eliminar TODA la Base de Datos
    async eliminarBaseDeDatos() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.deleteDatabase(this.dbName);

            request.onsuccess = () => {
                console.log(`Base de datos ${this.dbName} eliminada correctamente.`);
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error al eliminar la base de datos", event);
                reject(event);
            };
        });
    }
};


function guardarPuntuacion() {
    let nombreJugador = document.querySelector('input#nombre').value
    MemoryPartidasDB.guardarPartida(nombreJugador,nivelActual,puntos.acumulado,false);
}