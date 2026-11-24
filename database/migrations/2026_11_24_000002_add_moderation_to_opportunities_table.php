<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('opportunities', function (Blueprint $table) {
            // Existing opportunities require review; their activity status is unchanged.
            $table->string('moderation_status', 20)->default('pending');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();

            $table->index(['moderation_status', 'status', 'expires_at'], 'opportunities_visibility_idx');
            $table->index('reviewed_by');
        });
    }

    public function down(): void
    {
        Schema::table('opportunities', function (Blueprint $table) {
            $table->dropForeign(['reviewed_by']);
            $table->dropIndex('opportunities_visibility_idx');
            $table->dropIndex(['reviewed_by']);
            $table->dropColumn(['moderation_status', 'reviewed_by', 'approved_at', 'rejection_reason']);
        });
    }
};
