# Ejercicio Full Stack

Este proyecto de un listado de productos, para la práctica de backend y frontend, 

## Tecnologias utilizadas

### Backend
- JavaScript
- Express
- PossgresSQL
- Zod

### frontend
- React
- Vite
- Zod
- Reack Hook Form   

## Requisitos y comandos para ejecutar el proyecto

### Backend

- Tener activo un contenedor de Docker compose
- Instalar las depencias npm

 ```
 npm install
 npm run dev
 ```
### Frontend

- Instalar las dependicias npm
```
 npm install
 npm run dev
```
### Base de datos

- Tener un gestor de base de datos.
- Tener una conexion con una base de datos PosgresSQL.
- Crear una base de datos 
- Ejecutar el siguiente Script SQL para la creacion de la tabla 
```
create table productos (
	id serial primary key,
	codigo varchar(20) unique not null,
	nombre varchar(100) not null,
	descripcion text,
	categoria varchar(50) not null,
	marca varchar(50) not null,
	precio numeric(10,2) not null,
	stock integer not null,
	estado boolean not null default true,
	fecha_creacion timestamp not null default current_timestamp
);
```