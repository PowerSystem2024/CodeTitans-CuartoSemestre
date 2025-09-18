export class Personaje {
    constructor(nombre, imagen, vidas) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
    }

    perderVida() {
        if (this.vidas > 0) {
            this.vidas--;
        }
    }

}

