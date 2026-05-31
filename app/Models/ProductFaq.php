<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductFaq extends Model {
    protected $fillable = ['product_id', 'question', 'answer', 'sort_order', 'status'];
    protected function casts(): array { return ['status' => 'boolean']; }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function scopeActive($q) { return $q->where('status', true); }
}
