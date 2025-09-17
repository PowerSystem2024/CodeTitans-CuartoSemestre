# El metodo split nos sirve para dividir una cadena en partes
# help(str.split)

cursos = "Python Java C# JavaScript HTML CSS"
cursos_lista = cursos.split()
print(f"Lista de cursos: {cursos_lista}")
print(type(cursos_lista))

cursos_separados_comas = "Python,Java,C#,JavaScript,HTML,CSS"
# Dividimos la cadena en partes, usando la coma como separador en este caso el 2 determina la cantidad de partes en las que se divide la cadena
cursos_lista_comas = cursos_separados_comas.split(",", 2)
print(f"Lista de cursos (separados por comas): {cursos_lista_comas}")
print(len(cursos_lista_comas))
