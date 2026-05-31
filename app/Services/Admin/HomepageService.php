<?php
namespace App\Services\Admin;
use App\Models\HomepageSection;
use Illuminate\Pagination\LengthAwarePaginator;
class HomepageService {
    public function getAll() { return HomepageSection::with('products')->ordered()->active()->get(); }
    public function paginate(array $filters = []): LengthAwarePaginator {
        return HomepageSection::query()->withCount('products')->ordered()->paginate(15);
    }
    public function find(int $id): HomepageSection { return HomepageSection::with('products')->findOrFail($id); }
    public function create(array $data, array $productIds = []): HomepageSection {
        $section = HomepageSection::create($data);
        if (!empty($productIds)) {
            $syncData = [];
            foreach ($productIds as $i => $pid) { $syncData[$pid] = ['sort_order' => $i]; }
            $section->products()->sync($syncData);
        }
        return $section->fresh();
    }
    public function update(HomepageSection $section, array $data, array $productIds = []): HomepageSection {
        $section->update($data);
        if (!empty($productIds)) {
            $syncData = [];
            foreach ($productIds as $i => $pid) { $syncData[$pid] = ['sort_order' => $i]; }
            $section->products()->sync($syncData);
        }
        return $section->fresh();
    }
    public function delete(HomepageSection $section): void { $section->delete(); }
}
