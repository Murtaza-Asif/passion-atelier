<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_type_id', 'category_id', 'brand_id', 'collection_id',
        'title', 'slug', 'sku', 'barcode', 'short_description', 'full_description', 'season_label',
        'featured_image', 'gallery_images', 'video_url',
        'cost_price', 'regular_price', 'sale_price', 'discount_percent', 'discount_amount',
        'tax_type', 'tax_value', 'unit', 'min_order_qty', 'max_order_qty',
        'is_featured', 'is_new_arrival', 'is_best_seller', 'is_trending',
        'status', 'published_at',
        'meta_title', 'meta_description', 'meta_keywords', 'og_image',
        'sort_order', 'total_stock', 'total_sold', 'avg_rating', 'review_count',
    ];

    protected function casts(): array
    {
        return [
            'gallery_images' => 'array',
            'is_featured' => 'boolean',
            'is_new_arrival' => 'boolean',
            'is_best_seller' => 'boolean',
            'is_trending' => 'boolean',
            'cost_price' => 'decimal:2',
            'regular_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'discount_percent' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'published_at' => 'datetime',
            'avg_rating' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }

    public function productType(): BelongsTo
    {
        return $this->belongsTo(ProductType::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ProductFaq::class);
    }

    public function inventoryLogs(): HasMany
    {
        return $this->hasMany(InventoryLog::class);
    }

    public function scopeActive($q)
    {
        return $q->where('status', 'published');
    }

    public function scopeFeatured($q)
    {
        return $q->where('is_featured', true);
    }

    public function scopeNewArrivals($q)
    {
        return $q->where('is_new_arrival', true);
    }

    public function scopeBestSellers($q)
    {
        return $q->where('is_best_seller', true);
    }

    public function scopeTrending($q)
    {
        return $q->where('is_trending', true);
    }

    public function scopeOrdered($q)
    {
        return $q->orderBy('sort_order');
    }

    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (!$this->featured_image) {
            return null;
        }
        if (str_starts_with($this->featured_image, 'http://') || str_starts_with($this->featured_image, 'https://')) {
            return $this->featured_image;
        }
        return asset('storage/'.$this->featured_image);
    }

    public function getOgImageUrlAttribute(): ?string
    {
        if (!$this->og_image) {
            return null;
        }
        if (str_starts_with($this->og_image, 'http://') || str_starts_with($this->og_image, 'https://')) {
            return $this->og_image;
        }
        return asset('storage/'.$this->og_image);
    }

    // ── Frontend mapping ──────────────────────────────────────────

    public function getImageKeyAttribute(): ?string
    {
        if ($this->featured_image) {
            return null;
        }
        $s = $this->slug;
        if (str_contains($s, 'cotton')) {
            return 'cotton';
        }
        if (str_contains($s, 'wash') || str_contains($s, 'wear')) {
            return 'washwear';
        }
        if (str_contains($s, 'latha')) {
            return 'latha';
        }

        return 'custom';
    }

    public function toFrontendArray(): array
    {
        $variants = $this->relationLoaded('variants')
            ? $this->variants->map(fn ($v) => [
                'id' => $v->id,
                'name' => $v->name ?? $v->color?->name ?? 'Default',
                'description' => '',
                'price' => (float) ($v->sale_price ?? $v->price),
                'original_price' => $v->sale_price && $v->sale_price < $v->price ? (float) $v->price : null,
            ])
            : [];

        $colors = $this->relationLoaded('variants')
            ? $this->variants
                ->filter(fn ($v) => $v->color)
                ->unique('color_id')
                ->values()
                ->map(fn ($v) => [
                    'id' => $v->color->id,
                    'name' => $v->color->name,
                    'hex_code' => $v->color->hex_code,
                ])
            : [];

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->title,
            'short_description' => $this->short_description,
            'long_description' => $this->full_description,
            'featured_image_url' => $this->featured_image_url,
            'image_key' => $this->image_key,
            'season' => $this->getSeason(),
            'regular_price' => (float) $this->regular_price,
            'sale_price' => (float) $this->sale_price,
            'has_discount' => $this->sale_price && $this->regular_price && $this->sale_price < $this->regular_price,
            'avg_rating' => (float) $this->avg_rating,
            'review_count' => (int) $this->review_count,
            'variations' => $variants,
            'colors' => $colors,
        ];
    }

    private function getSeason(): string
    {
        if ($this->season_label) {
            return $this->season_label;
        }
        $s = $this->slug;
        if (str_contains($s, 'cotton')) {
            return 'All-season';
        }
        if (str_contains($s, 'wash') || str_contains($s, 'wear')) {
            return 'Spring · Autumn · Winter';
        }
        if (str_contains($s, 'latha')) {
            return 'Year-round formal';
        }

        return 'All-season';
    }
}
