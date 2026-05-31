<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
class AttributeGroup extends Model {
    protected $fillable = ['name', 'slug', 'sort_order'];
    protected static function booted(): void {
        static::creating(function (self $model) { if (empty($model->slug)) $model->slug = Str::slug($model->name); });
    }
    public function attributes(): HasMany { return $this->hasMany(Attribute::class); }
    public function scopeOrdered($q) { return $q->orderBy('sort_order'); }
}
