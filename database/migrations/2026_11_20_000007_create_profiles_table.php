<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->ulid('public_id')->unique();
            $table->string('slug')->unique();
            $table->foreignId('member_type_id')->constrained()->restrictOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('legal_name')->nullable();
            $table->string('tagline', 80)->nullable();
            $table->string('summary', 280)->nullable();
            $table->text('description')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('status', 20)->default('draft');
            $table->boolean('is_low_profile')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->integer('featured_order')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('member_type_id');
            $table->index('user_id');
            $table->index(['status', 'published_at']);
            $table->index(['is_featured', 'featured_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
