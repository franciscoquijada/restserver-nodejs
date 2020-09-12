# Rest-server Tienda Node Proyecto
Servicio rest con node.js, express, mongodb, jwt.

Entidades: 

Usuario
Producto
Categoria
Tienda

El proyecto lo subi a heroku para poder probar, siendo esta la url principal:

https://tiendafq.herokuapp.com

Puedes iniciar sesion con estos datos, haciendo un post a https://tiendafq.herokuapp.com/login, siendo este un usuario con rol de administrador:

email: testadmin@test.com
password: 123456

Tambien esta el recurso (POST):
https://tiendafq.herokuapp.com/register

Las demas peticiones se pueden detallar en el siguiente boton para que se desplieguen en postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/43fde40250c1bb5dfb29#?env%5BHeroku%20Produccion%20NODE%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL3RpZW5kYWZxLmhlcm9rdWFwcC5jb20iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRva2VuIiwidmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMzVmhjbWx2SWpwN0luSnZiR1VpT2lKQlJFMUpUbDlTVDB4Rklpd2laWE4wWVdSdklqcDBjblZsTENKbmIyOW5iR1VpT21aaGJITmxMQ0pmYVdRaU9pSTFaalF4WTJNMFpUaG1NR00yTlRBd01UZGtObUU0WlRNaUxDSnViMjFpY21VaU9pSm1jbUZ1WTJselkyOGdjWFZwYW1Ga1lTSXNJbVZ0WVdsc0lqb2lkR1Z6ZERSQWRHVnpkQzVqYjIwaUxDSnBiV2NpT2lKbGMzUnZJR1Z6SUc5MGNtRWdhVzFoWjJWdUlpd2lYMTkySWpvd2ZTd2lhV0YwSWpveE5UazRNVE0zTVRnNUxDSmxlSEFpT2pFMk1EQTNNamt4T0RsOS5lNzlXVFlrcFlsYWFpek1kQ0c4akdJanBuR2FtSFEzb3YyWjNiRk5QNmRRIiwiZW5hYmxlZCI6dHJ1ZX1d)

Usuario

Post: https://tiendafq.herokuapp.com/usuarios
Post: https://tiendafq.herokuapp.com/register
Get: https://tiendafq.herokuapp.com/usuarios
Get: https://tiendafq.herokuapp.com/usuario/{id}
Get: https://tiendafq.herokuapp.com/usuarios/buscar/{nombre}
Delete: https://tiendafq.herokuapp.com/usuario/{id}
PUT: https://tiendafq.herokuapp.com/usuario/{id}
Logout:
POST: https://tiendafq.herokuapp.com/logout
Login:
POST: https://tiendafq.herokuapp.com/login

Producto

Get: https://tiendafq.herokuapp.com/producto?desde=0&limite=3
Get: https://tiendafq.herokuapp.com/producto/{id}
Get: https://tiendafq.herokuapp.com/productos/buscar/{id}
POST: https://tiendafq.herokuapp.com/producto
DELETE: https://tiendafq.herokuapp.com/producto/{id}
PUT: https://tiendafq.herokuapp.com/producto/{id}

Tienda

Get: https://tiendafq.herokuapp.com/tiendas?desde=0&limite=3
Get: https://tiendafq.herokuapp.com/tienda/{id}
Get: https://tiendafq.herokuapp.com/tienda/buscar/{termino}
POST: https://tiendafq.herokuapp.com/tienda
DELETE: https://tiendafq.herokuapp.com/tienda/{id}
PUT: https://tiendafq.herokuapp.com/tienda/{id}

Categoria:

Get: https://tiendafq.herokuapp.com/categoria
Get: https://tiendafq.herokuapp.com/categoria/{id}
Post: https://tiendafq.herokuapp.com/categoria
Delete: https://tiendafq.herokuapp.com/categoria/{id}
Put: https://tiendafq.herokuapp.com/categoria/{id}


