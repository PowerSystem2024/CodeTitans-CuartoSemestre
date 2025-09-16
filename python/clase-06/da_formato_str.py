# dar un formato string

nombre = "Juan"
edad = 28
mensaje_con_formato = "Mi nombre es %s y tengo %d años" % (nombre, edad)
print(mensaje_con_formato)

# Creamos una tupla
persona = ("Ana", "Gomez", 5000.00)
mensaje_con_formato = "Hola %s %s. Tu sueldo es %.2f" % persona
print(mensaje_con_formato)

nombre = "Pedro"   
edad = 35
sueldo = 7500.50
mensaje_con_formato = "Nombre {}, Edad {}, Sueldo {:.2f}".format(nombre, edad, sueldo)
print(mensaje_con_formato)

mensaje = "Nombre {0}, Edad {1}, Sueldo {2:.2f}".format(nombre, edad, sueldo)
print(mensaje)

mensaje = "Sueldo {2:.2f}, Nombre {0}, Edad {1}".format(nombre, edad, sueldo)
print(mensaje)

diccionario = {"nombre": "Lucia", "edad": 30, "sueldo": 6200.00}
mensaje = "Nombre {persona[nombre]}, Edad {persona[edad]}, Sueldo {persona[sueldo]:.2f}".format(persona=diccionario)
print(mensaje)