<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    use SoftDeletes;

    protected $fillable = ['code', 'type', 'value', 'min_order_amount', 'max_discount_amount', 'usage_limit_per_coupon', 'usage_limit_per_user', 'total_used', 'is_stackable', 'starts_at', 'expires_at', 'status'];

    protected function casts(): array
    {
        return ['is_stackable' => 'boolean', 'status' => 'boolean', 'starts_at' => 'datetime', 'expires_at' => 'datetime', 'value' => 'decimal:2', 'min_order_amount' => 'decimal:2', 'max_discount_amount' => 'decimal:2'];
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'coupon_products');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'coupon_categories');
    }

    public function isValid(): bool
    {
        if (! $this->status) {
            return false;
        }
        if ($this->starts_at && now()->lt($this->starts_at)) {
            return false;
        }
        if ($this->expires_at && now()->gt($this->expires_at)) {
            return false;
        }
        if ($this->usage_limit_per_coupon && $this->total_used >= $this->usage_limit_per_coupon) {
            return false;
        }

        return true;
    }
}
