from menu_app_usuario import menu_app_usuario
import logger_base as log

def main():
    while True:
        menu_app_usuario.mostrar_menu()
        opcion = menu_app_usuario.obtener_opcion()

        if opcion == "1":
            menu_app_usuario.listar_usuarios()
        elif opcion == "2":
            menu_app_usuario.listar_usuario_por_id()
        elif opcion == "3":
            menu_app_usuario.agregar_usuario()
        elif opcion == "4":
            menu_app_usuario.actualizar_usuario()
        elif opcion == "5":
            menu_app_usuario.eliminar_usuario()
        elif opcion == "6":
            log.info("Saliendo del programa...")
            break
        else:
            log.error("Opción no válida. Intente nuevamente.")

if __name__ == "__main__":
    main()