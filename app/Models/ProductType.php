<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
class ProductType extends Model {
    protected $fillable = ['name', 'slug', 'description', 'is_active', 'sort_order'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
    protected static function booted(): void {
        static::creating(function (self $model) { if (empty($model->slug)) $model->slug = Str::slug($model->name); });
    }
    public function products(): HasMany { return $this->hasMany(Product::class); }
    public function scopeActive($q) { return $q->where('is_active', true); }
    public function scopeOrdered($q) { return $q->orderBy('sort_order'); }
}
