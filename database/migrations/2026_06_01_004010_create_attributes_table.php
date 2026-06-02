<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attribute_group_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('input_type')->default('select')->comment('text, select, multiselect, color');
            $table->boolean('is_filterable')->default(false);
            $table->boolean('is_visible_on_front')->default(true);
            $table->boolean('is_specification')->default(false);
            $table->integer('sort_order')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
            $table->unique(['slug', 'attribute_group_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
