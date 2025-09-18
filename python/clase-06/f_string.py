# f-string (formatted string literals)
# interpolación de variables en cadenas de texto
# esto permite incluir expresiones dentro de cadenas de texto
# usando la sintaxis f'...{expresion}...'
nombre = 'Pepe'
edad = 28
sueldo = 4500.567
mensaje = f'Nombre {nombre}, Edad {edad}, Sueldo {sueldo:.2f}'
print(mensaje)

print(nombre, edad, sueldo, sep=' - ')