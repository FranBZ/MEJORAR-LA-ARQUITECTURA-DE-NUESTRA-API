# MEJORAR-LA-ARQUITECTURA-DE-NUESTRA-API

## Consignas:
- Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
- Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
- El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será
devuelto por una Factory para que la capa de negocio opere con el.
- Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que
impida crear nuevas instancias de estos mecanismos de acceso a los datos.
- Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
- Implementar el patrón Repository para la persistencia de productos y mensajes.

<sup>Formato: link a un repositorio en Github con el proyecto cargado.
Sugerencia: no incluir los node_modules</sup>

## Como ejecutar el proyecto

### En tu pc
- Antes que nada debes tener instalado en tu pc node.js
- Debes clonar el repositorio
- Abrir una terminal y en ella dirigirte a la carpeta con el nombre del proyecto
- Ejecutar el comando ``` npm install ```
- Deves configurar un archivo ``` .env ``` con los siguientes datos
    ```
    MONGO_USER = "< usuario de mongo atlas >"
    MONGO_PASS = "< contraseña de mongo atlas >"
    MONGO_ATLAS_ENDPOINT = "< @cluster0.aaa111.mongodb.net/db >"

    GOOGLE_APLICATION_CREDENTIALS = "< path de la ubicacion de las credenciales >"
    ```
- Una vez finalizado el punto anterior, ejecutar el comando ``` npm run start ```
- Luego puedes utilizar el navegador de tu preferencia para testear los diferentes endpoints