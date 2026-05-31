<?php
namespace App\Services\Admin;
use App\Models\Tag;
use Illuminate\Pagination\LengthAwarePaginator;
class TagService {
    public function paginate(array $filters = []): LengthAwarePaginator {
        return Tag::query()->when($filters['search'] ?? null, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))->paginate(15);
    }
    public function getAll() { return Tag::all(); }
    public function find(int $id): Tag { return Tag::findOrFail($id); }
    public function create(array $data): Tag { return Tag::create($data); }
    public function update(Tag $tag, array $data): Tag { $tag->update($data); return $tag->fresh(); }
    public function delete(Tag $tag): void { $tag->delete(); }
    public function findOrCreate(array $names): array {
        $ids = [];
        foreach ($names as $name) {
            $tag = Tag::firstOrCreate(['name' => trim($name)], ['slug' => \Illuminate\Support\Str::slug(trim($name))]);
            $ids[] = $tag->id;
        }
        return $ids;
    }
}
