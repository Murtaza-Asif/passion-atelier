<?php

namespace App\Services\Admin;

use App\Models\Offer;
use Illuminate\Pagination\LengthAwarePaginator;

class OfferService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Offer::query()->with('products')->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->latest()->paginate(15);
    }

    public function find(int $id): Offer
    {
        return Offer::with('products', 'getProduct')->findOrFail($id);
    }

    public function create(array $data, array $productIds = []): Offer
    {
        $offer = Offer::create($data);
        if (! empty($productIds)) {
            $offer->products()->sync($productIds);
        }

        return $offer->fresh();
    }

    public function update(Offer $offer, array $data, array $productIds = []): Offer
    {
        $offer->update($data);
        $offer->products()->sync($productIds);

        return $offer->fresh();
    }

    public function delete(Offer $offer): void
    {
        $offer->delete();
    }
}
