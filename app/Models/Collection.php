<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Collection extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'slug', 'image', 'banner', 'banner_images', 'description', 'meta_title', 'meta_description', 'meta_keywords', 'status', 'sort_order'];

    protected function casts(): array
    {
        return ['status' => 'boolean', 'banner_images' => 'array'];
    }

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->name);
            }
        });
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function scopeActive($q)
    {
        return $q->where('status', true);
    }

    public function scopeOrdered($q)
    {
        return $q->orderBy('sort_order');
    }

    private function resolveUrl(?string $path): ?string
    {
        if (!$path) return null;
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }
        return asset('storage/'.$path);
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveUrl($this->image);
    }

    public function getBannerUrlAttribute(): ?string
    {
        return $this->resolveUrl($this->banner);
    }

    public function getBannerImagesUrlsAttribute(): array
    {
        return collect($this->banner_images ?? [])
            ->map(fn ($path) => $this->resolveUrl($path))
            ->values()
            ->toArray();
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'banner_url' => $this->banner_url,
            'banner_images' => $this->banner_images_urls,
        ];
    }
}
