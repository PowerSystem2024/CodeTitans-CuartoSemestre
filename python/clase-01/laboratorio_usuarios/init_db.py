from cursor_del_pool import CursorDelPool
from logger_base import log

def crear_tabla_usuario():
    with CursorDelPool() as cursor:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuario (
            id_persona SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL
        );
        """)
        log.info("Tabla 'usuario' verificada/creada.")

if __name__ == "__main__":
    crear_tabla_usuario()
    print("Inicialización de la tabla usuario completa.")
