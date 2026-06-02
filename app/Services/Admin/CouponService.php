<?php

namespace App\Services\Admin;

use App\Models\Coupon;
use Illuminate\Pagination\LengthAwarePaginator;

class CouponService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Coupon::query()->when($filters['search'] ?? null, fn ($q, $s) => $q->where('code', 'like', "%{$s}%"))->latest()->paginate(15);
    }

    public function find(int $id): Coupon
    {
        return Coupon::with('products', 'categories')->findOrFail($id);
    }

    public function create(array $data, array $productIds = [], array $categoryIds = []): Coupon
    {
        $coupon = Coupon::create($data);
        if (! empty($productIds)) {
            $coupon->products()->sync($productIds);
        }
        if (! empty($categoryIds)) {
            $coupon->categories()->sync($categoryIds);
        }

        return $coupon->fresh();
    }

    public function update(Coupon $coupon, array $data, array $productIds = [], array $categoryIds = []): Coupon
    {
        $coupon->update($data);
        $coupon->products()->sync($productIds);
        $coupon->categories()->sync($categoryIds);

        return $coupon->fresh();
    }

    public function delete(Coupon $coupon): void
    {
        $coupon->delete();
    }
}
