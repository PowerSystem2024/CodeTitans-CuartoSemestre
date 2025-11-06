# 📦 requirements.txt en Python

El archivo `requirements.txt` se utiliza en proyectos de **Python** para listar las dependencias necesarias para ejecutar la aplicación.  
Permite instalar todas las librerías requeridas de forma sencilla y reproducible.

---

## ✅ ¿Para qué sirve?

Este archivo especifica los paquetes (y sus versiones) que necesita el proyecto.  
Es especialmente útil para:

- Compartir proyectos con otros desarrolladores
- Reproducir entornos en distintas computadoras
- Preparar despliegues en producción
- Evitar incompatibilidades entre versiones

---

## ✅ Ejemplo de contenido

````txt
Flask==3.0.0
numpy==1.26.0
pandas==2.1.1
matplotlib==3.8.1

## ✅ ¿Cómo se genera?

Si ya instalaste las dependencias dentro de tu entorno virtual (venv), podés generar el archivo con:

pip freeze > requirements.txt

## ✅ ¿Cómo se utiliza?

Una vez que tengas el archivo requirements.txt, cualquier persona puede instalar las mismas dependencias ejecutando:

pip install -r requirements.txt


Esto descargará e instalará todos los paquetes listados en el archivo, recreando el entorno necesario para ejecutar el proyecto.

## ✅ Buenas prácticas

🧩 Usar un entorno virtual (venv)
Asegurate de trabajar dentro de un entorno aislado para evitar conflictos con otras instalaciones de Python.

💾 Versionar requirements.txt en Git
Incluí este archivo en tu repositorio para que otros desarrolladores puedan replicar fácilmente tu entorno.

📌 Mantener versiones fijas
Definí las versiones exactas de cada paquete (nombre==versión) para evitar errores causados por actualizaciones automáticas.

🔁 Regenerar el archivo cuando cambien las dependencias
Cada vez que instales o desinstales una librería, actualizá el archivo con:

pip freeze > requirements.txt


## Cómo Contribuir

Para levantar el entorno y colaborar, sigue estos pasos:

1.  **Clona el repositorio:**
    ```sh
    git clone https://...
    ```

2.  **Navega al directorio y crea el entorno virtual:**
    ```sh
    cd mi-proyecto
    python3 -m venv env
    ```
    *Nota: El entorno virtual (`env`) no se comparte en GitHub.*

3.  **Activa el entorno virtual:**
    -   En Linux/macOS:
        ```sh
        source env/bin/activate
        ```
    -   En Windows:
        ```sh
        .\env\Scripts\activate
        ```

4.  **Instala las dependencias:**
    ```sh
    pip3 install -r requirements.txt
    ```
    *El flag `-r` significa "reutilizar", instalando todo lo que contiene el archivo.*

5.  **Ejecuta el programa:**
    ```sh
    python3 main.py
    ```
````
