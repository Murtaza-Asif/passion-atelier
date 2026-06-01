<?php

namespace App\Services\Admin;

use App\Models\AttributeGroup;
use Illuminate\Pagination\LengthAwarePaginator;

class AttributeGroupService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return AttributeGroup::query()->withCount('attributes')->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return AttributeGroup::ordered()->get();
    }

    public function find(int $id): AttributeGroup
    {
        return AttributeGroup::with('attributes.values')->findOrFail($id);
    }

    public function create(array $data): AttributeGroup
    {
        return AttributeGroup::create($data);
    }

    public function update(AttributeGroup $group, array $data): AttributeGroup
    {
        $group->update($data);

        return $group->fresh();
    }

    public function delete(AttributeGroup $group): void
    {
        $group->delete();
    }
}
