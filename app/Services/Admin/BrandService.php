<?php

namespace App\Services\Admin;

use App\Models\Brand;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class BrandService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Brand::query()->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return Brand::ordered()->active()->get();
    }

    public function find(int $id): Brand
    {
        return Brand::findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null): Brand
    {
        if ($image) {
            $data['image'] = $image->store('brands', 'public');
        }
        if ($banner) {
            $data['banner'] = $banner->store('brands/banners', 'public');
        }

        return Brand::create($data);
    }

    public function update(Brand $brand, array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null): Brand
    {
        if ($image) {
            if ($brand->image) {
                Storage::disk('public')->delete($brand->image);
            } $data['image'] = $image->store('brands', 'public');
        }
        if ($banner) {
            if ($brand->banner) {
                Storage::disk('public')->delete($brand->banner);
            } $data['banner'] = $banner->store('brands/banners', 'public');
        }
        $brand->update($data);

        return $brand->fresh();
    }

    public function delete(Brand $brand): void
    {
        if ($brand->image) {
            Storage::disk('public')->delete($brand->image);
        }
        if ($brand->banner) {
            Storage::disk('public')->delete($brand->banner);
        }
        $brand->delete();
    }
}
