<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_profile', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_primary')->default(false);

            $table->primary(['category_id', 'profile_id']);
            $table->index('profile_id');
        });

        DB::statement('CREATE UNIQUE INDEX category_profile_one_primary_per_profile ON category_profile (profile_id) WHERE is_primary');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_profile');
    }
};
