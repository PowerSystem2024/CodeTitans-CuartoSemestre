from usuario import Usuario
from cursor_del_pool import CursorDelPool
from conexion import Conexion
from logger_base import log

class UsuarioDAO:

    _SELECCIONAR = "SELECT * FROM usuario ORDER BY id_persona"
    _SELECCIONAR_ID = "SELECT * FROM usuario WHERE id_persona = %s"
    _INSERTAR = "INSERT INTO usuario(username, password) VALUES(%s, %s)"
    _ACTUALIZAR = "UPDATE usuario SET username = %s, password = %s WHERE id_persona = %s"   
    _ELIMINAR = "DELETE FROM usuario WHERE id_persona = %s"

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            usuarios = []
            for registro in registros:
                usuario = Usuario(*registro)
                usuarios.append(usuario)
            return usuarios

    @classmethod
    def seleccionar_por_id(cls, id_usuario):
        with CursorDelPool() as cursor:
            cursor.execute(cls._SELECCIONAR_ID, (id_usuario,))
            registro = cursor.fetchone()
            if registro:
                return Usuario(*registro)
            return f"No hay usuarios con id {id_usuario}"
        
    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            cursor.execute(cls._INSERTAR, (usuario.username, usuario.password))
            nuevo_id = cursor.fetchone()[0]
            usuario.id_usuario = nuevo_id
            log.debug(f"Usuario insertado: {usuario}")
            return usuario

    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            cursor.execute(cls._ACTUALIZAR, (usuario.username, usuario.password, usuario.id_usuario))
            log.debug(f"Usuario actualizado: {usuario}")
            return cursor.rowcount

    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            cursor.execute(cls._ELIMINAR, (usuario.id_usuario,))
            log.debug(f"Usuario eliminado: {usuario}")
            return cursor.rowcount

