# Profundizando en el tipo float

a = 3.0

# Constructor de tipo float -> puede recibir int y str
a = float(10)  # Le pasamos un tipo entero (int)
a = float("10")  # Le pasamos un tipo cadena (str)
print(f"a = {a: .2f}")  # Imprime con dos decimales

# Notacion exponencial (valores positivos o negativos)
a = 1.5e2
print(f"a = {a: .2e}")

a = -2.5e-3
print(f"a = {a: .2e}")
