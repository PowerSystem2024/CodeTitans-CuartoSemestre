class DatosInvalidosError(Exception):
    
    @staticmethod
    def validar_datos(nombre: str, password: str):
        # Validación de nombre
        if not isinstance(nombre, str):
            raise DatosInvalidosError("El nombre debe ser un texto.")
        if not nombre:
            raise DatosInvalidosError("El nombre no puede estar vacío.")
        if not nombre.strip():
            raise DatosInvalidosError("El nombre no puede contener solo espacios.")
        if len(nombre) > 50:
            raise DatosInvalidosError("El nombre no puede exceder 50 caracteres.")
        if not nombre.isalnum():
            raise DatosInvalidosError("El nombre solo puede contener caracteres alfanuméricos.")
        if ' ' in nombre:
            raise DatosInvalidosError("El nombre no puede contener espacios.")

        # Validación de contraseña
        if not isinstance(password, str):
            raise DatosInvalidosError("La contraseña debe ser un texto.")
        if not password:
            raise DatosInvalidosError("La contraseña no puede estar vacía.")
        if len(password) < 8:
            raise DatosInvalidosError("La contraseña debe tener al menos 8 caracteres.")
        if len(password) > 20:
            raise DatosInvalidosError("La contraseña no puede exceder 20 caracteres.")
        if ' ' in password:
            raise DatosInvalidosError("La contraseña no puede contener espacios.")

        # Validación de caracteres especiales en la contraseña
        caracteres_especiales = "!@#$%^&*()-+.,<>?/\\|{}[]~`=_"
        if not any(char in caracteres_especiales for char in password):
            raise DatosInvalidosError("La contraseña debe contener al menos un carácter especial.")
