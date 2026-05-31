<?php

use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\AttributeGroupController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\HomepageController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductTypeController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\TagController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('product-types', ProductTypeController::class)->except('show');
    Route::resource('brands', BrandController::class)->except('show');
    Route::resource('collections', CollectionController::class)->except('show');
    Route::resource('categories', CategoryController::class)->except('show');
    Route::resource('colors', ColorController::class)->except('show');
    Route::resource('tags', TagController::class)->except('show');
    Route::resource('attribute-groups', AttributeGroupController::class)->except('show');
    Route::resource('attributes', AttributeController::class)->except('show');
    Route::get('attributes/{attribute}/values', [AttributeController::class, 'values'])->name('attributes.values');
    Route::post('attributes/{attribute}/values', [AttributeController::class, 'storeValue'])->name('attributes.values.store');
    Route::delete('attributes/{attribute}/values/{value}', [AttributeController::class, 'destroyValue'])->name('attributes.values.destroy');

    Route::resource('products', ProductController::class)->except('show');
    Route::post('products/{product}/duplicate', [ProductController::class, 'duplicate'])->name('products.duplicate');
    Route::post('products/{product}/variants', [ProductController::class, 'storeVariant'])->name('products.variants.store');
    Route::delete('products/{product}/variants/{variant}', [ProductController::class, 'destroyVariant'])->name('products.variants.destroy');
    Route::delete('products/{product}/gallery/{index}', [ProductController::class, 'removeGalleryImage'])->name('products.gallery.destroy');

    Route::resource('reviews', ReviewController::class)->only(['index', 'destroy']);
    Route::post('reviews/{review}/approve', [ReviewController::class, 'approve'])->name('reviews.approve');
    Route::resource('faqs', FaqController::class)->except('show');
    Route::resource('coupons', CouponController::class)->except('show');
    Route::resource('offers', OfferController::class)->except('show');
    Route::resource('homepage', HomepageController::class)->except('show');
    Route::get('inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::get('inventory/adjust', [InventoryController::class, 'create'])->name('inventory.adjust');
    Route::post('inventory/adjust', [InventoryController::class, 'adjust'])->name('inventory.adjust.store');
    Route::get('inventory/low-stock', [InventoryController::class, 'lowStock'])->name('inventory.low-stock');

});
