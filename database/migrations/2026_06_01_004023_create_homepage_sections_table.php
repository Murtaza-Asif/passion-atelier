<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_type')->comment('featured, new_arrivals, best_sellers, trending, recommended, collection_based, custom_category, custom');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('reference_type')->nullable()->comment('collection, category, custom');
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->string('bg_color')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_sections');
    }
};
