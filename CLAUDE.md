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
- Declarar las relaciones con genéricos en el docblock: `@return BelongsTo<MemberType, $this>`.
- Si una columna tiene valor por defecto en la base, repetirlo en `protected $attributes` del modelo. Así un modelo recién creado no queda con `null` hasta recargarlo (ver `User::$attributes` y `Profile::$attributes`).
- No incluir en `#[Fillable]` los campos que solo puede cambiar un administrador (`users.role`; en `profiles`: `status`, `is_featured`, `featured_order`, `published_at`, `user_id`). Se asignan de forma explícita.

## Enums

- Van en `app/Enums/`, respaldados por `string`, con los casos y valores en inglés (`case InProgress = 'in_progress'`).
- Cada enum tiene un método `label()` que devuelve el texto en español para la interfaz.
- En la base se guardan como columna `string` con cast al enum en `casts()`. No usar `$table->enum()`: en PostgreSQL crea un CHECK que obliga a hacer una migración para agregar valores.

## Migraciones

- Usar clases anónimas (`return new class extends Migration`).
- Declarar claves foráneas con `foreignId('...')->constrained()`. Excepción: las FK a `countries` usan el código ISO (`char('country_code', 2)` + `foreign()->references('code')->on('countries')`).
- Agregar un índice explícito a cada clave foránea: PostgreSQL no los crea solo.
- Para reglas como «uno solo principal por perfil», usar índices únicos parciales con `DB::statement(... WHERE is_primary)`.
- Implementar siempre `down()`.
- Nunca usar `->after()`: PostgreSQL no lo admite y las columnas se añaden siempre al final.
- Nunca editar una migración que ya esté fusionada en `main`. Para cambiar el esquema, crear una migración nueva.

## Pruebas

- PHPUnit (no Pest), con el trait `RefreshDatabase`.
- Nombrar los métodos en `test_snake_case`.
- Toda tabla nueva lleva su factory y al menos una prueba.
- Las pruebas usan la base PostgreSQL `testing` (definida en `phpunit.xml`). No usar sqlite: el proyecto depende de funciones de PostgreSQL.

## Factories y seeders

- Faker no tiene locale `es_MX`: si se configura, cae a inglés. El proyecto usa `APP_FAKER_LOCALE=es_ES` (también en la CI); tu `.env` local debe tener el mismo valor.
- No usar formateadores de Faker que dependen del idioma (`state()`, `province()`, `words(n, true)`…). Lo mexicano (ciudades, estados, ladas, CP, razones sociales) sale de `database/data/mx.php` a través de `Database\Factories\Support\MexicanData`.
- Los dominios de correo y web de prueba usan `example.com`, que está reservado.
- Datos de catálogo (países, estados, tipos de integrante, categorías) en `CatalogSeeder`: debe poder ejecutarse varias veces sin duplicar (`upsert`/`updateOrCreate`) y es apto para producción.
- Datos falsos de demostración en `DemoProfileSeeder`: solo se ejecutan en `local` y `testing`.
