<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('opportunity_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opportunity_id')->constrained()->restrictOnDelete();
            $table->foreignId('applicant_profile_id')->constrained('profiles')->restrictOnDelete();
            $table->foreignId('submitted_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('message')->nullable();
            $table->string('status', 20)->default('pending');
            $table->timestamps();

            $table->unique(['opportunity_id', 'applicant_profile_id'], 'opportunity_applications_once_per_profile');
            $table->index(['opportunity_id', 'status'], 'opportunity_applications_received_idx');
            $table->index(['applicant_profile_id', 'status'], 'opportunity_applications_sent_idx');
            $table->index('submitted_by_user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opportunity_applications');
    }
};
