<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ExtensionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_unaccent_and_pg_trgm_extensions_are_installed()
    {
        $installed = collect(DB::select('select extname from pg_extension'))->pluck('extname');

        $this->assertContains('unaccent', $installed);
        $this->assertContains('pg_trgm', $installed);
    }

    public function test_unaccent_removes_spanish_accents()
    {
        $result = DB::selectOne("select unaccent('Querétaro, Mérida y Nuevo León') as value");

        $this->assertSame('Queretaro, Merida y Nuevo Leon', $result->value);
    }
}
