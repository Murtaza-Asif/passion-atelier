<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
class Review extends Model {
    use SoftDeletes;
    protected $fillable = ['product_id', 'user_id', 'rating', 'title', 'body', 'is_approved', 'is_featured'];
    protected function casts(): array { return ['is_approved' => 'boolean', 'is_featured' => 'boolean']; }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function scopeApproved($q) { return $q->where('is_approved', true); }
    public function scopeFeatured($q) { return $q->where('is_featured', true); }
}
