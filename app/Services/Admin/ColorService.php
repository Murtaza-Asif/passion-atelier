<?php

namespace App\Services\Admin;

use App\Models\Color;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class ColorService
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Color::query()->when($filters['search'] ?? null, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))->ordered()->paginate(15);
    }

    public function getAll()
    {
        return Color::ordered()->active()->get();
    }

    public function find(int $id): Color
    {
        return Color::findOrFail($id);
    }

    public function create(array $data, ?UploadedFile $image = null): Color
    {
        if ($image) {
            $data['image'] = $image->store('colors', 'public');
        }

        return Color::create($data);
    }

    public function update(Color $color, array $data, ?UploadedFile $image = null): Color
    {
        if ($image) {
            if ($color->image) {
                Storage::disk('public')->delete($color->image);
            } $data['image'] = $image->store('colors', 'public');
        }
        $color->update($data);

        return $color->fresh();
    }

    public function delete(Color $color): void
    {
        if ($color->image) {
            Storage::disk('public')->delete($color->image);
        } $color->delete();
    }
}
