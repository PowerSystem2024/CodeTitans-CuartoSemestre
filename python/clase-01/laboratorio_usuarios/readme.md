# Guía de Instalación - Laboratorio Usuarios

## Requisitos

- Python 3.8 o superior
- PostgreSQL instalado y en ejecución
- Acceso a la terminal o consola de comandos

## Pasos de instalación

1. **Clona el repositorio o descarga los archivos del proyecto.**

2. **(Opcional) Crea un entorno virtual para aislar las dependencias:**
```
powershell
python -m venv venv
.\venv\Scripts\activate
Instala las dependencias necesarias
```

3. **Instala las dependencias necesarias:
``` 
pip install python-dotenv psycopg2
```
4. **Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido (ajusta los valores según tu configuración):
     
```
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
```

5. **Crea la base de datos en PostgreSQL:

Accede a la consola de PostgreSQL y ejecuta:
       
```
CREATE DATABASE nombre_de_tu_base_de_datos;
```

6. **Ejecuta la aplicación:

```
python main.py
```

