<?php
namespace App\Services\Admin;
use App\Models\Review;
use Illuminate\Pagination\LengthAwarePaginator;
class ReviewService {
    public function paginate(array $filters = []): LengthAwarePaginator {
        return Review::query()->with('product', 'user')
            ->when($filters['product_id'] ?? null, fn($q, $v) => $q->where('product_id', $v))
            ->when(isset($filters['is_approved']), fn($q) => $q->where('is_approved', $filters['is_approved']))
            ->latest()->paginate(15);
    }
    public function find(int $id): Review { return Review::findOrFail($id); }
    public function approve(Review $review): Review { $review->update(['is_approved' => true]); return $review->fresh(); }
    public function delete(Review $review): void { $review->delete(); }
}
