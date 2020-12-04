# Data Warehouse v1.0

Aplicación Web para gestión de contactos de interés de una compañía

## [](https://github.com/SharaC/DataWareHouse#requisitos)Requisitos:

1.  Instalar motor de **MySQL**
2.  En su motor de base de datos, ejecute el script de creación e inicialización de la base de datos que se encuentra en el archivo: **initdb_datawarehouse.sql**  
    **NOTAS**:  
    **1.** Al final de este archivo se insertan algunos datos de prueba para poblar la base de datos inicialemte, por lo que antes de ejecutar el script, debería revisar y realizar modificaciones en algunas o todas las entradas, entre ellas el **usuario con rol de administrador** y su contraseña en la tabla de usuarios.  
    **2.** Se han insertado solo algunos países y ciudades en sus respectivas tablas, y por esto tenga muy en cuenta que pueden existir algunas regiones **SIN PAISES y SIN CIUDADES** asociados o paises **SIN CIUDADES** asociadas, por lo que cuando pruebe la aplicación y necesite ubicar ciudades o paises que aún no se han agregado, se encontrará que no es posible seleccionar hasta que primero las cree desde la sección **Región/Ciudad**.
3.  Instalar **Node.js**
4.  Clonar este repositorio e instalar las dependencias para correr el back ejecutando el comando: `npm install` (ubicado en la raiz de la carpeta Backend)

## [](https://github.com/SharaC/DataWareHouse#definici%C3%B3n-de-par%C3%A1metros)Definición de parámetros:

En el directorio **./src/startup** se encuentra el archivo de parámetros a configurar: **config.js**, es necesario editar los siguientes parámetros deacuerdo su configuración actual de la base de datos y servidor de Node y Express.

```
- HOST_DATABASE: 'localhost'
- appPort: '< puerto_express >'
- NAME_DATABASE: 'datawarehouse'
- USER_DATABASE: '< usuario >'
- PASSWORD_DATABASE: '< password >'
- SECRET: '< palabra de secreto para generar los tokens JWT >'

```

- Omita los caracteres: < > y reemplace por los valores de su preferencia

## [](https://github.com/SharaC/DataWareHouse#ejecuci%C3%B3n)Ejecución:

**Frontend:**  
Levantar un servidor web local para acceder a los recursos del Frontend, se recomienda utilizar la extensión de Live Server en el editor Visual Studio Code. El archivo principal que debe abrir en el navegador es ./Frontend/html/login.html . Si estás usando el liveserver por el puerto 5500, entonces ingresa en el navegador: [http://127.0.0.1:5500/Frontend/html/login.html](http://127.0.0.1:5500/Frontend/html/login.html) y llegaras al login de la aplicación.

**Backend:** 
Ubicado en la raíz de la carpeta Backend de este proyecto ejecute el comando: `node app.js` para iniciar la aplicación. Para probar que se inició exitosamente, visite en el navegador de preferencia, de acuerdo a sus parámetros: `http://HOST:appPort/v1/api-ping` (por ejemplo [http://localhost:3030/v1/api-ping](http://localhost:3030/v1/api-ping) ) y verifique que la respuesta recibida sea: **Datawarehouse Sharac: it works fine ;)"**

## [](https://github.com/SharaC/DataWareHouse#uso-de-la-aplicaci%C3%B3n)Uso de la aplicación:

Lo primero que debes hacer es autenticarte con uno de los 2 usuarios que se dejaron inicialmente registrados en la base de datos:

- Usuario con rol administrador, username: **admin** y password: **admin**
- Otro usuario normal, username: **sharac** y password: **sharac**

O bien, puedes insertar directamente tus propios usuarios iniciales en la base de datos en la tabla de usuarios. (en el script se incluyen los INSERT de ejemplo, con los que se registraron "admin" y "sharac").

Una vez logueado, debería ser redirigido a la sección **Contactos** y ya puede comenzar a navegar entre las diferentes vistas.
