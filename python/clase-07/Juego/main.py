import pygame
import sys
import random
import os
from personaje import Personaje , Enemigo , Explosion
from constantes import SCREEN_WIDTH , SCREEN_HEIGHT , ASSETS_PATH


def mostrar_imagen_inicial(screen, imagen_path, duracion):
    imagen = pygame.image.load(imagen_path).convert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    # Bucle para mostrar la imagen inicial con desvanecimiento
    alpha = 255  # Transparencia inicial completa
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion  # Duración en milisegundos (8000 ms para 8 segundos)
    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        # Calcular el tiempo transcurrido
        tiempo_transcurrido = pygame.time.get_ticks() - tiempo_inicial

        # Calcular nuevo valor de alpha basado en el tiempo transcurrido
        alpha = 255 - (255 * (tiempo_transcurrido / tiempo_total))
        if alpha < 0:
            alpha = 0

        # Establecer transparencia y dibujar la imagen
        imagen.set_alpha(int(alpha))
        screen.fill((0, 0, 0))  # Llenar pantalla con negro antes de dibujar la imagen
        screen.blit(imagen, (0, 0))
        pygame.display.flip()

        clock.tick(60)  # Mantener 60 FPS


def main() :
    pygame.init ( )
    screen = pygame.display.set_mode ( (SCREEN_WIDTH , SCREEN_HEIGHT) )
    pygame.display.set_caption ( 'RedCielo: Juicio Argento' )

    # Mostrar una secuencia de imágenes de inicio
    imagenes_inicio = ['Inicio1.png', 'Inicio2.png', 'Inicio3.png', 'Inicio4.png']
    for imagen_nombre in imagenes_inicio:
        imagen_path = os.path.join(ASSETS_PATH, 'images', 'inicio', imagen_nombre)
        mostrar_imagen_inicial(screen, imagen_path, 7000)

    # Usa os.path.join para construir la ruta del icono
    icon = pygame.image.load ( os.path.join ( ASSETS_PATH , 'images' , 'icon.png' ) )
    pygame.display.set_icon ( icon )

    # Cargar fondos
    fondos = [
        pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'postApocCity1.png')),
        pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'postApocCity2.png')),
        pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'postApocCity3.png')),
        # pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'postApocCity4.png')),
        # pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'postApocCity5.png'))
    ]
    fondos = [pygame.transform.scale(f, (SCREEN_WIDTH, SCREEN_HEIGHT)) for f in fondos]
    
    fondo_actual_idx = 0
    fondo = fondos[fondo_actual_idx]
    fondo_y = 0
    scroll_speed = 3

    # Usa os.path.join para construir las rutas de los sonidos
    sonido_laser = pygame.mixer.Sound ( os.path.join ( ASSETS_PATH , 'sounds' , 'laserFire.mp3' ) )
    sonido_explosion = pygame.mixer.Sound ( os.path.join ( ASSETS_PATH , 'sounds' , 'explosion.mp3' ) )

    # Reproducir sonido de fondo
    pygame.mixer.music.load ( os.path.join ( ASSETS_PATH , 'sounds' , 'TerminatorMainTheme.mp3' ) )
    pygame.mixer.music.play ( -1 )  # Reproduce el sonido en un bucle

    personaje = Personaje ( SCREEN_WIDTH // 2 , SCREEN_HEIGHT // 2 )
    enemigos = [ ]
    explosiones = [ ]
    puntos = 0
    nivel = 1
    velocidad_enemigo = 5  # Velocidad inicial del enemigo

    clock = pygame.time.Clock ( )
    running = True
    while running :
        for event in pygame.event.get ( ) :
            if event.type == pygame.QUIT :
                pygame.quit ( )
                sys.exit ( )

        keys = pygame.key.get_pressed ( )
        dx , dy = 0 , 0
        if keys [ pygame.K_LEFT ] :
            dx = -5
        if keys [ pygame.K_RIGHT ] :
            dx = 5
        if keys [ pygame.K_UP ] :
            dy = -5
        if keys [ pygame.K_DOWN ] :
            dy = 5

        personaje.mover ( dx , dy )

        if keys [ pygame.K_SPACE ] :
            personaje.lanzar_laser ( )
            sonido_laser.play ( )

        # Actualizar posición de enemigos y manejar colisiones
        for enemigo in enemigos [ : ] :  # Iterar sobre una copia para eliminar de la lista original
            enemigo.mover ( )
            if enemigo.rect.top > SCREEN_HEIGHT :
                enemigos.remove ( enemigo )

            # Verificar colisiones con láseres
            for laser in personaje.lasers [ : ] :  # Iterar sobre una copia para eliminar de la lista original
                if enemigo.rect.colliderect ( laser.rect ) :
                    explosiones.append ( Explosion ( enemigo.rect.centerx , enemigo.rect.centery ) )
                    enemigos.remove ( enemigo )  # Eliminar el enemigo
                    personaje.lasers.remove ( laser )  # Eliminar el láser
                    sonido_explosion.play ( )
                    puntos += 10  # Incrementar el puntajeos
                    break  # Salir del bucle para evitar errores

            if enemigo.rect.colliderect ( personaje.shape ) :
                if not personaje.recibir_dano ( ) :
                    running = False  # Terminar el juego si la energía llega a 0

        # Generar enemigos aleatoriamente
        if random.random ( ) < 0.02 :
            x = random.randint ( 0 , SCREEN_WIDTH - 50 )  # Asegúrate de que el enemigo esté dentro de la pantalla
            enemigo = Enemigo ( x , 0, velocidad_enemigo )
            enemigos.append ( enemigo )

        # Actualizar explosiones
        explosiones = [ explosion for explosion in explosiones if explosion.actualizar ( ) ]

        # Dibujar fondo con desplazamiento
        screen.blit(fondo, (0, fondo_y))
        screen.blit(fondo, (0, fondo_y - SCREEN_HEIGHT))

        # Actualizar la posición del fondo
        fondo_y += scroll_speed
        if fondo_y >= SCREEN_HEIGHT:
            fondo_y = 0

        personaje.dibujar ( screen )
        for enemigo in enemigos :
            enemigo.dibujar ( screen )
        for explosion in explosiones :
            explosion.dibujar ( screen )

        # Mostrar marcador y nivel
        font = pygame.font.Font ( None , 36 )
        texto_puntos = font.render ( f"Puntos: {puntos}" , True , (255 , 255 , 255) )
        texto_nivel = font.render ( f"Nivel: {nivel}" , True , (255 , 255 , 255) )
        screen.blit ( texto_puntos , (10 , 50) )
        screen.blit ( texto_nivel , (10 , 90) )

        #Mostrar tiempo transcurrido
        tiempo_transcurrido = (pygame.time.get_ticks() // 1000) - 28  # Tiempo en segundos
        texto_tiempo = font.render(f"Tiempo: {tiempo_transcurrido}s", True, (255, 255, 255))
        screen.blit(texto_tiempo, (10, 130))

        if puntos >= 200 :
            nivel += 1
            puntos = 0  # Resetea el puntaje al cambiar de nivel
            velocidad_enemigo *= 1.2  # Aumenta la velocidad del enemigo en un 20%
            # Cambiar al siguiente fondo, usando el operador de módulo para repetir
            fondo_actual_idx = (nivel - 1) % len(fondos)
            fondo = fondos[fondo_actual_idx]
            personaje.cambiar_personaje(nivel)

        pygame.display.flip ( )
        clock.tick ( 60 )

    # Mostrar mensaje de GAME OVER
    screen.fill ( (0 , 0 , 0) )

    # Definir fuente
    font_large = pygame.font.Font ( None , 74 )
    font_small = pygame.font.Font ( None , 36 )

    # Renderizar textos
    texto_game_over = font_small.render ( "CAIMOS ANTE LA REDCIELO" , True , (255 , 0 , 0) )
    texto_mensaje = font_small.render ( "Fuimos Solo Datos" , True , (255 , 255 , 255) )

    # Calcular posiciones para centrar el texto
    pos_x_game_over = SCREEN_WIDTH // 2 - texto_game_over.get_width ( ) // 2
    pos_y_game_over = SCREEN_HEIGHT // 2 - texto_game_over.get_height ( ) // 2 - 20  # Ajusta el margen vertical

    pos_x_mensaje = SCREEN_WIDTH // 2 - texto_mensaje.get_width ( ) // 2
    pos_y_mensaje = SCREEN_HEIGHT // 2 + texto_game_over.get_height ( ) // 2 + 20  # Ajusta el margen vertical

    # Dibujar textos en la pantalla
    screen.blit ( texto_game_over , (pos_x_game_over , pos_y_game_over) )
    screen.blit ( texto_mensaje , (pos_x_mensaje , pos_y_mensaje) )

    # Actualizar la pantalla
    pygame.display.flip ( )
    pygame.time.wait ( 5000 )  # Mostrar GAME OVER durante 5 segundos
    pygame.quit ( )
    sys.exit ( )


if __name__ == '__main__' :
    main ( )