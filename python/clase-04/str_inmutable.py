# Muestra la documentación de la función capitalize de la clase str
# help(str.capitalize)

mensaje1 = "hola mundo"
# El metodo capitalize hace que la primer letra sea mayuscula
mensaje2 = mensaje1.capitalize()
print(f"mensaje1: {mensaje1}")
print(f"mensaje2: {mensaje2}")

# Verificamos las direcciones de memoria
print(f"mensaje1: {mensaje1}, id: {id(mensaje1)}")
print(f"mensaje2: {mensaje2}, id: {id(mensaje2)}")

# Al concatenar, se crea un nuevo objeto en memoria el id cambia
# Esto demuestra que las cadenas son inmutables
mensaje1 += " Adios"
print(f"mensaje1: {mensaje1}, id: {id(mensaje1)}")
