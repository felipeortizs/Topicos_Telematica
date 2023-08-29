Documentación de Reto 2

Resumen de Servicios

Listar Archivos: Lista todos los archivos en el directorio especificado.

Buscar Archivos: Busca archivos en el directorio basándose en un patrón dado.

Instancias:

API Gateway: 54.157.183.155

En esta instancia se debe correr el codigo proxy.js

sudo node proxy.js

Servicio gRPC: 107.22.231.147

En esta instancia se debe correr el codigo Server.js

sudo node Server.js

RabbitMQ (MOM): 23.20.48.82

En esta instancia se debe de levantar el contenedor y correr el codigo para desencolar los mensajes y traducirlos.

sudo docker start rabbit-server

python3 consumerQueue.py

Cómo Usar

Listar Archivos:

Para listar todos los archivos, realiza una solicitud a:

http://54.157.183.155/list

Buscar Archivos

Para buscar archivos, realiza una solicitud GET con el patrón de búsqueda deseado como parámetro de consulta:

http://54.157.183.155/search?name=<PATRON_DE_BUSQUEDA>

Reemplaza <PATRON_DE_BUSQUEDA> con el patrón que deseas buscar.

Manejo de Errores:

Si el servicio gRPC está inactivo cuando se realiza una solicitud a través del API Gateway, la solicitud será enviada a RabbitMQ. 

# Topicos en Telematica
