<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
class Category extends Model {
    use SoftDeletes;
    protected $fillable = ['parent_id', 'name', 'slug', 'image', 'banner', 'description', 'meta_title', 'meta_description', 'meta_keywords', 'status', 'sort_order'];
    protected function casts(): array { return ['status' => 'boolean']; }
    protected static function booted(): void {
        static::creating(function (self $model) { if (empty($model->slug)) $model->slug = Str::slug($model->name); });
    }
    public function parent(): BelongsTo { return $this->belongsTo(self::class, 'parent_id'); }
    public function children(): HasMany { return $this->hasMany(self::class, 'parent_id'); }
    public function products(): HasMany { return $this->hasMany(Product::class); }
    public function scopeActive($q) { return $q->where('status', true); }
    public function scopeOrdered($q) { return $q->orderBy('sort_order'); }
    public function scopeParents($q) { return $q->whereNull('parent_id'); }
    public function getImageUrlAttribute(): ?string { return $this->image ? asset('storage/'.$this->image) : null; }
    public function getBannerUrlAttribute(): ?string { return $this->banner ? asset('storage/'.$this->banner) : null; }
}
