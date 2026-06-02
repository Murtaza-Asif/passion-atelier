<?php

namespace App\Services\Admin;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class CategoryService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Category::query()->with('parent')->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return Category::ordered()->active()->get();
    }

    public function getParentCategories()
    {
        return Category::parents()->ordered()->active()->get();
    }

    public function find(int $id): Category
    {
        return Category::findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null): Category
    {
        if ($image) {
            $data['image'] = $image->store('categories', 'public');
        }
        if ($banner) {
            $data['banner'] = $banner->store('categories/banners', 'public');
        }

        return Category::create($data);
    }

    public function update(Category $category, array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null): Category
    {
        if ($image) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            } $data['image'] = $image->store('categories', 'public');
        }
        if ($banner) {
            if ($category->banner) {
                Storage::disk('public')->delete($category->banner);
            } $data['banner'] = $banner->store('categories/banners', 'public');
        }
        $category->update($data);

        return $category->fresh();
    }

    public function delete(Category $category): void
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        if ($category->banner) {
            Storage::disk('public')->delete($category->banner);
        }
        $category->delete();
    }
}
