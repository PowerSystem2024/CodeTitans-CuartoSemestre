import pygame
import sys
import os
import random

from personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, SCREEN_HEIGHT, COLOR_LASER

#Inicializar el juego

def mostrar_imagen_inicial(screen, imagen_path, duracion):
    imagen = pygame.image.load(imagen_path).bonvvert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    #Loop para mostrar la imagen con opacidad
    alpha = 255
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion

while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

