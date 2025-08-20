import math
from decimal import Decimal

# Manejo de valores infinitos
infinito_positivo = float("inf")
print(f"Infinito positivo: {infinito_positivo}")
print(f"Es infinito positivo? {math.isinf(infinito_positivo)}")


infinito_negativo = float("-inf")
print(f"Infinito negativo: {infinito_negativo}")
print(f"Es infinito negativo? {math.isinf(infinito_negativo)}")


# Modulo math
infinito_positivo = math.inf
print(f"Infinito positivo: {infinito_positivo}")
print(f"Es infinito positivo? {math.isinf(infinito_positivo)}")

infinito_negativo = -math.inf
print(f"Infinito negativo: {infinito_negativo}")
print(f"Es infinito negativo? {math.isinf(infinito_negativo)}")


# Modulo decimal
infinito_positivo = Decimal("Infinity")
print(f"Infinito positivo decimal: {infinito_positivo}")
print(f"Es infinito positivo? {infinito_positivo.is_infinite()}")

infinito_negativo = Decimal("-Infinity")
print(f"Infinito negativo decimal: {infinito_negativo}")
print(f"Es infinito negativo? {infinito_negativo.is_infinite()}")
