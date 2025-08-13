class Usuario:
    def __init__(self, id_usuario, username, password):
        self._id_usuario = id_usuario
        self._username = username
        self._password = password

    def __str__(self):
        return (
            f"Usuario:\n"
            f"    ID: {self._id_usuario}\n"
            f"    Username: {self._username}\n"
            f"    Password: {self._password}"
        )

    # id_usuario
    @property
    def id_usuario(self):
        return self._id_usuario

    @id_usuario.setter
    def id_usuario(self, id_usuario):
        self._id_usuario = id_usuario

    # username
    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, username):
        self._username = username

    # password
    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = password
