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
        Schema::create('profile_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('channel', 20);
            $table->string('value');
            $table->string('visibility', 20)->default('public');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->index('profile_id');
        });

        DB::statement('CREATE UNIQUE INDEX profile_contacts_one_primary_per_channel ON profile_contacts (profile_id, channel) WHERE is_primary');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_contacts');
    }
};
