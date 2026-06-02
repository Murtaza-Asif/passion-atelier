<?php

namespace App\Services\Admin;

use App\Models\Attribute;
use Illuminate\Pagination\LengthAwarePaginator;

class AttributeService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Attribute::query()->with('group')->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return Attribute::with('values')->ordered()->get();
    }

    public function getFilterable()
    {
        return Attribute::with('values')->filterable()->ordered()->get();
    }

    public function getSpecifications()
    {
        return Attribute::with('values')->specifications()->ordered()->get();
    }

    public function findByGroup(int $groupId)
    {
        return Attribute::with('values')->where('attribute_group_id', $groupId)->ordered()->get();
    }

    public function find(int $id): Attribute
    {
        return Attribute::with('group', 'values')->findOrFail($id);
    }

    public function create(array $data): Attribute
    {
        return Attribute::create($data);
    }

    public function update(Attribute $attribute, array $data): Attribute
    {
        $attribute->update($data);

        return $attribute->fresh();
    }

    public function delete(Attribute $attribute): void
    {
        $attribute->delete();
    }
}
