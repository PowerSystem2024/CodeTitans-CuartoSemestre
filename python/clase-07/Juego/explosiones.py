import os
import pygame

from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y):
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'explosion{i}.png')) for i in range(1, 9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 # contador de los frames de la animacion
        self.frames = 20 # cantidad de frames para cambiar la imagen

    def actualizar(self):
        
        self.frame_rate += 1
        if self.frame_rate >= self.frames:
            self.index += 1
            if self.index >= len(self.images):
                return False # La animacion termino
            self.image = self.images[self.index]
            return True
            

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)