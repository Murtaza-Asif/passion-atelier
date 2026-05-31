<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
class Offer extends Model {
    use SoftDeletes;
    protected $fillable = ['name', 'slug', 'type', 'value', 'buy_qty', 'get_qty', 'get_product_id', 'min_order_amount', 'max_discount_amount', 'starts_at', 'expires_at', 'status'];
    protected function casts(): array {
        return ['status' => 'boolean', 'starts_at' => 'datetime', 'expires_at' => 'datetime', 'value' => 'decimal:2'];
    }
    protected static function booted(): void {
        static::creating(function (self $model) { if (empty($model->slug)) $model->slug = Str::slug($model->name); });
    }
    public function getProduct(): BelongsTo { return $this->belongsTo(Product::class, 'get_product_id'); }
    public function products(): BelongsToMany { return $this->belongsToMany(Product::class, 'offer_products'); }
    public function scopeActive($q) { return $q->where('status', true); }
}
