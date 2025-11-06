import pygame
import os  # proporciona funcionalidades para interactuar con el sistema
import random
from constantes import ASSETS_PATH

class Personaje:
    def __init__(self, x, y):
        # Construye la ruta al personaje
        self.images = [
            pygame.transform.scale(pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'personaje1.png')), (95, 95)),
            pygame.transform.scale(pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'personaje2.png')), (95, 95))
        ]
        self.image_index = 0
        self.image = self.images[self.image_index]
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100

    def cambiar_personaje(self, nivel):
        if (nivel - 1) // 3 % 2 == 1:
            self.image_index = 1
        else:
            self.image_index = 0
        self.image = self.images[self.image_index]

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()

        # Dibujar la barra de energía
        pygame.draw.rect(screen, (255, 0, 0), (10, 10, 100, 10))  # Barra de fondo
        pygame.draw.rect(screen, (0, 255, 0), (10, 10, self.energia, 10))  # Barra de energía

class Enemigo:
    def __init__(self, x, y, velocidad=5):
        # Construye la ruta completa a la imagen del enemigo
        enemy_images = ['enemigo1.png', 'enemigo2.png', 'enemigo3.png', 'enemigo4.png', 'enemigo5.png', 'enemigo6.png']
        chosen_image = random.choice(enemy_images)
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', chosen_image))
        self.image = pygame.transform.scale(self.image, (80, 80))
        self.rect = self.image.get_rect(topleft=(x, y))
        self.velocidad = velocidad

    def mover(self):
        self.rect.y += self.velocidad  # Velocidad de movimiento del enemigo

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Laser:
    def __init__(self, x, y):
        # Construye la ruta completa a la imagen del láser
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'laser.png'))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y -= 10  # Velocidad del láser

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Explosion:
    def __init__(self, x, y):
        # Construye la ruta completa a las imágenes de la explosión
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion0{i:02d}.png')) for i in range(9)]
        self.index = 0  # Índice para la animación
        self.image = self.images[self.index]  # Imagen actual
        self.rect = self.image.get_rect(center=(x, y))  # Rectángulo de la imagen
        self.frame_rate = 0  # Contador de frames para la animación
        self.max_frames = 20  # Frames por imagen

    def actualizar(self):
        # Actualiza la animación
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False  # Termina la animación si se han mostrado todas las imágenes
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen):
        # Dibuja la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)