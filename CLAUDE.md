# CLAUDE.md

Guía para trabajar en este repositorio.

## Stack

- Laravel 13 (PHP 8.5 en Sail)
- React 19 + TypeScript con Inertia.js (starter kit oficial de React)
- PostgreSQL 18
- Docker con Laravel Sail (`compose.yaml`)

## Comandos

```bash
./vendor/bin/sail artisan test                 # pruebas
./vendor/bin/sail artisan migrate:fresh --seed # reconstruir la base local con datos de prueba
./vendor/bin/sail bin pint                     # formato (vendor/bin/pint)
./vendor/bin/sail bin phpstan analyse          # análisis estático, Larastan nivel 7 (vendor/bin/phpstan)
```

PHP no está instalado en el equipo, así que las herramientas de `vendor/bin` se ejecutan dentro del contenedor con `sail bin`.

Todo cambio debe pasar Pint y Larastan nivel 7 antes de abrir un Pull Request.

Antes de cualquier push, ejecuta `./vendor/bin/sail composer ci:check`; es exactamente lo que corre la CI.

## Idioma

- Código en inglés: clases, métodos, variables, tablas, columnas, rutas y commits.
- Interfaz en español: textos visibles para el usuario, mensajes de validación y correos.

## Modelos

Seguir el estilo de `app/Models/User.php`:

- Usar los atributos `#[Fillable([...])]` y `#[Hidden([...])]` en lugar de las propiedades `$fillable` y `$hidden`.
- Definir los casts en el método `casts(): array`, no en la propiedad `$casts`.
- Documentar cada columna con docblocks `@property` (tipos incluidos, `Carbon|null` para fechas) para que Larastan pueda analizarlas.
- Declarar `HasFactory` con genéricos: `/** @use HasFactory<ModelFactory> */`.

## Migraciones

- Usar clases anónimas (`return new class extends Migration`).
- Declarar claves foráneas con `foreignId('...')->constrained()`.
- Implementar siempre `down()`.
- Nunca usar `->after()`: PostgreSQL no lo admite y las columnas se añaden siempre al final.
- Nunca editar una migración que ya esté fusionada en `main`. Para cambiar el esquema, crear una migración nueva.

## Pruebas

- PHPUnit (no Pest), con el trait `RefreshDatabase`.
- Nombrar los métodos en `test_snake_case`.
- Toda tabla nueva lleva su factory y al menos una prueba.
- Las pruebas usan la base PostgreSQL `testing` (definida en `phpunit.xml`). No usar sqlite: el proyecto depende de funciones de PostgreSQL.
