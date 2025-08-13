import os # módulo os para acceder a las variables de entorno
from dotenv import load_dotenv
import psycopg2
from psycopg2 import pool
from logger_base import log
import sys 

load_dotenv()

class Conexion:

    _DATABASE = os.getenv("DB_NAME")
    _USERNAME = os.getenv("DB_USER")
    _PASSWORD = os.getenv("DB_PASSWORD")
    _DB_PORT = os.getenv("DB_PORT")
    _HOST = os.getenv("DB_HOST")
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtenerPool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls._MIN_CON,
                    cls._MAX_CON,
                    database = cls._DATABASE,
                    user = cls._USERNAME,
                    password = cls._PASSWORD,
                    host = cls._HOST,
                    port = cls._DB_PORT
                )
                log.debug(f'Creacion del pool exitosa: {cls._pool}')
                return cls._pool
            except Exception as e:
                log.error(f'Error al crear el pool: {e}')
                sys.exit()
        else:
            return cls._pool
            
    @classmethod
    def obtenerConexion(cls):
        try:
            conexion = cls.obtenerPool().getconn()
            log.debug(f'Conexion obtenida del pool: {conexion}')
            return conexion
        except Exception as e:
            log.error(f'Error al obtener la conexion: {e}')
            sys.exit()

    @classmethod
    def liberarConexion(cls, conexion):
        try:
            cls.obtenerPool().putconn(conexion)
            log.debug(f'Conexion liberada: {conexion}')
        except Exception as e:
            log.error(f'Error al liberar la conexion: {e}')
            sys.exit()

    @classmethod
    def cerrarConexion(cls):
        try:
            cls.obtenerPool().closeall()
            log.debug(f'Conexion cerrada: {conexion}')
        except Exception as e:
            log.error(f'Error al cerrar la conexion: {e}')
            sys.exit()

# Prueba
if __name__ == "__main__":
    Conexion.obtenerPool()
    conexion = Conexion.obtenerConexion()
    Conexion.liberarConexion(conexion)
    Conexion.cerrarConexion(conexion)
    log.info('Prueba de logging desde conexion.py')
