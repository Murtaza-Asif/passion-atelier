<?php
namespace App\Services\Admin;
use App\Models\ProductType;
use Illuminate\Pagination\LengthAwarePaginator;
class ProductTypeService {
    public function paginate(array $filters = []): LengthAwarePaginator {
        return ProductType::query()->when($filters['search'] ?? null, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }
    public function getAll() { return ProductType::ordered()->active()->get(); }
    public function find(int $id): ProductType { return ProductType::findOrFail($id); }
    public function create(array $data): ProductType { return ProductType::create($data); }
    public function update(ProductType $type, array $data): ProductType { $type->update($data); return $type->fresh(); }
    public function delete(ProductType $type): void { $type->delete(); }
}
