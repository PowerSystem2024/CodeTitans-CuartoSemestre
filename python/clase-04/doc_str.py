from mi_clase import MiClase

# De esta forma podemos ver la documentación de la clase y sus métodos
# Podemos ver la documentacion que hicimos con docstrings en el otro archivo
# help(MiClase)

# print(MiClase.__doc__)  # de esta forma vemos la doc de la clase con __doc__

# De esta forma vemos la doc del método __init__ con __doc__
# print(MiClase.__init__.__doc__)

# de esta forma vemos la doc del método mi_metodo con __doc__
# print(MiClase.metodo.__doc__)

print(MiClase.metodo)  # de esta forma vemos la referencia al método sin ejecutarlo
print(type(MiClase.metodo))  # de esta forma vemos que es un objeto función
