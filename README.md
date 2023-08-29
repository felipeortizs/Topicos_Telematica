Estudiante(s): Juan Felipe Ortiz Salgado, jfortizs@eafit.edu.co

Profesor: Edwin Montoya

# Sistema de Microservicios con RabbitMQ

1. **Breve Descripción de la Actividad**

EL proyecto implementa un sistema de microservicios con RabbitMQ. A través de una interfaz API, los usuarios pueden solicitar listas de archivos y realizar búsquedas por nombre. Estas solicitudes se manejan en microservicios que se comunican mediante RabbitMQ para la coordinacion de tareas.

## 1.1. Que aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)

- Implementación de una API con Express.
- Uso de microservicios para separar la lógica de listar y buscar archivos.
- Integración con RabbitMQ para gestionar las comunicaciones entre microservicios.
- Diseño modular y organizado.

# 2. Información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.

Se implementó una arquitectura de microservicios utilizando Express y gRPC para la comunicación. RabbitMQ se utiliza como mediador para la comunicación entre servicios. La estructura del proyecto está organizada modularmente, separando configuraciones, servicios y la lógica principal en diferentes carpetas y archivos.

# 3. Descripción del ambiente de desarrollo y técnico: lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.

- Lenguaje: Nodejs
- Librerías:
  - express (version)
  - gRPC (version)
  - RabbitMQ (version)
  - Pika (version para RabbitMQ en nodejs)

## Cómo se compila y ejecuta.

1. Inicia RabbitMQ.

```bash
sudo docker start rabbit-server
```

2. Lanza los microservicios y la API principal.

Servicios

Listar Archivos: Lista todos los archivos en el directorio especificado.

Buscar Archivos: Busca archivos en el directorio basándose en un patrón dado.

Instancias:

API Gateway: 54.157.183.155

Servicio gRPC: 107.22.231.147

RabbitMQ (MOM): 23.20.48.82

los puertos de cada servicio son:
API: 80
MOM (RabbitMQ): 5672
gRPC: 50051

¿Cómo Usar?

Listar Archivos:

Para listar todos los archivos, realiza una solicitud a:

http://54.157.183.155/list

Buscar Archivos

Para buscar archivos, realiza una solicitud GET con el patrón de búsqueda deseado como parámetro de consulta:

http://54.157.183.155/search?name=<PATRON_DE_BUSQUEDA>

Reemplaza <PATRON_DE_BUSQUEDA> con el patrón que deseas buscar.

Manejo de Errores:

Si el servicio gRPC está inactivo cuando se realiza una solicitud a través del API Gateway, la solicitud será enviada a RabbitMQ (MoM). 

