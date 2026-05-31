<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class InventoryLog extends Model {
    protected $fillable = ['product_id', 'product_variant_id', 'type', 'quantity', 'previous_stock', 'new_stock', 'reference_type', 'reference_id', 'notes'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function variant(): BelongsTo { return $this->belongsTo(ProductVariant::class, 'product_variant_id'); }
    public function scopeType($q, $type) { return $q->where('type', $type); }
}
