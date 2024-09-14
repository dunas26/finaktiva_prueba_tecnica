# Finaktiva Log Management

## Resumen

Este proyecto es un proyecto desarrollado con las siguientes tecnologías:

- [Angular v18](https://angular.io/)
- [Hono](https://hono.dev/)
- [TypeScript v5.3.0](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [Node.js v20](https://nodejs.org/)
- [Inversify](https://inversify.org/)

## Prerrequisitos

- Node 18 o superior
- MySQL 9.0 o superior
- Docker 27.1.2

## Instalación

### Archivo .env

Debe de estar ubicado en ./backend/.env
```bash
APP_PORT=3000
API_PREFIX=/api/v1
CORS_ORIGIN=*
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS

## MySQL Configuration

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_DATABASE=Registration
MYSQL_PASSWORD=finaktiva
```

Las credenciales de base de datos deben coincidir

### Usando Docker compose

Debemos estar ubicados en la raiz del proyecto
```bash
docker compose up --build
```

### Usando NPM

#### Backend

Entramos a la carpeta ./backend y ejecutamos
```bash
## Debemos conectar con la base de datos y realizar la migración
npm run migrate
## Inicializamos el servidor
npm run dev
```

#### Frontend

Entramos a la carpeta ./frontend y ejecutamos
```bash
npm run start
```
