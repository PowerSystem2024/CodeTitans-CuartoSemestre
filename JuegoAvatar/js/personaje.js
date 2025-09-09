export class Personaje {
    constructor(nombre, imagen, vidas = 3, ataques = []) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
        this.ataques = ataques;
    }

    perderVida() {
        if (this.vidas > 0) {
            this.vidas--;
        }
    }

}

