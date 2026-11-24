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
        Schema::create('profile_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->char('country_code', 2)->default('MX');
            $table->foreignId('region_id')->nullable()->constrained()->nullOnDelete();
            $table->string('city');
            $table->string('postal_code', 10)->nullable();
            $table->boolean('is_primary')->default(false);
            $table->string('visibility', 20)->default('public');
            $table->timestamps();

            $table->foreign('country_code')->references('code')->on('countries')->restrictOnDelete();
            $table->index('profile_id');
            $table->index('country_code');
            $table->index('region_id');
        });

        DB::statement('CREATE UNIQUE INDEX profile_locations_one_primary_per_profile ON profile_locations (profile_id) WHERE is_primary');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_locations');
    }
};
