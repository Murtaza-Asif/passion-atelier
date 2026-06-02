<?php

namespace App\Services\Admin;

use App\Models\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class CollectionService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Collection::query()->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return Collection::ordered()->active()->get();
    }

    public function find(int $id): Collection
    {
        return Collection::findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null, array $bannerImages = []): Collection
    {
        if ($image) {
            $data['image'] = $image->store('collections', 'public');
        }
        if ($banner) {
            $data['banner'] = $banner->store('collections/banners', 'public');
        }
        if (! empty($bannerImages)) {
            $data['banner_images'] = array_map(fn ($f) => $f->store('collections/banners', 'public'), $bannerImages);
        }

        return Collection::create($data);
    }

    public function update(Collection $collection, array $data, ?UploadedFile $image = null, ?UploadedFile $banner = null, array $bannerImages = []): Collection
    {
        if ($image) {
            if ($collection->image) {
                Storage::disk('public')->delete($collection->image);
            } $data['image'] = $image->store('collections', 'public');
        }
        if ($banner) {
            if ($collection->banner) {
                Storage::disk('public')->delete($collection->banner);
            } $data['banner'] = $banner->store('collections/banners', 'public');
        }
        if (! empty($bannerImages)) {
            foreach ($collection->banner_images ?? [] as $old) {
                Storage::disk('public')->delete($old);
            }
            $data['banner_images'] = array_map(fn ($f) => $f->store('collections/banners', 'public'), $bannerImages);
        }
        $collection->update($data);

        return $collection->fresh();
    }

    public function delete(Collection $collection): void
    {
        if ($collection->image) {
            Storage::disk('public')->delete($collection->image);
        }
        if ($collection->banner) {
            Storage::disk('public')->delete($collection->banner);
        }
        foreach ($collection->banner_images ?? [] as $old) {
            Storage::disk('public')->delete($old);
        }
        $collection->delete();
    }
}
