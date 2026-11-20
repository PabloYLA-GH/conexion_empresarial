# conexion_empresarial

conexion_empresarial

# Conexión Empresarial

Plataforma empresarial desarrollada con Laravel, React,
TypeScript, Inertia.js y PostgreSQL.

## Tecnologías

- Laravel 13
- React 19 y TypeScript
- Inertia.js
- PostgreSQL 18
- Docker + Laravel Sail
- Vite

## Requisitos

- Git
- Docker con Docker Compose
- En Windows: Docker Desktop y WSL2

No es necesario instalar PHP, Node.js ni PostgreSQL
directamente en el equipo.

## Instalación

### 1. Clonar el proyecto

```bash
git clone https://github.com/PabloYLA-GH/conexion_empresarial.git
cd conexion_empresarial
```

### 2. Crear variables de entorno

```bash
cp .env.example .env
```

Revisar los puertos y credenciales de desarrollo en .env.

### 3. Instalar Composer mediante Docker

```bash
docker run --rm \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -e COMPOSER_HOME=/tmp/composer \
  -v "$PWD:/app" \
  -w /app \
  composer:2 install --no-scripts --no-interaction
```

### 4. Iniciar Docker

```bash
./vendor/bin/sail up -d
```

### 5. Completar dependencias

```bash
./vendor/bin/sail artisan package:discover
./vendor/bin/sail npm ci
```

### 6. Configurar Laravel

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

### 7. Iniciar frontend

```bash
./vendor/bin/sail npm run dev
```

## Acceso

Aplicación: http://localhost:8000
Vite: http://localhost:5173

## Verificación

```bash
./vendor/bin/sail artisan test
./vendor/bin/sail npm run build
```

## Trabajo colaborativo

- main: código integrado y estable.
- feature/*: desarrollo de funcionalidades.
- fix/*: corrección de errores.
- Todas las funcionalidades se integran mediante Pull Requests.

No subir archivos .env, credenciales ni datos locales.

Cada desarrollador utiliza su propia base de datos PostgreSQL.
Los cambios estructurales se comparten mediante migraciones.
