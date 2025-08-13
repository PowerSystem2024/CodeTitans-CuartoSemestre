from usuario_dao import UsuarioDAO
from usuario import Usuario
from logger_base import log 
from utils import DatosInvalidosError
from init_db import crear_tabla_usuario
crear_tabla_usuario()

class menu_app_usuario:

    @staticmethod
    def mostrar_menu():
        print("1. Listar usuario")
        print("2. Listar usuario por id")
        print("3. Agregar usuario")
        print("4. Actualizar usuario")
        print("5. Eliminar usuario")
        print("6. Salir")

    @staticmethod
    def obtener_opcion():
        return input("Seleccione una opción: ")


    @staticmethod
    def listar_usuarios():
        try:
            for usuario in UsuarioDAO.seleccionar():
                log.info(usuario)
        except Exception as e:
            log.error(f"Error al listar usuarios: {e}")

    @staticmethod
    def listar_usuario_por_id():
        try:
            id_usuario = int(input("Ingrese el ID del usuario a buscar: "))
            if not id_usuario:
                log.error("El ID no puede estar vacío.")
                return
            usuario = UsuarioDAO.seleccionar_por_id(id_usuario)
            log.info(f"Usuario encontrado: {usuario}")
        except Exception as e:
            log.error(f"Error al buscar usuario por ID: {e}")

    @staticmethod
    def agregar_usuario():
        try:
            nombre = input("Ingrese el nombre del usuario: ")
            password = input("Ingrese la contraseña del usuario: ")
            DatosInvalidosError.validar_datos(nombre, password)
            usuario = Usuario(None, nombre, password)
            UsuarioDAO.insertar(usuario)
            log.info("Usuario agregado exitosamente.")
        except Exception as e:
            log.error(f"Error al agregar usuario: {e}")

    @staticmethod
    def actualizar_usuario():
        try:
            id_usuario = int(input("Ingrese el ID del usuario a actualizar: "))
            nombre = input("Ingrese el nuevo nombre del usuario: ")
            password = input("Ingrese la nueva contraseña del usuario: ")
            DatosInvalidosError.validar_datos(nombre, password)
            usuario = Usuario(id_usuario, nombre, password)
            UsuarioDAO.actualizar(usuario)
            log.info("Usuario actualizado exitosamente.")
        except DatosInvalidosError as e:
            log.error(f"Error de validación: {e}")  
        except Exception as e:
            log.error(f"Error al actualizar usuario: {e}")

    @staticmethod
    def eliminar_usuario():
        try:
            id_usuario = int(input("Ingrese el ID del usuario a eliminar: "))
            if not id_usuario:
                log.error("El ID no puede estar vacío.")
                return
            usuario = Usuario(id_usuario, None, None)
            UsuarioDAO.eliminar(usuario)
            log.info("Usuario eliminado exitosamente.")
        except Exception as e:
            log.error(f"Error al eliminar usuario: {e}")

