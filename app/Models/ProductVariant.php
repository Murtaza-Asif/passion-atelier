<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
    use SoftDeletes;

    protected $fillable = ['product_id', 'color_id', 'name', 'sku', 'price', 'sale_price', 'stock', 'reserved_stock', 'low_stock_alert', 'image', 'is_default', 'sort_order', 'status'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'is_default' => 'boolean',
            'status' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    public function scopeActive($q)
    {
        return $q->where('status', true);
    }

    public function scopeOrdered($q)
    {
        return $q->orderBy('sort_order');
    }

    public function getAvailableStockAttribute(): int
    {
        return $this->stock - $this->reserved_stock;
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/'.$this->image) : null;
    }

    public function isLowStock(): bool
    {
        return $this->available_stock <= $this->low_stock_alert;
    }
}
