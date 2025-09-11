export class Personaje {
    constructor(nombre, imagen, vidas = 3) {
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

