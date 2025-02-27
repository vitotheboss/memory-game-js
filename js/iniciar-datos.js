const PartidasDB = {
    dbName: 'JuegoVTBMemoryDB',
    storeName: 'partidas',
    dbVersion: 1,
    db: null,

    // - - Iniciar IndexedDB - - //
    async iniciar() {
        try {
            let peticion = indexedDB.open(this.dbName, this.dbVersion);

            peticion.onupgradeneeded = (e) => {
                this.db = e.target.result;

                if (this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.deleteObjectStore(this.storeName);
                }

                let store = this.db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });

                store.createIndex('nombre', 'nombre', { unique: false });
                store.createIndex('fecha', 'fecha', { unique: false });
                store.createIndex('pausada', 'pausada', { unique: false });

                console.log('✅ IndexedDB actualizada y lista.');
            };

            return new Promise((resolve, reject) => {
                peticion.onsuccess = (e) => {
                    this.db = e.target.result;
                    console.log('✅ IndexedDB lista para usar.');
                    resolve(this.db);
                };
                peticion.onerror = (e) => {
                    console.error('❌ Error al abrir IndexedDB', e);
                    reject(e);
                };
            });
        } catch (error) {
            console.error('❌ Error en la inicialización de IndexedDB', error);
        }
    },

    // - - Guardar una Nueva Partida - - //
    async guardarPartida(nombre, nivelMax, puntuacion, pausada = false) {
        try {
            let transaccion = this.db.transaction(this.storeName, 'readwrite');
            let store = transaccion.objectStore(this.storeName);
            let nuevaPartida = { nombre, nivelMax, puntuacion, pausada, fecha: new Date().toISOString() };

            let peticion = store.add(nuevaPartida);
            return new Promise((resolve, reject) => {
                peticion.onsuccess = () => {
                    console.log('Partida guardada:', nuevaPartida);
                    resolve(nuevaPartida);
                };
                peticion.onerror = (e) => reject(e);
            });
        } catch (error) {
            console.error('❌ Error al guardar la partida', error);
        }
    },

    // - - Obtener Todas las Partidas - - //
    async obtenerPartidas() {
        try {
            let transaccion = this.db.transaction(this.storeName, 'readonly');
            let store = transaccion.objectStore(this.storeName);
            let peticion = store.getAll();

            return new Promise((resolve, reject) => {
                peticion.onsuccess = () => {
                    //console.log('Partidas guardadas:', peticion.result);
                    resolve(peticion.result);
                };
                peticion.onerror = (e) => reject(e);
            });
        } catch (error) {
            console.error('❌ Error al obtener partidas', error);
        }
    },

    // - - Obtener Última Partida - - //
    async obtenerUltimaPartida() {
        try {
            let transaccion = this.db.transaction(this.storeName, 'readonly');
            let store = transaccion.objectStore(this.storeName);
            let peticion = store.openCursor(null, "prev");

            return new Promise((resolve, reject) => {
                peticion.onsuccess = (e) => {
                    let cursor = e.target.result;
                    if (cursor) {
                        resolve(cursor.value);
                    } else {
                        resolve (null);
                    }
                };
                peticion.onerror = (e) => reject(e);
            });

        } catch (error) {
            console.error('❌ Error al obtener partidas', error);
        }
    },

    // Buscar Partidas Pausadas por Usuario
    /*
    async obtenerPartidaPausada(nombre) {
        try {
            let transaccion = this.db.transaction(this.storeName, 'readonly');
            let store = transaccion.objectStore(this.storeName);
            let index = store.index('nombre');
            let peticion = index.getAll(nombre);

            return new Promise((resolve, reject) => {
                peticion.onsuccess = () => {
                    let partidas = peticion.result.filter(p => p.pausada);
                    resolve(partidas.length > 0 ? partidas[0] : null);
                    console.log('Partida Pausadas:', partidas);
                };
                peticion.onerror = (e) => reject(e);
            });
        } catch (error) {
            console.error('❌ Error al obtener partida pausada', error);
        }
    },
    */
    // - - Pausar una Partida (Solo puede haber una por usuario) - - //
    /*
    async pausarPartida(id, nombre) {
        try {
            let partidaPausada = await this.obtenerPartidaPausada(nombre);
            if (partidaPausada) {
                await this.actualizarPartida(partidaPausada.id, partidaPausada.nivelMax, partidaPausada.puntuacion, false);
            }

            return await this.actualizarPartida(id, undefined, undefined, true);
        } catch (error) {
            console.error('❌ Error al pausar la partida', error);
        }
    },
    */
    // - - Reanudar una Partida (Despausarla) - - //
    /*
    async reanudarPartida(id) {
        return await this.actualizarPartida(id, undefined, undefined, false);
    },
    */

    // Actualizar una Partida
    /*
    async actualizarPartida(id, nuevoNivel, nuevaPuntuacion, pausada) {
        try {
            let transaccion = this.db.transaction(this.storeName, 'readwrite');
            let store = transaccion.objectStore(this.storeName);
            let peticion = store.get(id);

            return new Promise((resolve, reject) => {
                peticion.onsuccess = () => {
                    let partida = peticion.result;
                    if (!partida) {
                        reject('Partida no encontrada.');
                        return;
                    }

                    if (nuevoNivel !== undefined) partida.nivelMax = nuevoNivel;
                    if (nuevaPuntuacion !== undefined) partida.puntuacion = nuevaPuntuacion;
                    if (pausada !== undefined) partida.pausada = pausada;
                    partida.fecha = new Date().toISOString();

                    let updateRequest = store.put(partida);
                    updateRequest.onsuccess = () => {
                        console.log('Partida actualizada:', partida);
                        resolve(partida);
                    };
                };
                peticion.onerror = (e) => reject(e);
            });
        } catch (error) {
            console.error('Error al actualizar la partida', error);
        }
    },
    */

    // - -  Eliminar TODA la Base de Datos - - //
    async eliminarBaseDeDatos() {
        return new Promise((resolve, reject) => {
            let peticion = indexedDB.deleteDatabase(this.dbName);

            peticion.onsuccess = () => {
                console.log(`Base de datos ${this.dbName} eliminada correctamente.`);
                resolve();
            };

            peticion.onerror = (e) => {
                console.error('❌ Error al eliminar la base de datos', e);
                reject(e);
            };
        });
    }
};
