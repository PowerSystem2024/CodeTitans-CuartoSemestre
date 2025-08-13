from logger_base import log
from conexion import Conexion
import sys  # sys es para manejar la salida del sistema

class CursorDelPool:

    def __init__(self):
        self.conexion = None
        self.cursor = None

    def __enter__(self):
        try:
            self.conexion = Conexion.obtenerConexion()
            self.cursor = self.conexion.cursor()
            log.debug(f'Cursor creado: {self.cursor}')
            return self.cursor
        except Exception as e:
            # Si ya habíamos tomado una conexión, devolverla al pool
            if self.conexion is not None:
                try:
                    Conexion.liberarConexion(self.conexion)
                except Exception as e2:
                    log.error(f'Error liberando la conexion tras fallo en __enter__: {e2}')
            log.error(f'Error al crear el cursor: {e}')
            sys.exit(1)

    def __exit__(self, exc_type, exc_val, exc_tb):
        log.debug(f'Saliendo del contexto del cursor: {self.cursor}')
        try:
            if exc_type is not None:
                # Ocurrió una excepción durante el bloque with
                self.conexion.rollback()
                log.error(f'Excepcion ocurrida, se ejecuta rollback: {exc_type.__name__}: {exc_val}')
            else:
                # Sin excepción: confirmar cambios
                self.conexion.commit()
                log.debug('Transaccion exitosa, cambios guardados')
        finally:
            try:
                if self.cursor is not None:
                    self.cursor.close()
            except Exception as e:
                log.error(f'Error al cerrar el cursor: {e}')
            try:
                if self.conexion is not None:
                    Conexion.liberarConexion(self.conexion)
            except Exception as e:
                log.error(f'Error al liberar la conexion: {e}')
        # Devolver False para que, si hubo excepción, se propague al caller
        return False

if __name__ == '__main__':
    try:
        with CursorDelPool() as cursor:
            log.debug('Usando el cursor dentro del contexto')
            cursor.execute('SELECT * FROM usuario LIMIT 5')
            registros = cursor.fetchall()
            log.info(f'Registros obtenidos: {len(registros)}')
    except Exception as e:
        log.error(f'Fallo en la prueba de CursorDelPool: {e}')
        sys.exit(1)