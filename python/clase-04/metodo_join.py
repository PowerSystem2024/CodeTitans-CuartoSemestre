# Ejemplo del método join de las cadenas
# help(str.join)

# Unir los elementos de una tupla en una cadena
tupla_str = ("Hola", "Developers", "2025", "UTN")
mensaje = " ".join(tupla_str)
print(mensaje)

# Unir los elementos de una lista en una cadena
lista_str = ["Java", "Python", "JavaScript", "UTN"]
mensaje = ", ".join(lista_str)
print(mensaje)

# Otros efectos del metodo join
cadena = "HolaMundo"
mensaje = "-".join(cadena)
print(mensaje)

# Unir los elementos de un diccionario en una cadena
diccionario = {"nombre": "Juan", "edad": "30", "pais": "Argentina"}
llaves = " - ".join(diccionario.keys())
valores = " - ".join(diccionario.values())
print(f"Llaves: {llaves}, Type: {type(llaves)}")
print(f"Valores: {valores}, Type: {type(valores)}")
