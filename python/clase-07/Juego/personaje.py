import pygame
import sys
import os
import random

from constantes import ASSETS_PATH

class Personaje:
    def __init__(self, x, y):
        #constuye la ruta al personaje
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'personaje1.png'))
        self.image = pygame.transform.scale(self.image, (95,95))        
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100

    def mover(self, x, y):
        self.shape.x += x
        self.shape.y += y
    
    def lanzar_laser(self, x, y):
        laser = laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_danio(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia <= 0
            return False
        return True
    
    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()

    #Dibuja la barra de energia
    pygame.draw.rect(screen, (255,0 ,0), (10,10, 100 , 10))
    pygame.draw.rect(screen, (0,255 ,0), (10,10, self.energia , 10))


    class Enemigo:
        def __init__(self, x, y):
            self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'enemigo1.png'))
            self.image = pygame.transform.scale(self.image, (80,80))        
            self.image = self.image.get_rect(TopLeft=(x, y))

        def mover(self, x, y):
            screen.blit(self.image, self.shape.topleft)

    class Laser:
        def __init__(self, x, y):
            self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'laser.png'))       
            self.rect = self.image.get_rect(center=(x, y))

        def mover(self):
            self.rect.y -= 5

        def dibujar(self, screen):
            screen.blit(self.image, self.rect.topleft)

class Explosion:
    def __init__(self, x, y):
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'explosion{i}.png')) for i in range(1, 9)]
        self.index = 0 # Indice de la animacion
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 # contador de los frames de la animacion
        self.max_frames = 20 # cantidad de frames para cambiar la imagen


    def actualizar(self):
        
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.index += 1
            if self.index >= len(self.images):
                return False # La animacion termino
            self.image = self.images[self.index]
            return True

    def dibujar(self, screen): #Dibuja la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)