<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductVariant;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Product::query()
            ->with(['productType', 'category', 'brand', 'collection'])
            ->when($filters['search'] ?? null, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")->orWhere('sku', 'like', "%{$s}%");
            }))
            ->when($filters['status'] ?? null, fn ($q, $v) => $q->where('status', $v))
            ->when($filters['product_type_id'] ?? null, fn ($q, $v) => $q->where('product_type_id', $v))
            ->when($filters['category_id'] ?? null, fn ($q, $v) => $q->where('category_id', $v))
            ->when($filters['brand_id'] ?? null, fn ($q, $v) => $q->where('brand_id', $v))
            ->when($filters['collection_id'] ?? null, fn ($q, $v) => $q->where('collection_id', $v))
            ->when(($filters['is_featured'] ?? null) || ($filters['flag'] ?? null) === 'featured', fn ($q) => $q->featured())
            ->when(($filters['is_new_arrival'] ?? null) || ($filters['flag'] ?? null) === 'new_arrival', fn ($q) => $q->newArrivals())
            ->when(($filters['is_best_seller'] ?? null) || ($filters['flag'] ?? null) === 'best_seller', fn ($q) => $q->bestSellers())
            ->when(($filters['is_trending'] ?? null) || ($filters['flag'] ?? null) === 'trending', fn ($q) => $q->trending())
            ->ordered()
            ->paginate(15);
    }

    public function find(int $id): Product
    {
        return Product::with(['productType', 'category', 'brand', 'collection', 'variants.color', 'tags', 'attributes.attribute', 'attributes.value', 'reviews', 'faqs'])->findOrFail($id);
    }

    public function findBySlug(string $slug): ?Product
    {
        return Product::with(['productType', 'category', 'brand', 'collection', 'variants' => fn ($q) => $q->ordered()->active(), 'tags', 'attributes.attribute' => fn ($q) => $q->ordered(), 'attributes.value', 'reviews' => fn ($q) => $q->approved()])->where('slug', $slug)->active()->first();
    }

    public function create(array $data, ?UploadedFile $featuredImage = null, ?UploadedFile $ogImage = null, array $gallery = []): Product
    {
        if ($featuredImage) {
            $data['featured_image'] = $featuredImage->store('products', 'public');
        }
        if ($ogImage) {
            $data['og_image'] = $ogImage->store('products/seo', 'public');
        }
        if (! empty($gallery)) {
            $paths = [];
            foreach ($gallery as $file) {
                $paths[] = $file->store('products/gallery', 'public');
            }
            $data['gallery_images'] = $paths;
        }
        if (empty($data['status'])) {
            $data['status'] = 'draft';
        }

        return Product::create($data);
    }

    public function update(Product $product, array $data, ?UploadedFile $featuredImage = null, ?UploadedFile $ogImage = null, array $gallery = []): Product
    {
        if ($featuredImage) {
            if ($product->featured_image) {
                Storage::disk('public')->delete($product->featured_image);
            }
            $data['featured_image'] = $featuredImage->store('products', 'public');
        }
        if ($ogImage) {
            if ($product->og_image) {
                Storage::disk('public')->delete($product->og_image);
            }
            $data['og_image'] = $ogImage->store('products/seo', 'public');
        }
        if (! empty($gallery)) {
            $paths = $product->gallery_images ?? [];
            foreach ($gallery as $file) {
                $paths[] = $file->store('products/gallery', 'public');
            }
            $data['gallery_images'] = $paths;
        }
        $product->update($data);

        return $product->fresh()->load(['productType', 'category', 'brand', 'collection', 'variants.color', 'tags']);
    }

    public function delete(Product $product): void
    {
        if ($product->featured_image) {
            Storage::disk('public')->delete($product->featured_image);
        }
        $product->delete();
    }

    public function duplicate(Product $product): Product
    {
        // =========================
        // PRODUCT CLONE
        // =========================
        $clone = $product->replicate(['slug', 'sku']);

        // =========================
        // UNIQUE SLUG GENERATOR
        // =========================
        $baseSlug = $product->slug.'-copy';
        $slug = $baseSlug;
        $count = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$count;
            $count++;
        }

        $clone->slug = $slug;

        // =========================
        // UNIQUE SKU (PRODUCT LEVEL)
        // =========================
        if ($product->sku) {
            $baseSku = $product->sku.'-copy';
            $sku = $baseSku;
            $count = 1;

            while (Product::where('sku', $sku)->exists()) {
                $sku = $baseSku.'-'.$count;
                $count++;
            }

            $clone->sku = $sku;
        }

        // Update title
        $clone->title = $product->title.' (Copy)';

        // Save product first
        $clone->save();

        // =========================
        // VARIANTS COPY (WITH UNIQUE SKU)
        // =========================
        foreach ($product->variants as $v) {

            $data = $v->replicate()->toArray();

            // 🔥 Fix variant SKU uniqueness
            if (! empty($data['sku'])) {
                $baseVariantSku = $data['sku'].'-copy';
                $variantSku = $baseVariantSku;
                $vcount = 1;

                while (ProductVariant::where('sku', $variantSku)->exists()) {
                    $variantSku = $baseVariantSku.'-'.$vcount;
                    $vcount++;
                }

                $data['sku'] = $variantSku;
            }

            // Optional: make name clearer
            if (! empty($data['name'])) {
                $data['name'] = $data['name'].' (Copy)';
            }

            $clone->variants()->create($data);
        }

        // =========================
        // TAGS COPY
        // =========================
        foreach ($product->tags as $tag) {
            $clone->tags()->attach($tag->id);
        }

        // =========================
        // RETURN FRESH MODEL
        // =========================
        return $clone->fresh()->load([
            'productType',
            'category',
            'brand',
            'collection',
            'variants',
            'tags',
        ]);
    }

    public function syncTags(Product $product, array $tagIds): void
    {
        $product->tags()->sync($tagIds);
    }

    public function saveAttributes(Product $product, array $attributes): void
    {
        ProductAttribute::where('product_id', $product->id)->delete();
        foreach ($attributes as $attr) {
            if (! empty($attr['attribute_id'])) {
                ProductAttribute::create([
                    'product_id' => $product->id,
                    'attribute_id' => $attr['attribute_id'],
                    'attribute_value_id' => $attr['attribute_value_id'] ?? null,
                    'custom_value' => $attr['custom_value'] ?? null,
                ]);
            }
        }
    }
}
